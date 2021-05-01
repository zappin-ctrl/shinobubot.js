using System.Threading.Tasks;
using Disqord;
using Disqord.Bot;
using Disqord.Gateway;
using Disqord.Rest;

namespace Shinobu.Extensions
{
    public static class DiscordCommandContextExtensions
    {
        public static async Task<IMember?> GetCurrentMember(this DiscordCommandContext context)
        {
            if (null == context.Author || null == context.GuildId)
            {
                return null;
            }

            return (IMember?) context.Bot.GetMember((Snowflake) context.GuildId, context.Author.Id) ??
                   await context.Bot.FetchMemberAsync((Snowflake) context.GuildId, context.Author.Id);
        }
    }
}