using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Disqord;
using Qmmands;

namespace Shinobu.TypeParsers {
    public class ReadOnlyCollectionIMemberTypeParser : TypeParser<IReadOnlyCollection<IMember?>>
    {
        private readonly Regex MATCH_USER = new Regex(@"^<?@?(\d+)>?$", RegexOptions.Compiled);
        private readonly Regex NON_VALID = new Regex(@"[^0-9<>@]", RegexOptions.Compiled);
        
        public override ValueTask<TypeParserResult<IReadOnlyCollection<IMember?>>> ParseAsync(Parameter parameter, [Remainder]string value, CommandContext context)
        {
            // try to match first in case it fits we don't need to discern where it fucked up
            Match match = MATCH_USER.Match(value);
            if (match.Success) {
                return this.TryLoadUser(context, Convert.ToUInt64(match.Value)).Result;
            }

            Match invalid = NON_VALID.Match(value);
            if (match.Success)
            {
                return new ValueTask<TypeParserResult<IReadOnlyCollection<IMember?>>>(
                    TypeParserResult<IReadOnlyCollection<IMember?>>.Failed("Invalid characters in user id string")    
                );
            }
            
            return new ValueTask<TypeParserResult<IReadOnlyCollection<IMember?>>>(
                TypeParserResult<IReadOnlyCollection<IMember?>>.Failed("Unknown error parsing")    
            );
        }

        private async Task<ValueTask<TypeParserResult<IReadOnlyCollection<IMember?>>>> TryLoadUser(CommandContext context, ulong id)
        {
            
            return new ValueTask<TypeParserResult<IReadOnlyCollection<IMember?>>>(
                TypeParserResult<IReadOnlyCollection<IMember?>>.Failed("Not yet implemented")    
            );
            
            // var user = await context.Guild.GetUserAsync(id);
            // if (user is null) { // force load via user id
            //     var data = await context.Client.GetUserAsync(id);
            //     Console.WriteLine("nothing????????");
            //     Console.WriteLine(data);
            //     if (data != null) {
            //         throw new Exception(data.Id.ToString());
            //     }
            // }
            // if (user is null) {
            //     return TypeReaderResult.FromError(
            //         CommandError.ObjectNotFound,
            //         "User not found via id"
            //     );
            // }
            //
            // if (user.IsBot || user.IsWebhook) {
            //     return TypeReaderResult.FromError(
            //         CommandError.ObjectNotFound,
            //         "User cannot be a bot"
            //     );
            // }
            //
            // return TypeReaderResult.FromSuccess(user);
        }
    }
}