using System;
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

        public static EmbedBuilder GetEmbed()
        {
            return (new EmbedBuilder())
                .WithColor((Color) System.Drawing.ColorTranslator.FromHtml(Env("EMBED_COLOR")));
        }

        public static string? Env(string name)
        {
            return System.Environment.GetEnvironmentVariable(name);
        }

        public static void Init(string[] args)
        {
            Parser.Default.ParseArguments<Options>(args).WithParsed(o => {
                var path = o.envPath == null ? null : o.envPath + "/.env.local";
                DotNetEnv.Env.Load(path);
            });
        }
    }
}