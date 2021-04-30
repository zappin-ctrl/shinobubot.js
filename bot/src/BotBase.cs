using System;
using System.Threading.Tasks;
using System.Reflection;
using System.Collections.Generic;
using Disqord;
using Disqord.Bot;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using Qmmands;
using Shinobu.Attributes;
using Shinobu.TypeParsers;

namespace Shinobu
{
    class BotBase : DiscordBotBase
    {
        private readonly IServiceProvider _services;
        private readonly CommandService _commands;
        private readonly string _prefix;
        
        // private readonly HashSet<CommandError> ACCEPTABLE_COMMAND_FAILS = new HashSet<CommandError> {CommandError.BadArgCount, CommandError.ParseFailed};

        public BotBase(
            IOptions<DiscordBotBaseConfiguration> options,
            ILogger logger,
            IPrefixProvider prefixes,
            ICommandQueue queue,
            CommandService commands,
            IServiceProvider services,
            DiscordClientBase client): base(options, logger, prefixes, queue, commands, services, client)
        {
            _services = services;
            _commands = commands;
            _prefix = System.Environment.GetEnvironmentVariable("PREFIX");
            _commands.AddTypeParser<IReadOnlyCollection<IMember?>>(new ReadOnlyCollectionIMemberTypeParser());
        }

        public async Task ExecuteAsync()
        {
            // allow for fetching users
        }
        //
        // public async Task MessageReceivedAsync(SocketMessage msg)
        // {
        //     // ensures we don't process system/other bot messages
        //     if (!(msg is SocketUserMessage message)) 
        //     {
        //         return;
        //     }
        //     
        //     if (message.Source != MessageSource.User) 
        //     {
        //         return;
        //     }
        //
        //     // sets the argument position away from the prefix we set
        //     var argPos = 0;
        //
        //     // determine if the message has a valid prefix, and adjust argPos based on prefix
        //     if (!(message.HasMentionPrefix(_client.CurrentUser, ref argPos) || message.HasCharPrefix(Char.Parse(_prefix), ref argPos))) 
        //     {
        //         return;
        //     }
        //
        //     // execute command if one is found that matches
        //     await _commands.ExecuteAsync(new SocketCommandContext(_client, message), argPos, _services); 
        // }
        //
        // public async Task CommandExecutedAsync(Optional<CommandInfo> command, ICommandContext context, IResult result)
        // {
        //     // if a command isn't found, log that info to console and exit this method
        //     if (!command.IsSpecified)
        //     {
        //         Console.WriteLine(String.Format("Command failed to execute unknown command for {1}!", command.ToString(), context.User.Id));
        //         return;
        //     }
        //
        //     // log success to the console and exit this method
        //     if (result.IsSuccess)
        //     {
        //         Console.WriteLine(String.Format("Command {0} executed for {1}", command.Value.Name, context.User.Id));
        //         return;
        //     }
        //     
        //     Console.WriteLine(result.Error);
        //     Console.WriteLine(result.ErrorReason);
        //
        //     string? failMessage = null;
        //
        //     if (ACCEPTABLE_COMMAND_FAILS.Contains((CommandError) result.Error)) {
        //         foreach (var i in command.Value.Attributes)
        //         {
        //             var a = i as ErrorMessageAttribute;
        //
        //             if (null != a) {
        //                 failMessage = a.Message;
        //             }
        //         }
        //     }
        //     
        //     await Helper.SimpleMessage(
        //         context,
        //         failMessage ?? "Sorry, something went wrong! Our cute retards have been notified~"
        //     );
        // }
    }
}