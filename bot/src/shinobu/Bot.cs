using System;
using System.Threading.Tasks;
using Discord.WebSocket;

namespace shinobu
{
    class Bot
    {
        private DiscordSocketClient client;

        static void Main(string[] args)
            => new Bot().Run(args).GetAwaiter().GetResult();

        public async Task Run(string[] args)
        {
            this.client = new DiscordSocketClient();

            await this.client.LoginAsync(Discord.TokenType.Bot, "");
            await this.client.StartAsync();

            await Task.Delay(-1);
        }
    }
}
