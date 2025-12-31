# Redstone Planting Addon 1.0

That's a simple addon that allows you for plating on Minecraft using redstone. Perfect for you that wants to automate yout world using redstone machines.
1.0 Version adds Plant Block, the one who makes the magic happen.

## Plant Block

<img align="left" style="width:260px" src="git_data/block_view.png" width="288px">

A block activated by redstone that plants wheat on a farmland. 


**Structure**


- This block must be fed from below and farmland must be placed upon it. (Block will not be activated if not in the correct structure).

![Structure for Plant Block](git_data/plant_block_area.png)

**Powering Plant Block**

- Redstone block can be activated exclusively by *redstone wire*, *redstone block* and *redstone torch*.

![Using redstone block for activating](git_data/source1.gif)

![Using redstone torch activating](git_data/source2.gif)

![Using redstone wire for activating](git_data/source3.gif)

- The power signal must last at least 11 game ticks (higher than 0.5 seconds).

**Acquiring Plant Block**

- You can get a plant block:
* Accessing by creative inventory on *"items"* category
* You can get it through command line 
```
	/give @s miller:plant_block
```
* You can also get Plant Block in survival mode, using crafting table

![Plant Block recipe, it consist in six cobblestone bloccs, one of redstone, one of iron ingot and one wheat seed. It looks like dispenser recipe](git_data/plant_block_recipe.png)

**Example of Plant Block use**

- A good example of using Plant Block is and automatic wheat farm

![Small wheat farm using Plant Block](git_data/farm.gif)

**Video about this Addon**

VIDEO 

**WARNING**

- This Addon requires cheats activated
- Note that Minecraft Bedrock Edition has no specific redstone support for Addon creators, except for te actual Beta game version (this Addon was not made for Beta version). It was created using "no conventional tools" for redstone, as a result of this, avoid using too much Plant Bloks! It can lag your world - worry only if you use many of them!
- At the moment, this addon allows just planting wheat, with not supply. I intend to
work on this block to make it plant other seeds, add an interface for refuel the seeds you want
to plant, allow it to connect with hopper and maybe add new tool blocks later
- Feel free for using this Addon and even publish content with this addon, but give me credits for my work

**Dowloading**

- You have just to install *RedstonePlanting.mcaddon* and open with minecraft