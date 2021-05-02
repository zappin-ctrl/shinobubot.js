using System;
using System.Threading.Tasks;
using Disqord;
using Disqord.Bot;
using Disqord.Gateway;
using Disqord.Rest;
using Qmmands;
using Shinobu.Extensions;

namespace Shinobu.Commands
{
    public class Utility : ShinobuModuleBase
    {
        private const string PING_MESSAGE = "Receive delay {0}ms, latency is {1}ms";

        private const string INVITE_TEXT = "**[Click this link]({0}) to invite me!**\nJoin our [support server]({1})!";
        private const string INVITE_URL = "https://discord.com/oauth2/authorize?client_id=490901986502377512&scope=bot&permissions=388160";
        private const string SUPPORT_SERVER = "https://discord.gg/qwdMmsG/";

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

        [Command("invite", "inv")]
        public DiscordCommandResult Invite()
        {
            return Reply(
                GetEmbed(string.Format(
                    INVITE_TEXT,
                    INVITE_URL,
                    SUPPORT_SERVER
                ))
                    .WithFooter(string.Format(
                        "Currently in {0} servers!",
                        Context.Bot.GetGuilds().Count
                    ))
            );
        }
    }
}