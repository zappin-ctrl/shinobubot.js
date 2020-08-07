import axios from "axios";

export const run = async (message) => {
    const response = await axios.get('https://nekos.life/api/v2/img/wallpaper');
    await message.channel.send(`${response.data.url} **<- Click for full resolution**`);
};