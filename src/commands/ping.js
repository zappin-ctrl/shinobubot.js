import client from "../bot";

export const run = async (message) => {
    const post = await message.channel.send("Ping?");
    await post.edit(`Latency is ${post.createdTimestamp - message.createdTimestamp}ms. API latency is ${Math.round(client.ws.ping)}ms`);
};

export const help = "Calculate response time for bot <-> server <-> api";
export const helpGroup = 'utility';