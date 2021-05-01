using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json;
using System.Collections.Generic;
using Disqord;
using Disqord.Bot;
using Disqord.Rest;
using Shinobu.Attributes;
using Shinobu.Extensions;
using Qmmands;

namespace Shinobu.Commands
{
    public class Simple : ShinobuModuleBase
    {
        private const string RESPECTS_TEXT = "**{0} {1}** paid their respects{2}";
        
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

        private readonly string[] FIGHT_START_QUOTES = {
            "Getting ready to rumble",
            "On your marks, get set, go",
            "There's a brawl brewing",
            "The stage is set, fight",
            "This one's for Knack 2 baby",
            "This is a battle for the legends",
            "Let's fucking GOOOOOO",
            "Winner is chad, loser is incel"
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
                return Embed("Please type your options separated with a comma");
            }

            var choices = message.Split(",");
            for (int i = 0; i < choices.Length; i++)
            {
                choices[i] = choices[i].Trim();
            }

            if (0 == choices.Length)
            {
                return Embed("Please type your options separated with a comma");
            }

            return Embed(choices.Random());
        }

        [Command("coinflip")]
        public async Task Coinflip()
        {
            var embed = GetEmbed(
                Helper.Env("EMOTE_COINFLIP") + " " + COINFLIP_START_QUOTE.Random() + " . . . "
            );
            var response = await Response(embed);
            await Task.Delay(3000);
            await response.ModifyAsync(x => x.Embed = embed.WithDescription(
                COINFLIP_END_QUOTE.Random()
            ).Build());
        }

        [Command("roll")]
        [ErrorMessage("Please enter a number to roll with it as the max")]
        public DiscordCommandResult Roll(int number)
        {
            // todo: add a failure jump via exception?
            if (0 == number)
            {
                return Embed("Please enter a number to roll with it as the max");
            }

            return Embed(string.Format(
                    "**{0}** rolled a **{1}** / {2}",
                    Context.Author.Mention,
                    _random.Next((int) number - 1) + 1,
                    number
                )
            );
        }

        [Command("avatar", "pfp", "image", "profilepic", "pic")]
        [RequireGuild]
        public async Task<DiscordCommandResult> Avatar(IMember? member = null)
        {
            member ??= await Context.GetCurrentMember();

            return Reply(
                GetEmbed()
                    .WithTitle(member.NickOrName() + "'s avatar")
                    .WithImageUrl(member.GetAvatarUrl(ImageFormat.Default, 256))
            );
        }

        [Command("emote", "emoji", "enlarge", "steal")]
        public DiscordCommandResult Emote(ICustomEmoji emoji)
        {
            return Reply(
                GetEmbed()
                    .WithImageUrl(emoji.GetUrl())
                    .WithTitle(emoji.Name ?? "No emote name")
                    .WithFooter("ID: " + emoji.Id.ToString() + string.Format(", {0}", emoji.IsAnimated ? "Animated (.gif)" : "Image (.png)"))
                    .WithUrl(emoji.GetUrl())
            );
        }

        [Command("f", "rip")]
        public DiscordCommandResult Respects(string? towards = null)
        {
            return Embed(
                string.Format(
                    RESPECTS_TEXT,
                    Helper.Env("DEAD_EMOTE"),
                    Context.Author.Mention,
                    string.IsNullOrEmpty(towards) ? "" : " for " + towards
                )
            );
        }

        [Command("fight", "battle", "vs")]
        public async Task Fight(IMember? member = null)
        {
            if (null == member || member.Id == Context.Author.Id)
            {
                await Embed(string.Format(
                    "{0} killed themselves {1}",
                    Context.Author.Mention,
                    Helper.Env("DEAD_EMOTE")
                ));
                return;
            }

            var embed = GetEmbed(Helper.Env("LOADING_EMOTE") + " " + FIGHT_START_QUOTES.Random());
            var response = await Response(embed);

            var items = new List<IUser> {Context.Author, member};
            var index = _random.Next(items.Count);
            var winner = items[index];
            items.RemoveAt(index);
            var loser = items[0];
            
            await Task.Delay(3000);
            await response.ModifyAsync(x => x.Embed = embed.WithDescription(string.Format(
                "{0} is the winner! **R.I.P. {1}** {2}",
                winner.Mention,
                loser.Mention,
                Helper.Env("DEAD_EMOTE")
            )).Build());
        }

        [Command("usertest")]
        public DiscordCommandResult TestMember(params IMember?[] users)
        {
            string message = "found users: ";
            foreach (var u in users) {
                if (u is null) {
                    message += "nulluser, ";
                    continue;
                }
                message += u.Id.ToString() + ", ";
            }
            
            return Embed(message);
        }
    }
}
