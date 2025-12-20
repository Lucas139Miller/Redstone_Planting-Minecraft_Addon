import { world, system } from "@minecraft/server";

let WatchedPosition = [];//position of block to be watched



//BLOCK PLACED
world.afterEvents.playerPlaceBlock.subscribe(ev => {
    const { block, player } = ev;
    if (block.typeId === "miller:plant_block") {
        WatchedPosition.push(block.location);
        player.sendMessage("Novo bloco em observação");
        player.sendMessage(`Bloco número ${WatchedPosition.length}`);
    }
});

//BLOCK REMOVED
world.afterEvents.playerBreakBlock.subscribe(ev => {
    const { block, player } = ev;
    player.sendMessage("Bloco quebrado");
    //search for index of block in same position that we want
    const index = WatchedPosition.findIndex(loc => 
        loc.x === block.location.x &&
        loc.y === block.location.y &&
        loc.z === block.location.z);
    if(index !== -1){
        //removing block from the list
        WatchedPosition.splice(index,1);
        player.sendMessage("Bloco removido da lista de observação");
    }
});

//LOOP FOR PLANT BLOCK FUNCTION
system.runInterval(()=>{
    const dimension = world.getDimension("overworld");
    for(const loc of WatchedPosition){ 
       
        const block = dimension.getBlock(loc);//block watched
        if (!block) continue;

        const belowBlock = block.below();
        if( belowBlock.typeId === "minecraft:redstone_torch" || 
            belowBlock.typeId === "minecraft:redstone_block" ||
            (belowBlock.typeId === "minecraft:redstone_wire" && 
            belowBlock.permutation.getState("redstone_signal") !== 0 
            )
        ){
            //POWERED BY REDSTONE
            world.sendMessage("Conectado à redstone!");

            const aboveBlock = block.above();
            const upperBlock = block.above(2);

            //CHECKING ABOVE BLOCKS
            if(aboveBlock.typeId === "minecraft:farmland" && upperBlock.typeId === "minecraft:air"){
                world.sendMessage("Possível de plantar");

                const local = block.location;
                //LOCAL TO BE PLANTED
                const selectedPos = {x: local.x, y: local.y+2, z: local.z};
                //PLANTING USING COMMAND
                dimension.runCommand(`setblock ${selectedPos.x} ${selectedPos.y} ${selectedPos.z} wheat ["growth"=0] replace`);
                //WARNING
                world.sendMessage("Bloco de trigo colocado!");
            }

        }
    }
}, 10);