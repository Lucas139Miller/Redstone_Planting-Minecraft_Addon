import { world } from "@minecraft/server";

world.afterEvents.playerPlaceBlock.subscribe(ev => {
    const { block, player } = ev;

    // Mostra sempre o bloco colocado
    player.sendMessage(`DEBUG: ${block.typeId}`);

    // Só alerta se for o seu bloco
    if (block.typeId === "miller:plant_block") {
        const { x, y, z } = block.location;
        player.sendMessage(`Detectado plant_block em X:${x} Y:${y} Z:${z}`);
    }
});
