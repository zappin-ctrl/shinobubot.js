const keep_alive = require('./keep_alive.js')
const Discord = require("discord.js");
require('dotenv').config();
const prefix = process.env.PREFIX
const token = process.env.DISCORD_TOKEN
const Enmap = require("enmap");
const fs = require("fs");

global.getUserFromMention=function(e){if(e)return e.startsWith("<@")&&e.endsWith(">")?((e=e.slice(2,-1)).startsWith("!")&&(e=e.slice(1)),client.users.cache.get(e)):client.users.cache.get(e)};

const client = new Discord.Client();


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {  
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();
client.aliases = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {

    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    props.conf.aliases.forEach(aliases => { 
    console.log(`Attempting to load alias ${aliases}`);
    client.aliases.set(aliases, props); 
    });
  });
});


client.login(process.env.DISCORD_TOKEN).catch(console.error);