using Disqord;
using Disqord.Bot;

namespace Shinobu
{
    public abstract class ShinobuModuleBase : DiscordModuleBase
    {
        protected DiscordResponseCommandResult EmbedReply(string description)
        {
            return Reply(GetEmbed(description));
        }

        protected DiscordResponseCommandResult Embed(string description)
        {
            return Response(GetEmbed(description));
        }

        protected LocalEmbedBuilder GetEmbed(string? description = null)
        {
            var embed = (new LocalEmbedBuilder())
                .WithColor((Color) System.Drawing.ColorTranslator.FromHtml(Helper.Env("EMBED_COLOR")));

            if (null != description) {
                embed.WithDescription(description);
            }

            return embed;
        }
    }
}