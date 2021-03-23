using System;
using System.Threading.Tasks;
using Discord.Commands;

#nullable enable

namespace shinobu.Commands
{
    public class Utility : ModuleBase<SocketCommandContext>
    {
        private const string PING_MESSAGE = "Receive delay {0}ms, latency is {1}ms";    

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
    }
}