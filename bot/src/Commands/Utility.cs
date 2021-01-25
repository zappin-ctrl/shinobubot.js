using System;
using System.Threading.Tasks;
using Discord.Commands;

namespace shinobu.Commands
{
    class Utility : ModuleBase<SocketCommandContext>
    {
        [Command("ping")]
        public Task Ping()
        {
            this.Context.Channel.SendMessageAsync("yeet my ass");
            return null;
        }
    }
}