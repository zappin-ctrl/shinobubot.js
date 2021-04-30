using System;
using System.Threading.Tasks;
using Disqord.Bot;
using Disqord.Rest;
using Qmmands;

namespace Shinobu.Commands
{
    public class Utility : DiscordModuleBase
    {
        private const string PING_MESSAGE = "Receive delay {0}ms, latency is {1}ms";    

        [Command("ping")]
        public async Task Ping()
        {
            long now = Helper.GetTimestamp();
            long message = Context.Message.CreatedAt.ToUnixTimeMilliseconds();
            long diff = now - message;
            var embed = Helper.GetEmbed(String.Format(PING_MESSAGE, diff, '?'));
            var response = await Response(embed);
            await response.ModifyAsync(x => 
                x.Embed = embed.WithDescription(
                    String.Format(PING_MESSAGE, diff, response.CreatedAt.ToUnixTimeMilliseconds() - message)
                    ).Build()
                );
        }
    }
}