import JikanWrapper from "../classes/JikanWrapper";
import {RateLimitError} from "../classes/RateLimit";
import {applyDefaultWithNull, getEmbed} from "../utility";

export const run = async (message, args, argsclean) => {
    const manga = argsclean.join(" ").trim();
    if (!manga.length) {
        await message.channel.send("Please specify a manga or id to search for");
        return;
    }

    const id = parseInt(manga);
    if (argsclean.length === 1 && !isNaN(id)) {
        try {
            const result = await JikanWrapper.mangaLookup(id);
            if (result.mal_id !== id) {
                await message.channel.send("Something went wrong while fetching the page.");
                return;
            }

            const embed = getEmbed()
                .setTitle(result.title + " - ID: " + id.toString())
                .setURL(result.url);

            if (result.image_url.length) {
                embed.setThumbnail(result.image_url);
            }

            const description = [
                `**Score:** \`${applyDefaultWithNull(result.score, "?")}\` | **Rank:** \`${applyDefaultWithNull(result.rank, "?")}\` | **Popularity:** \`${applyDefaultWithNull(result.popularity, "?")}\`\n`,
                "**Synopsis:**\n",
                "> " + result.synopsis + "\n",
                `**Volumes:** ${applyDefaultWithNull(result.volumes, "?")}`,
                `**Status:** ${applyDefaultWithNull(result.status, "?")}`
            ];

            if (result.published.string) {
                description.push(`**Published**: ${result.published.string}`);
            }
            if (result.authors.length) {
                description.push(`**Authors:** ${result.authors.map((i) => i.name).join(", ")}`);
            }
            if (result.genres.length) {
                description.push(`**Genres:** ${result.genres.map((i) => i.name).join(", ")}`);
            }

            embed.setDescription(description.join("\n"));
            await message.channel.send(embed);
        } catch (e) {
            if (e instanceof RateLimitError) {
                await message.channel.send("Hitting rate limits, please wait for a bit. (" + e.message + ")");
            } else {
                await message.channel.send(e.message);
            }
        }
        return;
    }

    try {
        const results = await JikanWrapper.mangaSearch(manga);
        const len = results.results.length;
        if (!len) {
            await message.channel.send("Nothing found, maybe revise your query?");
            return;
        }

        const embed = getEmbed()
            .setTitle(`Results for "${manga}"`)
            .setFooter(`Use ${process.env.PREFIX}manga ID to show more info!`);

        const description = [
            "Results found: " + (len > 10 ? "10+" : len.toString()) + "\n"
        ];
        for (let i = 0; i < Math.min(len, 10); i++) {
            const result = results.results[i];
            description.push(`> ${i + 1}. ${result.title} (\`${result.mal_id}\`)`);
        }

        embed.setDescription(description.join("\n"));
        await message.channel.send(embed);
    } catch (e) {
        if (e instanceof RateLimitError) {
            await message.channel.send("Hitting rate limits, please wait for a bit. (" + e.message + ")");
        } else {
            await message.channel.send(e.message);
        }
    }
};

export const help = 'Lookup info on manga series, ya nerd.';
export const helpArguments = '[manga name/ID]';
export const helpGroup = 'anime';