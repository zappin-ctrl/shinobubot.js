using System;
using Disqord;
using CommandLine;

namespace Shinobu
{
    class Helper
    {
        public static long GetTimestamp()
        {
            return Convert.ToInt64((DateTime.Now.ToUniversalTime() - new DateTime(1970, 1, 1)).TotalMilliseconds);
        }

        public static LocalEmbedBuilder GetEmbed(string? description = null)
        {
            var embed = (new LocalEmbedBuilder())
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