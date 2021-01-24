using System;
using System.Threading.Tasks;
using Discord.WebSocket;
using CommandLine;

namespace shinobu
{
    class Bot
    {
        private DiscordSocketClient client;

        static int Main(string[] args)
            => new Bot().Run(args).GetAwaiter().GetResult();

        public async Task<int> Run(string[] args)
        {
            Parser.Default.ParseArguments<Options>(args).WithParsed(o => {
                var path = o.envPath == null ? null : o.envPath + "/.env";
                DotNetEnv.Env.Load(path);
            });

            string token = System.Environment.GetEnvironmentVariable("DISCORD_TOKEN");
            if (null == token || 0 == token.Length) {
                Console.WriteLine(".env file could not be read, recheck your .env file or specify env-path as a cli argument");
                return -1;
            }
            Console.WriteLine("now env");
            Console.WriteLine(System.Environment.GetEnvironmentVariable("DISCORD_TOKEN"));
            this.client = new DiscordSocketClient();
            this.client.Log += this.Log;

            await this.client.LoginAsync(Discord.TokenType.Bot, "");
            await this.client.StartAsync();

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
