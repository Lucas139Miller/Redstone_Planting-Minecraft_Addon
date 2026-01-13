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

    //Get Plant Blocks values from world 
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


    //Watch each block on saved list
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
            //world.sendMessage("Conectado à redstone!");

            const aboveBlock = block.above();
            const upperBlock = block.above(2);
            //CHECKING BlOCK TO BE PLANTED ON

            let typePlating = "";
            if(aboveBlock.typeId === "minecraft:farmland"){
                typePlating = "farmland";//FARMLAND
            }else if(aboveBlock.typeId === "minecraft:sand" || aboveBlock.typeId === "minecraft:red_sand"){
                typePlating = "sand";//ANY KIND OF OVERWORLD SAND
            }else if(aboveBlock.typeId === "minecraft:soul_sand"){
                typePlating = "soul_sand";//SOUL SAND
            }


            if(typePlating === "farmland" || typePlating === "sand" || typePlating === "soul_sand"){//right place for planting
                //CASES

                //verifying permutation
                    const current = block.permutation.getState("miller:activated");
                    if(!current){
                        block.setPermutation(
                            block.permutation.withState("miller:activated", true)
                        );
                        //ACTIVATED
                        if( upperBlock.typeId === "minecraft:wheat" || 
                            upperBlock.typeId === "minecraft:carrots" ||
                            upperBlock.typeId === "minecraft:potatoes" ||
                            upperBlock.typeId === "minecraft:beetroot" ||
                            upperBlock.typeId === "minecraft:melon_stem" ||
                            upperBlock.typeId === "minecraft:pumpkin_stem" ||
                            upperBlock.typeId === "minecraft:reeds" ||
                            upperBlock.typeId === "minecraft:nether_wart"
                        ){
                            dimension.runCommand(`setblock ${upperBlock.location.x} ${upperBlock.location.y} ${upperBlock.location.z} air destroy`);
                        }

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
                                        if(upperBlock.typeId === "minecraft:air"){
                                            if(typePlating === "farmland"){
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
                                            }else if(typePlating === "sand"){
                                                if(item.typeId === "minecraft:sugar_cane"){
                                                    let adjacentBlock;//verifies if there's a water adjacent block
                                                    for(let j = 0; j < 4; j++){
                                                        switch(j){
                                                            case 0:
                                                                adjacentBlock = block.dimension.getBlock({x: local.x, y: local.y+1, z: local.z-1});
                                                                break;
                                                            case 1:
                                                                adjacentBlock = block.dimension.getBlock({x: local.x+1, y: local.y+1, z: local.z});
                                                                break;
                                                            case 2:
                                                                adjacentBlock = block.dimension.getBlock({x: local.x, y: local.y+1, z: local.z+1});
                                                                break;
                                                            case 3:
                                                                adjacentBlock = block.dimension.getBlock({x: local.x-1, y: local.y+1, z: local.z});
                                                                break;
                                                            default:
                                                                adjacentBlock = block.dimension.getBlock({x: local.x, y: local.y+1, z: local.z-1});
                                                        }
                                                        if(adjacentBlock.typeId === "minecraft:water" || adjacentBlock.typeId === "minecraft:flowing_water"){
                                                            fruit = "reeds";
                                                            found = 1;
                                                        }
                                                    }
                                                    
                                                }
                                            }else if(typePlating === "soul_sand"){
                                                if(item.typeId === "minecraft:nether_wart"){
                                                    fruit = "nether_wart";
                                                    found = 1;
                                                }
                                            }
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
                                        
                                        //PLAYING DISPENSER SOUND
                                        dimension.playSound(
                                            "block.click", local
                                        );

                                        //PLANTING USING COMMAND
                                        if(fruit === "reeds"){
                                            dimension.runCommand(`setblock ${selectedPos.x} ${selectedPos.y} ${selectedPos.z} ${fruit} replace`);
                                        }else if(fruit === "nether_wart"){
                                            dimension.runCommand(`setblock ${selectedPos.x} ${selectedPos.y} ${selectedPos.z} ${fruit} ["age" = 0] replace`);
                                        }else{
                                            dimension.runCommand(`setblock ${selectedPos.x} ${selectedPos.y} ${selectedPos.z} ${fruit} ["growth" = 0] replace`);
                                        }
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
        }else{//IF IT'S NOT CONNECTED, IT UPDATES STATE
            const current = block.permutation.getState("miller:activated");
                if(current){
                    block.setPermutation(
                        block.permutation.withState("miller:activated", false)
                    )
                }
        }
    }
}, 10);