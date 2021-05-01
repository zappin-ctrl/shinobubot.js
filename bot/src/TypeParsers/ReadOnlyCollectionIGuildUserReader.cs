using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Disqord;
using Disqord.Bot;
using Disqord.Rest;
using Disqord.Gateway;
using Qmmands;

namespace Shinobu.TypeParsers
{
    public class ReadOnlyCollectionIMemberTypeParser : DiscordGuildTypeParser<IReadOnlyCollection<IMember?>>
    {
        private readonly Regex MATCH_USER = new Regex(@"^<?@?(\d+)>?$", RegexOptions.Compiled);
        private readonly Regex NON_VALID = new Regex(@"[^0-9<>@]", RegexOptions.Compiled);

        public override ValueTask<TypeParserResult<IReadOnlyCollection<IMember?>>> ParseAsync(
            Parameter parameter,
            [Remainder] string value,
            DiscordGuildCommandContext context)
        {
            // try to match first in case it fits we don't need to discern where it fucked up
            Match match = MATCH_USER.Match(value);
            if (match.Success)
            {
                Console.WriteLine(match.Groups[1]);
                return TryLoadUser(context, Convert.ToUInt64(match.Groups[1].Value)).Result;
            }

            Match invalid = NON_VALID.Match(value);
            if (invalid.Success)
            {
                return Failed("Invalid characters in user id string");
            }

            return Failed("Unknown error parsing");
        }

        private async Task<ValueTask<TypeParserResult<IReadOnlyCollection<IMember?>>>> TryLoadUser(
            DiscordGuildCommandContext context,
            ulong id)
        {
            var members = new List<IMember?>();

            var user = (IMember?) context.Guild.GetMember(id) ?? await context.Bot.FetchMemberAsync(context.GuildId, id);
            if (user == null)
            {
                return Failed("User not found via id");
            }

            if (user.IsBot)
            {
                return Failed("User cannot be a bot");
            }

            members.Add(user);
            return Successful(members);
        }

        private ValueTask<TypeParserResult<IReadOnlyCollection<IMember?>>> Failed(string message)
        {
            return TypeParserResult<IReadOnlyCollection<IMember?>>.Failed(message);
        }
        
        private ValueTask<TypeParserResult<IReadOnlyCollection<IMember?>>> Successful(IReadOnlyCollection<IMember?> value)
        {
            return TypeParserResult<IReadOnlyCollection<IMember?>>.Successful(value);
        }
    }
}