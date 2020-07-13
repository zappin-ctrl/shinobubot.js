exports.run = async (client, message, args) => {
   // aliases: ["pong"]
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
  exports.conf = {
    aliases: ["pong"]
  }