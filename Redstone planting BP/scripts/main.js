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
                let found = 0;//some seed found
                for(let k=0; k< 4;k++){
                    const local = block.location;
                    let sideBlock;
                    switch(k){
                        case 0:
                            sideBlock = block.dimension.getBlock({x: local.x, y: local.y, z: local.z-1});
                            break;
                        case 1:
                            sideBlock = block.dimension.getBlock({x: local.x+1, y: local.y, z: local.z});
                            break;
                        case 2:
                            sideBlock = block.dimension.getBlock({x: local.x, y: local.y, z: local.z+1});
                            break;
                        case 3:
                            sideBlock = block.dimension.getBlock({x: local.x-1, y: local.y, z: local.z});
                            break;
                        default:
                            sideBlock = block.dimension.getBlock({x: local.x, y: local.y, z: local.z-1});
                    }

                    if(sideBlock.typeId === "minecraft:hopper"){//Verify if there's a hopper there
                        //world.sendMessage("Funil Encontrado!");

                        const inventory = sideBlock.getComponent("minecraft:inventory");

                        //verifying facing direction
                        
                        const facing = sideBlock.permutation.getState("facing_direction");
                        //world.sendMessage(`Bloco na Direção ${facing}`)
                        let rightDirection = 0;
                        
                        switch(k){
                            case 0://north
                                if(facing === 3){
                                    rightDirection = 1;
                                    //world.sendMessage("Direção Correta - SUL");
                                }
                                break;
                            case 1://west
                                if(facing === 4){
                                    rightDirection = 1;
                                    //world.sendMessage("Direção Correta - OESTE");
                                }
                                break;
                            case 2://south
                                if(facing === 2){
                                    rightDirection = 1;
                                    //world.sendMessage("Direção Correta - NORTE");
                                }
                                break;
                            case 3://east
                                if(facing === 5){
                                    rightDirection = 1;
                                    //world.sendMessage("Direção Correta - LESTE");
                                }
                                break;
                        }
                        const hopperStop = sideBlock.permutation.getState("toggle_bit");

                        if(inventory && inventory.container && rightDirection && !hopperStop){//Verify if hopper is in right conditions
                            //world.sendMessage("Conteiner Existe!");
                            const container = inventory.container;
                            //let found = 0;//was seed found?
                            
                            for(let i = 0; i < container.size; i++){//check all hopper inventory
                                const item = container.getItem(i);//item
                                if(!item) continue;
                                //world.sendMessage(`Checando slot ${i}`);
                                let fruit = "";
                                if(item.typeId === "minecraft:wheat_seeds"){
                                    fruit = "wheat";
                                    found = 1;
                                }else if(item.typeId === "minecraft:carrot"){
                                    fruit = "carrots";
                                    found = 1;
                                }else if(item.typeId === "minecraft:potato"){
                                    fruit = "potatoes";
                                    found = 1;
                                }else if(item.typeId === "minecraft:beetroot_seeds"){
                                    fruit = "beetroot";
                                    found = 1;
                                }else if(item.typeId === "minecraft:pumpkin_seeds"){
                                    fruit = "pumpkin_stem";
                                    found = 1;
                                }else if(item.typeId === "minecraft:melon_seeds"){
                                    fruit = "melon_stem";
                                    found = 1;
                                }
                                if(fruit === "")continue;

                                if(item.amount > 1){
                                    item.amount -=1;
                                    container.setItem(i, item);
                                }else{
                                    container.setItem(i, undefined);
                                }
                                //LOCAL TO BE PLANTED
                                const selectedPos = {x: local.x, y: local.y+2, z: local.z};
                                //PLANTING USING COMMAND
                                dimension.runCommand(`setblock ${selectedPos.x} ${selectedPos.y} ${selectedPos.z} ${fruit} ["growth"=0] replace`);
                                block.setPermutation(
                                    block.permutation.withState("miller:activated", true)
                                );
                                break;
                                
                            }
                        }
                    }
                    if(found){
                        break;
                    }
                }                
            }
        }
    }
}, 10);

//Interact

//miecraft:redstone

/*
minecraft:wheat_seeds
minecraft:carrot
minecraft:potato
minecraft:beetroot_seeds
minecraft:melon_stem
minecraft:pumpkin_stem




*/



/*

switch(k){//hopper facing
                            case 0://north
                                if(facing === 2){
                                    rightDirection = 1;
                                    world.sendMessage("Direção Correta - SUL");
                                }
                                break;
                            case 1://west
                                if(facing === 4){
                                    rightDirection = 1;
                                    world.sendMessage("Direção Correta - LESTE");
                                }
                                break;
                            case 2://south
                                if(facing === 3){
                                    rightDirection = 1;
                                    world.sendMessage("Direção Correta - NORTE");
                                }
                                break;
                            case 3://east
                                if(facing === 5){
                                    rightDirection = 1;
                                    world.sendMessage("Direção Correta - OESTE");
                                }
                                break;
                        }

*/