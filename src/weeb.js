import {commands} from "./bot";
import {addCommand, deleteCommand, genericCommandData, handleSimplePost} from "./utility";
import axios from "axios";
import fs from "fs";
import logger from "./logger";
import _ from "lodash";

const API_URL = 'https://api.weeb.sh/images/';
const weebFile = JSON.parse(fs.readFileSync('./assets/weeb.json', 'utf8'));

async function callApi(url, data) {
    return await axios.get(API_URL + url, {
        headers: {
            Authorization: process.env.WEEBSH_AUTHORIZATION
        }, ...data
    });
}

export let weebCommands = [];

async function handleWeebCommand(message, args, argsclean, command) {
    const info = commands[command].info;
    if (_.isUndefined(info)) {
        logger.warning(`[Weeb] Command ${command} was called but no info was found for it`);
        return;
    }

    await handleSimplePost(message, args, await callApi('random', {
        params: {
            type: info.type,
            nsfw: 'false'
        }
    }), info.mention, info.noMention);
}

export async function loadWeebCommands() {
    if (!process.env.WEEBSH_AUTHORIZATION) {
        return;
    }

    try {
        weebCommands = [];
        const response = await callApi('types');
        let groupCounter = 4;
        let newGroupCount = 0;
        for (const type of response.data.types) {
            const data = weebFile[type] ?? genericCommandData[type] ?? null;
            if (null === data) {
                continue; // command is valid but we don't care about it for one or other reason
            }

            let currentHelpGroup = data.helpSimpleGroup;
            if (_.isUndefined(currentHelpGroup)) {
                currentHelpGroup = groupCounter;
                newGroupCount++;
            }

            deleteCommand(type);
            addCommand(type, {
                run: handleWeebCommand,
                command: type,
                info: {
                    mention: data.mention,
                    noMention: data.noMention,
                    type: type
                },
                helpGroup: 'gif',
                helpSimpleGroup: currentHelpGroup
            }, data.aliases);

            if (newGroupCount > 5) {
                newGroupCount = 0;
                groupCounter++;
            }
        }
    } catch (e) {
        logger.error("Weeb.sh request failed " + e.toString());
    }
}