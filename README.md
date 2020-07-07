# Anime bot for my server, just a project for fun.
**How to install it:**<br>
**1)** Run `npm init -y` <br>
**2)** Run `npm install` <br>
**3)** Edit `.env` with your bot token & desired prefix<br>
*// If you're not running it on repl.it, remove `keep_alive.js` and its request in `index.js` up top* <br>
*// If you are running it on repl.it, setup UptimeRobot* <br>
**4)** Run `node index.js` or double-click `start.bat`<br>
(*you can `shift + right-click` in the folder and launch Windows Shell to run these*)

**Ta-dah, you -hopefully- have a working bot.**
**Feel free to bully me on Discord @ `zappin#1312`**

It uses **nekos.life** for most of the commands, though some use **waifu.pics**.


**These are its dependencies for now.**

```
    "async": "^3.2.0",
    "asynckit": "^0.4.0",
    "benchmark": "^2.1.4",
    "combined-stream": "^1.0.8",
    "delayed-stream": "^1.0.0",
    "discord.js": "^12.2.0",
    "dotenv": "^8.2.0",
    "enmap": "^5.3.1",
    "event-target-shim": "^5.0.1",
    "express": "^4.17.1",
    "mime-types": "^2.1.27",
    "module": "^1.2.5",
    "node-fetch": "^2.6.0",
    "prism-media": "^1.2.2",
    "setimmediate": "^1.0.5"
```

**Graciously borrowed code from:** <br>
https://github.com/SwitchbladeBot/switchblade/blob/dev/src/commands/gifs/hug.js <br>
https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3 <br>
https://leovoel.github.io/embed-visualizer/ <br>
https://discordjs.guide/miscellaneous/parsing-mention-arguments.html#implementation <br>
https://www.codementor.io/@garethdwyer/building-a-discord-bot-with-node-js-and-repl-it-mm46r1u8y <br>
https://waifu.pics/docs <br>
https://github.com/Nekos-life/nekos-dot-life
