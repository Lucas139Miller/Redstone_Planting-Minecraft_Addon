# Redstone Planting Addon 1.1.0


<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/Plant_Block_Thumbnail.png" width="550px">
</p>
Are you having trouble automating your Minecraft World, because you can't build farms that works using just redstone blocks? So this page is for you!

That's a simple addon that allows you for plating on Minecraft using redstone. Perfect for you that wants to automate your world in a simple way using redstone machines. For planting it adds Plant Block, the one who makes the magic happen.

## Plant Block
<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/block_view.png" width="288px">
</p>

Plant block allows you planting a lot of seeds, all you need to do is feed with the seed you want through a hopper, provide the suitable land for the required seed and connect it to redstone.


**Structure**


To make it works, follow the following structure:

<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/plant_block_area.png" width="288px">
</p>

* The bottom side (red glass) is dedicated for the redstone signal source
* Put a hopper in any side edges (north, south, west, east) of plant block
* On the bottom side just put the suitable land for the required seed

Follow for mode details:

**Powering Plant Block**

Redstone block can be activated exclusively by *redstone wire*, *redstone block* and *redstone torch*.
<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/powering.png" width="288px">
</p>

* Warning: The power signal must last at least 11 game ticks (higher than 0.5 seconds)

**Positioning Hoppers Correctly**

Position the hoppers is simple, all you need to do is, put it in any side (north, south, west, east), pointing for Plant Block, just like in the image:

<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/plant_block_hoppers.jpg" width="288px">
</p>

Note that Plant Block can receive more than a hopper at same time, once in different directions, so it has a priority order for getting the seeds. First to be verified is the south hopper, then west, north and finally east (clockwise). Check it on image:

<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/priority_hopper.png" width="288px">
</p>

* Warning: When powering Plant Block, take care to not block hopper flow with redstone signal

**Land for Plant Block**

You must give for Plant Block the farm place, and it deppends what you want to plant, you can use **farmland**, **sand block** or **red sand block** and **soul sand**. It works just like the real game planting rules.

<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/terrains.jpg" width="288px">
</p>

* Remember that if you are planting **sugar cane**, also sand you need water for planting it! For farmland plants you don't need water for plant, but plant block will not affect growing rules

**Example of structure use**

<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/example_structure.jpg" width="288px">
</p>

**What can I plant using Plant Block?**

<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/seeds.png" width="288px">
</p>


Check the list of what Plant Block supports in current version:
* **wheat** - farmland
* **pumpkin** - farmland
* **melon** - farmland
* **beetroot** - farmland
* **carrots** - farmland
* **potatoes** - farmland
* **sugar cane** - sand or red sand *(with a block or water)*
* **nether wart** - soul sand

**Acquiring Plant Block**

You can get a plant block:
* Accessing by creative inventory on *"items"* category
* You can get it through command line 
```
	/give @s miller:plant_block
```
* You can also get Plant Block in survival mode, using crafting table
<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/recipe.png" width="288px">
</p>

**Example of Plant Block use**

Demonstration of each seed type plating

<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/planting_seeds.gif" width="288px">
</p>
* Note that if you activate Plant Block, with a plant in its land, it will break and drop its item

Example of a bigger use of Plant Block

<p align="center">
	<img style="text-align: center" style="width:260px" src="https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/farm.gif" width="288px">
</p>


**Video about this Addon**

[![Watch the video](https://raw.githubusercontent.com/Lucas139Miller/Redstone_Planting-Minecraft_Addon/refs/heads/main/git%20_data/Plant_Block_Thumbnail.png)](https://youtu.be/uE8ukwZbfSs)
 

**WARNING**

* This Addon requires cheats activated
* Note that Minecraft Bedrock Edition has no specific redstone support for Addon creators, except for te actual Beta game version (this Addon was not made for Beta version). It was created using "no conventional tools" for redstone, as a result of this, avoid using too much Plant Bloks! It can lag your world - worry only if you use many of them!
* At the moment, this addon allows just planting wheat, with not supply. I intend to
work on this block to make it plant other seeds, add an interface for refuel the seeds you want
to plant, allow it to connect with hopper and maybe add new tool blocks later
* Feel free for using this Addon and even publish content with this addon, but give me credits for my work

**Dowloading**

You have just to install *RedstonePlanting.mcaddon* and open with minecraft