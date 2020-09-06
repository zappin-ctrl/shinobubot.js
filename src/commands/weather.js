import Discord from "discord.js";
import axios from "axios";
import Canvas from "canvas";
import { registerFont } from 'canvas';

export const run = async (message, args) => {
  try {
    message.channel.startTyping();
    let question = args.join('+');

    if (!question) {
        return message.channel.send("Please type out a valid location.");
    }
    
    let weather;

    weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${question}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);
    
    if (weather.data.cod === 200) {
      let mode = `#000000`
      let light = `#ffe959`;
      let flag = `https://www.countryflags.io/${weather.data.sys.country}/flat/64.png`
      let icon = `http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`;
      let filename;
      //var date = parseInt(new Date(new Date().getTime()).toString().split(" ").slice(4,5).toString().substr(0,2));
      //var test = ((new Date().getTime())+(3600000 * (weather.data.timezone/3600)))
      if (weather.data.dt > weather.data.sys.sunset || weather.data.dt<weather.data.sys.sunrise) {
        light = `#43445c`;
        mode = `#FFFFFF`;
      }
      registerFont('./assets/fonts/Roboto.ttf', { family: 'Roboto' });
      const canvas = Canvas.createCanvas(200, 200);
  	  const ctx = canvas.getContext('2d');
      var x = canvas.width / 2;
      var y = canvas.height / 2;
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

      const flagimage = await Canvas.loadImage(flag);
	    ctx.drawImage(flagimage, -1, 174, 32, 32);

      const image = await Canvas.loadImage(icon);
	    ctx.drawImage(image, 60, -1, 80, 80);

      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'weather.jpg');
      message.channel.send(attachment);
    } else {
      message.channel.send(`Please use a valid location's name.`);
    }
  } catch {
    message.channel.send(`Something went wrong, try another location.`)
  } finally {
    message.channel.stopTyping();
  }
};

export const help = 'See the weather conditions in the location of your choice';
export const helpArguments = '[location]';
export const helpGroup = 'fun';