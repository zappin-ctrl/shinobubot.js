import Discord from "discord.js";
import axios from "axios";
import Canvas from "canvas";
import { registerFont } from 'canvas';

export const run = async (message, args) => {
    message.channel.startTyping(); // do NOT await this, it freezes the execution.
    let question = encodeURI(args.join('+'));
    if (!question) {
        await message.channel.send("Please type out a valid location.");
        return;
    }

    try {
        const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${question}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);

        if (weather.data.cod !== 200) {
            await message.channel.send(`Please use a valid location's name.`);
            message.channel.stopTyping();
            return;
        }

        let mode = `#000000`
        let light = `#ffe959`;
        const flag = `https://www.countryflags.io/${weather.data.sys.country}/flat/64.png`
        const icon = `http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`;
        if (weather.data.dt > weather.data.sys.sunset || weather.data.dt<weather.data.sys.sunrise) {
            light = `#43445c`;
            mode = `#FFFFFF`;
        }
        registerFont('./assets/fonts/Roboto.ttf', { family: 'Roboto' });
        const canvas = Canvas.createCanvas(200, 200);
        const ctx = canvas.getContext('2d');
        const x = canvas.width / 2;
        ctx.beginPath();
        ctx.rect(0, 0, 200, 200);
        ctx.fillStyle = `${light}`;
        ctx.fill();

        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.rect(0, 10, 200, 84);
        ctx.fillStyle = `${mode}`;
        ctx.fill();

        ctx.globalAlpha = 1;

        ctx.font = "48px Roboto";
        ctx.textAlign = 'center';
        ctx.fillStyle = `${mode}`;
        ctx.fillText(`${parseInt(weather.data.main.temp)}°C`, x, 150);
        ctx.font = "23px Roboto";
        ctx.fillText(`${weather.data.weather[0].main.toLowerCase()}`, x, 180);
        ctx.font = "14px Roboto";
        ctx.fillText(`${weather.data.name}`, x, 82);

        ctx.drawImage(await Canvas.loadImage(flag), -1, 174, 32, 32);

        ctx.drawImage(await Canvas.loadImage(icon), 60, -1, 80, 80);

        await message.channel.send(new Discord.MessageAttachment(canvas.toBuffer(), 'weather.jpg'));
    } catch (e) {
        await message.channel.send(`Something went wrong, try another location.`);
    } finally {
        message.channel.stopTyping();
    }
};

export const help = 'See the weather conditions in the location of your choice';
export const helpArguments = '[location]';
export const helpGroup = 'fun';
