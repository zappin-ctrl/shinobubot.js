import axios from "axios";
import _ from "lodash";
import {getEmbed} from "../utility";

const times = ['1st', '2nd'];

export const aliases = ['definition', 'urban', 'meaning'];
export const run = async (message, args) => {
    if (!args[0]) {
        await message.channel.send("You need to supply a word or phrase.");
        return;
    }

    const question = args.join('_');
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${question}`);
    if (response.data.title === 'No Definitions Found') {
        await message.channel.send("Couldn't find a definition for that.");
        return;
    }

    const result = response.data[0];
    const final = [];
    for (let meaning of result.meanings) {
        let example = '';
        let synonym = '';
        const type = meaning.partOfSpeech;
        const definition = meaning.definitions[0].definition;

        if (!_.isUndefined(meaning.definitions[0].example)) {
            example = "\n> \n> **Example: **" + meaning.definitions[0].example;
        }
        if (!_.isUndefined(meaning.definitions[0].synonyms)) {
            synonym = "\n> \n> **Synonyms:** " + meaning.definitions[0].synonyms;
        }

        final.push(`**\`` + times[final.length] + ` Result\`**\n(*${type}*)\n\n> **Definition: **${definition}${example}${synonym}`);
        if (final.length === times.length) {
            break;
        }
    }

    await message.channel.send(
        getEmbed()
            .setTitle('"' + args.join(" ") + '"')
            .setDescription(final.join('\n\n\n'))
    );
};