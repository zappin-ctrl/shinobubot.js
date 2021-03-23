using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json;
using System.Collections.Generic;
using Discord.Commands;

#nullable enable

namespace shinobu.Commands
{
    public class Simple : ModuleBase<SocketCommandContext>
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
        public async Task EightBall(string? message = null)
        {
            if (null == message || 0 == message.Length) {
                await Helper.SimpleMessage(this.Context, "Please ask a **yes / no** question");
                return;
            }

            var response = await _client.GetStreamAsync("https://8ball.delegator.com/magic/JSON/" + message);
            var data = await JsonSerializer.DeserializeAsync<Dictionary<string, Dictionary<string, string>>>(response);

            await Helper.SimpleMessage(
                this.Context, 
                string.Format(
                    "{0} asks: \n > {1} \n \n **`Answer:`** **{2} {3}**",
                    "placeholder",
                    message,
                    data["magic"]["answer"],
                    Helper.Env(EIGHTBALL_TYPE_DICTIONARY[data["magic"]["type"]])
                )
            );
        }

        [Command("choose")]
        public async Task Choose([Remainder]string? message = null)
        {
            if (null == message || 0 == message.Length) {
                await Helper.SimpleMessage(this.Context, "Please type your options separated with a comma.");
                return;
            }

            var choices = message.Split(",");
            for (int i = 0; i < choices.Length; i++)
            {
                choices[i] = choices[i].Trim();
            }

            if (0 == choices.Length) {
                await Helper.SimpleMessage(this.Context, "Please type your options separated with a comma.");
                return;
            }

            await Helper.SimpleMessage(this.Context, choices[_random.Next(choices.Length)]);
        }

        [Command("coinflip")]
        public async Task Coinflip()
        {
            var embed = Helper.GetEmbed().WithDescription(
                Helper.Env("EMOTE_COINFLIP") + " " + COINFLIP_START_QUOTE[_random.Next(COINFLIP_START_QUOTE.Length)] + " . . . "
            );
            var post = await this.Context.Channel.SendMessageAsync(
                null,
                false,
                embed.Build()
            );
            await Task.Delay(3000);
            await post.ModifyAsync(m => m.Embed = embed.WithDescription(COINFLIP_END_QUOTE[_random.Next(COINFLIP_END_QUOTE.Length)]).Build());
        }

        [Command("roll")]
        public async Task Roll(int? number = null)
        {
            if (null == number || 0 == number) {
                await Helper.SimpleMessage(this.Context, "Please enter a number to roll with it as the max");
                return;
            }

            await Helper.SimpleMessage(
                this.Context,
                string.Format(
                    "**{0}** rolled a **{1}** / {2}",
                    "placeholder",
                    _random.Next((int) number - 1) + 1,
                    number
                )
            );
        }
    }
}
