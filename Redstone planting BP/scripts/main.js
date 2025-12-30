import { world, system } from "@minecraft/server";

let WatchedPosition = [];//position of block to be watched
let ver = 0;//for saving

//SAVE PROCESS
function saveWatched(){
    let watchedStr = JSON.stringify(WatchedPosition);//conve1rts to string value
    world.setDynamicProperty("watched_position",watchedStr);//save in world file (string format)
}

//BLOCK PLACED
world.afterEvents.playerPlaceBlock.subscribe(ev => {
    const { block, player } = ev;
    if (block.typeId === "miller:plant_block") {
        WatchedPosition.push(block.location);
        saveWatched();//save
    }
});

//BLOCK REMOVED
world.afterEvents.playerBreakBlock.subscribe(ev => {
    const { block, player } = ev;
    //search for index of block in same position that we want
    const index = WatchedPosition.findIndex(loc => 
        loc.x === block.location.x &&
        loc.y === block.location.y &&
        loc.z === block.location.z);
    if(index !== -1){
        //removing block from the list
        WatchedPosition.splice(index,1);
        saveWatched()//save
    }
});

//LOOP FOR PLANT BLOCK FUNCTION
system.runInterval(()=>{

        // Wait for 1 seccond
    let watchedStr;
        if (!ver) {
          try{
            watchedStr = world.getDynamicProperty("watched_position");
            //transformar e salvar
            WatchedPosition = JSON.parse(watchedStr);//load in array-object[JSON] form
          }catch(e){
            watchedStr = JSON.stringify(WatchedPosition);//conve1rts to string value
            saveWatched();
            console.warn("Error: " + e);
          }
        ver = 1;
        }



    const dimension = world.getDimension("overworld");
    for(const loc of WatchedPosition){ 
       
        const block = dimension.getBlock(loc);//block watched
        if (!block) continue;

        //verifying permutation
        const current = block.permutation.getState("miller:activated");
        if(current){
            block.setPermutation(
                block.permutation.withState("miller:activated", false)
            )
        }

        const belowBlock = block.below();
        if( belowBlock.typeId === "minecraft:redstone_torch" || 
            belowBlock.typeId === "minecraft:redstone_block" ||
            (belowBlock.typeId === "minecraft:redstone_wire" && 
            belowBlock.permutation.getState("redstone_signal") !== 0 
            )
        ){
            //POWERED BY REDSTONE
            //world.sendMessage("Conectado à redstone!");

            const aboveBlock = block.above();
            const upperBlock = block.above(2);

            //CHECKING ABOVE BLOCKS
            if(aboveBlock.typeId === "minecraft:farmland" && upperBlock.typeId === "minecraft:air"){
                //world.sendMessage("Possível de plantar");

                const local = block.location;
                //LOCAL TO BE PLANTED
                const selectedPos = {x: local.x, y: local.y+2, z: local.z};
                //PLANTING USING COMMAND
                dimension.runCommand(`setblock ${selectedPos.x} ${selectedPos.y} ${selectedPos.z} wheat ["growth"=0] replace`);
                //WARNING
                block.setPermutation(
                    block.permutation.withState("miller:activated", true)
                )
                //world.sendMessage("Bloco de trigo colocado!");
            }

        }
    }
}, 10);