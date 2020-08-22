import JikanWrapper from "../classes/JikanWrapper";
import {RateLimitError} from "../classes/RateLimit";
import {applyDefaultWithNull, ellipseText, getEmbed} from "../utility";

export const run = async (message, args, argsclean) => {
    const anime = argsclean.join(" ").trim();
    if (!anime.length) {
        await message.channel.send("Please specify an anime or id to search for");
        return;
    }

    const id = parseInt(anime);
    if (argsclean.length === 1 && !isNaN(id)) {
        try {
            const result = await JikanWrapper.animeLookup(id);
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
                "> " + ellipseText(result.synopsis, 500) + "\n",
                `**Episodes:** ${applyDefaultWithNull(result.episodes, "?")}`,
                `**Status:** ${applyDefaultWithNull(result.status, "?")}`
            ];

            if (result.aired.string) {
                description.push(`**Aired**: ${result.aired.string}`);
            }
            if (result.studios.length) {
                description.push(`**Studios:** ${result.studios.map((i) => i.name).join(", ")}`);
            }
            if (result.genres.length) {
                description.push(`**Genres:** ${result.genres.map((i) => i.name).join(", ")}`);
            }

            if (result.opening_themes.length || result.ending_themes.length) {
                description[description.length - 1] += "\n";
            }

            if (result.opening_themes.length) {
                description.push(`**OPs:** ${ellipseText(result.opening_themes.join(", "))}`);
            }

            if (result.ending_themes.length) {
                description.push(`**EDs:** ${ellipseText(result.ending_themes.join(", "))}`);
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
        const results = await JikanWrapper.animeSearch(anime);
        const len = results.results.length;
        if (!len) {
            await message.channel.send("Nothing found, maybe revise your query?");
            return;
        }

        const embed = getEmbed()
            .setTitle(`Results for "${anime}"`)
            .setFooter(`Use ${process.env.PREFIX}anime ID to show more info!`);

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