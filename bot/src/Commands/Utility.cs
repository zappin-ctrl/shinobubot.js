using System;
using System.Threading.Tasks;
using Disqord;
using Disqord.Bot;
using Disqord.Rest;
using Qmmands;
using Shinobu.Extensions;

namespace Shinobu.Commands
{
    public class Utility : ShinobuModuleBase
    {
        private const string PING_MESSAGE = "Receive delay {0}ms, latency is {1}ms";    

        [Command("ping")]
        public async Task Ping()
        {
            long now = Helper.GetTimestamp();
            long message = Context.Message.CreatedAt.ToUnixTimeMilliseconds();
            long diff = now - message;
            var embed = GetEmbed(String.Format(PING_MESSAGE, diff, '?'));
            var response = await Response(embed);
            await response.ModifyAsync(x => 
                x.Embed = embed.WithDescription(
                    String.Format(PING_MESSAGE, diff, response.CreatedAt.ToUnixTimeMilliseconds() - message)
                ).Build()
            );
        }

        [Command("owner")]
        [RequireBotOwner]
        public DiscordCommandResult IsOwner()
        {
            return Embed(
                string.Format(
                    "Yes, {0} is a bot owner!",
                    Context.Author.Mention
                )
            );
        }
        
        [Command("avatar", "pfp", "image", "profilepic", "pic")]
        [RequireGuild]
        public async Task<DiscordCommandResult> Avatar(IMember? member = null)
        {
            member ??= await Context.GetCurrentMember();

            return Reply(
                GetEmbed()
                    .WithTitle(member.NickOrName() + "'s avatar")
                    .WithImageUrl(member.GetAvatarUrl(ImageFormat.Default, 256))
            );
        }
        
        [Command("emote", "emoji", "enlarge", "steal")]
        public DiscordCommandResult Emote(ICustomEmoji emoji)
        {
            return Reply(
                GetEmbed()
                    .WithImageUrl(emoji.GetUrl())
                    .WithTitle(emoji.Name ?? "No emote name")
                    .WithFooter("ID: " + emoji.Id.ToString() + string.Format(", {0}", emoji.IsAnimated ? "Animated (.gif)" : "Image (.png)"))
                    .WithUrl(emoji.GetUrl())
            );
        }
    }
}