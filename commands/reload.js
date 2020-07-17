exports.run = (client, message, args) => {
 if(message.author.id === "148407805882269696") { 
  if(!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  const commandName = args[0];
  // Check if the command exists and is valid
  if(!client.commands.has(commandName) /* && !client.aliases.has(commandName)*/) {
    return message.reply("That command does not exist");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  client.commands.delete(commandName);
  client.aliases.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  props.conf.aliases.forEach(aliases => { 
    console.log(`Reloading aliases ${aliases}`);
    client.aliases.set(aliases, props);  
 });
 message.reply(`The command ${commandName} has been reloaded`);
 console.log(`Reloading command ${commandName}`)
};
}
  exports.conf = {
    aliases: []
  }