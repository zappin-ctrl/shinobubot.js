import axios from "axios";

const partialCache = {};

export const run = async (message, args, argsclean) => {
    const anime = argsclean.join(" ").trim();
    if (!anime.length) {
        await message.channel.send("Please specify an anime or id to search for");
        return;
    }

    const id = parseInt(anime);
    if (argsclean.length === 1 && !isNaN(id)) {

        await message.channel.send("Send animo!");
        return;
    }

    await message.channel.send("yeeting logic for search");
};