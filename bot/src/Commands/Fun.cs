using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Disqord;
using Disqord.Bot;
using Disqord.Rest;
using Qmmands;
using Shinobu.Extensions;
using Shinobu.Utility;

namespace Shinobu.Commands
{
    public class Fun : ShinobuModuleBase
    {
        private const string RESPECTS_TEXT = "**{0} {1}** paid their respects{2}";

        private const string GAY_SELF = "You're **{0}%** gay! {1}";
        private const string GAY_ELSE = "{2} is **{0}%** gay! {1}";

        private readonly HttpClient _client;
        private readonly Random _random;
        
        private readonly Dictionary<string, string> _eightballTypeDictionary = new Dictionary<string, string>()
        {
            { "Affirmative", "EMOTE_PLUS" },
            { "Contrary", "EMOTE_MINUS" },
            { "Neutral", "EMOTE_NEUTRAL" }
        };
        
        private readonly string[] _coinflipStartQuote = {
            "Tossing a coin",
            "Flipping the coin of fate",
            "Heads or tails? Let's see"
        };
        private readonly string[] _coinflipEndQuote = {
            "**Heads!**",
            "**Tails!**"
        };
        
        private readonly string[] _fightStartQuotes = {
            "Getting ready to rumble",
            "On your marks, get set, go",
            "There's a brawl brewing",
            "The stage is set, fight",
            "This one's for Knack 2 baby",
            "This is a battle for the legends",
            "Let's fucking GOOOOOO",
            "Winner is chad, loser is incel"
        };

        private readonly RangeHelper<string> _gayRanges = new RangeHelper<string>(new Range<string>[]
        {
            new Range<string>(0, "You're straight! Congrats!", 0),
            new Range<string>(1, "Not that gay tbh", 24),
            new Range<string>(25, "Kinda gay I guess", 49),
            new Range<string>(50, "So gay it hurts oof", 100),
            new Range<string>(101, "You're beyond gay wow", 200),
            new Range<string>(201, "You're gay beyond what is cosmically known...", 206),
            new Range<string>(207, "GAY OVERLORD OF CUM")
        });
        
        public Fun(HttpClient client, Random random)
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
                Helper.Env(_eightballTypeDictionary[data["magic"]["type"]])
            ));
        }
        
        [Command("choose")]
        public DiscordCommandResult Choose([Remainder][Minimum(3)] string message)
        {
            var choices = message.Split(",");
            for (int i = 0; i < choices.Length; i++)
            {
                choices[i] = choices[i].Trim();
            }

            choices = choices.Where(x => !string.IsNullOrEmpty(x)).ToArray();
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
                Helper.Env("EMOTE_COINFLIP") + " " + _coinflipStartQuote.Random() + " . . . "
            );
            var response = await Response(embed);
            await Task.Delay(3000);
            await response.ModifyAsync(x => x.Embed = embed.WithDescription(
                _coinflipEndQuote.Random()
            ).Build());
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
        [RequireGuild]
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

            var embed = GetEmbed(Helper.Env("LOADING_EMOTE") + " " + _fightStartQuotes.Random());
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

        [Command("gay")]
        [RequireGuild]
        public DiscordCommandResult Gay(IMember? member = null)
        {
            var user = (IUser?) member ?? Context.Author;
            var result = (int) Math.Round(Math.Abs((((Math.Cos(user.Id)) * Math.PI) * 0.5) + 0.5) * 100);
            return Response(
                GetEmbed(
                        string.Format(
                            user.IsSameAs(Context.Author) ? GAY_SELF : GAY_ELSE,
                            result.ToString(),
                            Helper.Env("EMOTE_DANCE"),
                            user.Mention
                        )
                    )
                    .WithImageUrl(string.Format("http://www.yarntomato.com/percentbarmaker/button.php?barPosition={0}&leftFill=%23FF99FF", result.ToString()))
                    .WithFooter(_gayRanges.GetValue(result))
            );
        }
        
        [Command("roll")]
        public DiscordCommandResult Roll([Minimum(1)] int number)
        {
            return Embed(string.Format(
                    "**{0}** rolled a **{1}** / {2}",
                    Context.Author.Mention,
                    _random.Next((int) number - 1) + 1,
                    number
                )
            );
        }
    }
}