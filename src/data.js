import fs from "fs";

if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}

export function saveCommandOutputs(guildId, cmd, inLastSeconds) {
    if (!fs.existsSync(`./logs/${guildId}`)) {
        fs.mkdirSync(`./logs/${guildId}`);
    }

    if (!fs.existsSync(`./logs/${guildId}/cmd-logs/`)) {
        fs.mkdirSync(`./logs/${guildId}/cmd-logs/`)
    }

    const date = (new Date()).toISOString();

    fs.writeFileSync(`./logs/${guildId}/cmd-logs/${date
        .replace('T', '_')
        .replace(':', '-')
        .substr(0, 16)}-cmdout.json`, JSON.stringify({
        'date': date,
        'guild': guildId,
        'cmds': cmd,
        'inSeconds': inLastSeconds
    }));
}