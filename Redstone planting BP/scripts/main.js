import { world } from "@minecraft/server";

world.afterEvents.playerPlaceBlock.subscribe(ev => {
    const { block, player } = ev;

    // Alert for the block connected
    if (block.typeId === "miller:plant_block") {

        const belowBlock = block.below();

        if( belowBlock.typeId === "minecraft:redstone_torch" || 
            belowBlock.typeId === "minecraft:redstone_block" ||
            (belowBlock.typeId === "minecraft:redstone_wire" && 
            belowBlock.permutation.getState("redstone_signal") !== 0 
            )
        ){
            //POWERED BY REDSTONE
            player.sendMessage("Conectado à redstone!");

            const aboveBlock = block.above();
            const upperBlock = block.above(2);

            //CHECKING ABOVE BLOCKS
            if(aboveBlock.typeId === "minecraft:farmland" && upperBlock.typeId === "minecraft:air"){
                player.sendMessage("Possível de plantar");

                const local = block.location;
                //LOCAL TO BE PLANTED
                const selectedPos = {x: local.x, y: local.y+2, z: local.z};
                //PLANTING USING COMMAND
                player.runCommand(`setblock ${selectedPos.x} ${selectedPos.y} ${selectedPos.z} wheat ["growth"=0] replace`);
                //WARNING
                player.sendMessage("Bloco de trigo colocado!");
            }

        }
    }
});

//redstone_wire
//redstone_torch - não precisa de estado ou variação
//redstone_block

/*//PLACE THE WANTED BLOCK
selectedBlock.setType("minecraft:wheat");*/

//const selectedBlock = world.getDimension("overworld").getBlock(selectedPos);
//const dimension = world.getDimension("overworld");
                //dimension.runCommand(`setblock ${selectedPos.x} ${selectedPos.y} ${selectedPos.z} minecraft:wheat 0`);
                //selectedBlock.setPermutation(wheatSmall);
                
