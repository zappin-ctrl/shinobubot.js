using System;
using System.Threading.Tasks;
using Discord.WebSocket;
using Discord.Commands;
using CommandLine;
using Microsoft.Extensions.DependencyInjection;

namespace shinobu
{
    class Bot
    {
        static int Main(string[] args)
            => new Bot().Run(args).GetAwaiter().GetResult();

        public async Task<int> Run(string[] args)
        {
            var services = this.ConfigureServices();

            Parser.Default.ParseArguments<Options>(args).WithParsed(o => {
                var path = o.envPath == null ? null : o.envPath + "/.env.local";
                DotNetEnv.Env.Load(path);
            });

            string token = System.Environment.GetEnvironmentVariable("DISCORD_TOKEN");
            if (null == token || 0 == token.Length) {
                Console.WriteLine(".env file could not be read, recheck your .env file or specify env-path as a cli argument");
                return -1;
            }
            
            services.GetService<DiscordSocketClient>().Log += this.Log;
            services.GetService<CommandService>().Log += this.Log;

            await services.GetService<DiscordSocketClient>().LoginAsync(Discord.TokenType.Bot, token);
            await services.GetService<DiscordSocketClient>().StartAsync();

            await services.GetService<CommandHandler>().InitializeAsync();

            await Task.Delay(-1);
            return 0;
        }

        private Task Log(Discord.LogMessage msg)
        {
            Console.WriteLine(msg.ToString());
            return Task.CompletedTask;
        }

        private ServiceProvider ConfigureServices()
        {
            return new ServiceCollection()
                .AddSingleton<DiscordSocketClient>()
                .AddSingleton<CommandService>() // discord.net stuff
                .AddSingleton<CommandHandler>() // ours
                .BuildServiceProvider();
        }
    }
}
