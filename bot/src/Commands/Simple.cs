using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json;
using System.Collections.Generic;
using Disqord;
using Disqord.Bot;
using Disqord.Rest;
using Shinobu.Attributes;
using Qmmands;

namespace Shinobu.Commands
{
    public class Simple : DiscordModuleBase
    {
        private readonly HttpClient _client;
        private readonly Random _random;

        private readonly Dictionary<string, string> EIGHTBALL_TYPE_DICTIONARY = new Dictionary<string, string>()
        {
            { "Affirmative", "EMOTE_PLUS" },
            { "Contrary", "EMOTE_MINUS" },
            { "Neutral", "EMOTE_NEUTRAL" }
        };

        private readonly string[] COINFLIP_START_QUOTE = {
            "Tossing a coin",
            "Flipping the coin of fate",
            "Heads or tails? Let's see"
        };
        private readonly string[] COINFLIP_END_QUOTE = {
            "**Heads!**",
            "**Tails!**"
        };

        public Simple(HttpClient client, Random random)
        {
            _client = client;
            _random = random;
        }

        [Command("8ball")]
        public async Task<DiscordCommandResult> EightBall(string? message = null)
        {
            if (string.IsNullOrEmpty(message))
            {
                return Response("Please ask a **yes / no** question");
            }

            var response = await _client.GetStreamAsync("https://8ball.delegator.com/magic/JSON/" + message);
            var data = await JsonSerializer.DeserializeAsync<Dictionary<string, Dictionary<string, string>>>(response);

            return Response(string.Format(
                "{0} asks: \n > {1} \n \n **`Answer:`** **{2} {3}**",
                "placeholder",
                message,
                data["magic"]["answer"],
                Helper.Env(EIGHTBALL_TYPE_DICTIONARY[data["magic"]["type"]])
            ));
        }

        [Command("choose")]
        public DiscordCommandResult Choose([Remainder]string? message = null)
        {
            if (string.IsNullOrEmpty(message))
            {
                return Response("Please type your options separated with a comma.");
            }

            var choices = message.Split(",");
            for (int i = 0; i < choices.Length; i++)
            {
                choices[i] = choices[i].Trim();
            }

            if (0 == choices.Length)
            {
                return Response(
                    "Please type your options separated with a comma."
                );
            }

            return Response(
                choices[_random.Next(choices.Length)]
            );
        }

        [Command("coinflip")]
        public async Task Coinflip()
        {
            var embed = Helper.GetEmbed().WithDescription(
                Helper.Env("EMOTE_COINFLIP") + " " + COINFLIP_START_QUOTE[_random.Next(COINFLIP_START_QUOTE.Length)] + " . . . "
            );
            var response = await Response(embed);
            await Task.Delay(3000);
            await response.ModifyAsync(x => x.Embed = embed.WithDescription(
                COINFLIP_END_QUOTE[_random.Next(COINFLIP_END_QUOTE.Length)]
            ).Build());
        }

        [Command("roll")]
        [ErrorMessage("Please enter a number to roll with it as the max")]
        public DiscordCommandResult Roll(int number)
        {
            // todo: add a failure jump via exception?
            if (0 == number)
            {
                return Response("Please enter a number to roll with it as the max");
            }

            return Response(string.Format(
                    "**{0}** rolled a **{1}** / {2}",
                    "placeholder",
                    _random.Next((int) number - 1) + 1,
                    number
                )
            );
        }

        [Command("usertest")]
        public DiscordCommandResult TestMember(IReadOnlyCollection<IMember?> users)
        {
            string message = "found users: ";
            foreach (var u in users) {
                if (u is null) {
                    message += "nulluser, ";
                    continue;
                }
                message += u.Id.ToString() + ", ";
            }
            
            return Response(message);
        }
    }
}
