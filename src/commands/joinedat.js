import { getUserFromMention } from "../utility";

function convertMS(milliseconds) {
    var days, hour, minute, seconds, years, months, weeks;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    days = Math.floor(hour / 24);
    hour = hour % 24;
    weeks = Math.floor(days / 7);
    months = Math.floor(days / 30);
    years = Math.floor(days / 365);
    if (years) {
        return `${years} year(s)`;
    } else if (!years && months) {
        return `${months} month(s)`;
    } else if (!months && weeks) {
        return `${weeks} week(s)`;
    } else if (!weeks && days) {
        return `${days} day(s)`;
    } else if (!days && hour) {
        return `${hour} hour(s)`;
    } else if (!hour && minute) {
        return `${minute} minute(s)`;
    } else if (!minute && seconds) {
        return `${seconds} second(s)`;
    }
}

export const aliases = ["join", "joined", "joindate", "whendidigethere"];
export const run = async(message, args) => {
    let start = Date.now();
    let end;
    let complete;
    if (!args[0]) {
        try {
            end = message.member.joinedAt;
            complete = (start - end);
            await message.channel.send(`> 🛎 **${message.member.user.username}**, you joined **${convertMS(complete)}** ago!\n*(${end.toUTCString().replace(" GMT","")})*`);
        } catch {
            await message.channel.send("You're not in a server.");
            return;
        }
    } else {
        let user = await getUserFromMention(args[0], message, true);
        let memuser = message.channel.guild.member(user);
        if (!user || !memuser) {
            await message.channel.send(`That's not a valid member.`);
            return;
        }
        end = memuser.joinedAt;
        complete = start - end;
        await message.channel.send(`> 🛎 **${memuser.user.username}** joined **${convertMS(complete)}** ago!\n*(${end.toUTCString().replace(" GMT","")})*`);
    }
};

export const help = "Show when you/someone joined!";
export const helpArguments = '[mention] (optional)';
export const helpGroup = 'utility';