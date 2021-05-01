using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Net.Http;
using Disqord;
using Disqord.Bot.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;

namespace Shinobu
{
    internal sealed class Program
    {
        static int Main(string[] args)
        {
            Helper.Init(args);
            string token = Helper.Env("BOT_TOKEN");
            if (string.IsNullOrEmpty(token)) {
                Console.WriteLine(".env file could not be read, recheck your .env file or specify env-path as a cli argument");
                return -1;
            }

            var host = new HostBuilder()
                .ConfigureHostConfiguration(x => x.AddCommandLine(args))
                .ConfigureAppConfiguration(x => {
                    x.AddCommandLine(args);
                })
                .ConfigureLogging(x => {
                    var logger = new LoggerConfiguration()
                        .MinimumLevel.Verbose()
                        .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                        .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] [{SourceContext}] {Message:lj}{NewLine}{Exception}", theme: AnsiConsoleTheme.Code)
                        .WriteTo.File($"logs/log-{DateTime.Now:HH_mm_ss}.txt", restrictedToMinimumLevel: LogEventLevel.Verbose, fileSizeLimitBytes: null, buffered: true)
                        .CreateLogger();
                    x.AddSerilog(logger, true);

                    x.Services.Remove(x.Services.First(x => x.ServiceType == typeof(ILogger<>)));
                    x.Services.AddSingleton(typeof(ILogger<>), typeof(Logger<>));
                    x.Services.AddSingleton(typeof(HttpClient));
                    x.Services.AddSingleton(typeof(Random));
                })
                .ConfigureDiscordBotSharder<ShinobuBot>((context, bot) => {
                    bot.Token = token;
                    bot.UseMentionPrefix = true;
                    bot.Prefixes = new[] { Helper.Env("PREFIX") };
                })
                .UseDefaultServiceProvider(x => x.ValidateOnBuild = true)
                .Build();

            host.Run();
            return 0;
        }
    }
}
