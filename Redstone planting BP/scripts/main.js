import { world, system } from "@minecraft/server";

system.runInterval(() => {
    // Spams the chat with "Hello World" with world.sendMessage function from the API
    world.sendMessage("Hello World");
}, 1);//roda a cada tick