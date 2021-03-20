using System;
using System.IO;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json;
using System.Collections.Generic;
using Discord.Commands;

#nullable enable

namespace shinobu.Commands
{
    public class Utility : ModuleBase<SocketCommandContext>
    {
        private readonly HttpClient _client;
        private readonly Dictionary<string, string> _eightballTypeDictionary = new Dictionary<string, string>()
        {
            { "Affirmative", "EMOTE_PLUS" },
            { "Contrary", "EMOTE_MINUS" },
            { "Neutral", "EMOTE_NEUTRAL" }
        };
        private const string PING_MESSAGE = "Receive delay {0}ms, latency is {1}ms";
        
        public Utility(HttpClient client)
        {
            _client = client;
        }

        [Command("ping")]
        public async Task Ping()
        {
            long now = Helper.GetTimestamp();
            long message = this.Context.Message.CreatedAt.ToUnixTimeMilliseconds();
            long diff = now - message;
            var embed = Helper.GetEmbed().WithDescription(String.Format(PING_MESSAGE, diff, '?'));
            var msg = await this.Context.Channel.SendMessageAsync(null, false, embed.Build());
            await msg.ModifyAsync(m => m.Embed = embed.WithDescription(String.Format(PING_MESSAGE, diff, msg.CreatedAt.ToUnixTimeMilliseconds() - message)).Build());
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

            await this.Context.Channel.SendMessageAsync(
                null, 
                false, 
                Helper.GetEmbed(
                    string.Format(
                        "{0} asks: \n > {1} \n \n **`Answer:`** **{2} {3}**",
                        "placeholder",
                        message,
                        data["magic"]["answer"],
                        Helper.Env(_eightballTypeDictionary[data["magic"]["type"]])
                    )
                ).Build()
            );
        }
    }
}