using Discord;
using Discord.Commands;
using System;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace shinobu.TypeReaders {
    public class IGuildUserTypeReader : TypeReader
    {
        private readonly Regex MATCH_USER = new Regex(@"^<?@?(\d+)>?$", RegexOptions.Compiled);
        private readonly Regex NON_VALID = new Regex(@"[^0-9<>@]", RegexOptions.Compiled);

        public override Task<TypeReaderResult> ReadAsync(ICommandContext context, string input, IServiceProvider services)
        {
            // try to match first in case it fits we don't need to discern where it fucked up
            Match match = MATCH_USER.Match(input);
            if (match.Success) {
                return this.TryLoadUser(context, Convert.ToUInt64(match.Value));
            }

            Match invalid = NON_VALID.Match(input);
            if (match.Success) {
                return Task.FromResult(
                    TypeReaderResult.FromError(
                        CommandError.ParseFailed,
                        "Invalid format"
                    )
                );
            }

            return Task.FromResult(
                TypeReaderResult.FromError(
                    CommandError.Unsuccessful, 
                    "Failed to find the object or check it"
                )
            );
        }

        private async Task<TypeReaderResult> TryLoadUser(ICommandContext context, ulong id)
        {
            var user = await context.Guild.GetUserAsync(id);
            // if (user is null) { // in cache only, force load from discord
            //     // if (context.Client is Discord.WebSocket.DiscordSocketClient)
            // }

            if (user is null) {
                return TypeReaderResult.FromError(
                    CommandError.ObjectNotFound,
                    "User not found via id"
                );
            }

            if (user.IsBot || user.IsWebhook) {
                return TypeReaderResult.FromError(
                    CommandError.ObjectNotFound,
                    "User cannot be a bot"
                );
            }

            return TypeReaderResult.FromSuccess(user);
        }
    }
}