using System;
using System.Threading.Tasks;
using Discord.Commands;

namespace shinobu.Commands
{
    public class Utility : ModuleBase<SocketCommandContext>
    {
        [Command("ping", RunMode=RunMode.Async)]
        public Task Ping()
        {
            this.Context.Channel.SendMessageAsync("yeet my ass");
            return null;
        }
    }
}