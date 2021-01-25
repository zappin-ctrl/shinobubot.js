using System;
using System.Threading.Tasks;
using Discord.WebSocket;
using CommandLine;
using Microsoft.Extensions.DependencyInjection;

namespace shinobu
{
    class Bot
    {
        private ServiceCollection services;

        static int Main(string[] args)
            => new Bot().Run(args).GetAwaiter().GetResult();

        public async Task<int> Run(string[] args)
        {
            Parser.Default.ParseArguments<Options>(args).WithParsed(o => {
                var path = o.envPath == null ? null : o.envPath + "/.env.local";
                DotNetEnv.Env.Load(path);
            });

            string token = System.Environment.GetEnvironmentVariable("DISCORD_TOKEN");
            if (null == token || 0 == token.Length) {
                Console.WriteLine(".env file could not be read, recheck your .env file or specify env-path as a cli argument");
                return -1;
            }
            this.services = new ServiceCollection();
            this.services.AddSingleton<DiscordSocketClient>();

            var provider = this.services.BuildServiceProvider();
            provider.GetService<DiscordSocketClient>().Log += this.Log;


            await provider.GetService<DiscordSocketClient>().LoginAsync(Discord.TokenType.Bot, token);
            await provider.GetService<DiscordSocketClient>().StartAsync();

            await Task.Delay(-1);
            return 0;
        }

        private Task Log(Discord.LogMessage msg)
        {
            Console.WriteLine(msg.ToString());
            return Task.CompletedTask;
        }
    }
}
