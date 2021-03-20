using System;
using System.Threading.Tasks;
using Discord;
using CommandLine;

#nullable enable
namespace shinobu
{
    class Helper
    {
        public static long GetTimestamp()
        {
            return Convert.ToInt64((DateTime.Now.ToUniversalTime() - new DateTime(1970, 1, 1)).TotalMilliseconds);
        }

        public static Task<Discord.IUserMessage> SimpleMessage(Discord.Commands.ICommandContext context, string message)
        {
            return context.Channel.SendMessageAsync(
                null,
                false,
                Helper.GetEmbed(message).Build()
            );
        }

        public static EmbedBuilder GetEmbed(string? description = null)
        {
            var embed = (new EmbedBuilder())
                .WithColor((Color) System.Drawing.ColorTranslator.FromHtml(Env("EMBED_COLOR")));

            if (null != description) {
                embed.WithDescription(description);
            }

            return embed;
        }

        public static string? Env(string name)
        {
            return System.Environment.GetEnvironmentVariable(name);
        }

        public static void Init(string[] args)
        {
            Parser.Default.ParseArguments<Options>(args).WithParsed(o => {
                var path = o.envPath == null ? null : o.envPath;
                DotNetEnv.Env.LoadMulti(new[] {
                    path + "/.env",
                    path + "/.env.local"
                });
            });
        }
    }
}