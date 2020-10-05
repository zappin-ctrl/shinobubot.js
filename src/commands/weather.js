import Discord from "discord.js";
import axios from "axios";
import Canvas from "canvas";
import _ from "lodash";

let humidity = null;
let wind = null;

export const run = async (message, args) => {
    message.channel.startTyping(); // do NOT await this, it freezes the execution.
    let question = encodeURI(args.join('+'));
    if (!question) {
        await message.channel.send("Please type out a valid location.");
        return;
    }

    if (_.isNull(humidity)) {
        humidity = await Canvas.loadImage('./assets/images/humidity.png');
        wind = await Canvas.loadImage('./assets/images/wind.png');
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

        const canvas = Canvas.createCanvas(400, 400);
        const ctx = canvas.getContext('2d');
        let x = canvas.width / 2;
        ctx.beginPath();
        ctx.rect(0, 0, 400, 400);
        ctx.fillStyle = `${light}`;
        ctx.fill();

        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.rect(0, 20, 400, 168);
        ctx.fillStyle = `${mode}`;
        ctx.fill();

        ctx.globalAlpha = 1;

        ctx.font = "80px Roboto";
        ctx.textAlign = 'center';
        ctx.fillStyle = `${mode}`;
        ctx.fillText(`${parseInt(weather.data.main.temp)}°C`, x, 290);
        ctx.font = "40px Roboto";
        ctx.fillText(`${weather.data.weather[0].main.toLowerCase()}`, x, 380);
        ctx.font = "24px Roboto";
        ctx.fillText(`${weather.data.name}`, x, 164);

        ctx.globalAlpha = 0.7;

        ctx.font = "25px Roboto";
        ctx.fillText(`feels like ${parseInt(weather.data.main.feels_like)}°C`, x, 320)

        ctx.globalAlpha = 1;

        ctx.drawImage(humidity, 35, 250, 31, 31)

        ctx.font = "21px Roboto";
        ctx.fillText(`${parseInt(weather.data.main.humidity)}%`, 51.5, 310)

        ctx.drawImage(wind, 330.5, 250, 35, 35)

        ctx.font = "18px Roboto";
        ctx.fillText(`${parseInt(weather.data.wind.speed)}km/h`, 350, 305)

        ctx.drawImage(await Canvas.loadImage(flag), -2, 9, 64, 64);

        ctx.drawImage(await Canvas.loadImage(icon), 120, -2, 160, 160);

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
