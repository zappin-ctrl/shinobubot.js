using Disqord;

namespace Shinobu.Extensions
{
    public static class EmojiExtensions
    {
        private const string EMOJI_URL = "https://cdn.discordapp.com/emojis/{0}.{1}";
        
        public static string GetUrl(this ICustomEmoji emoji)
        {
            return string.Format(
                EMOJI_URL,
                emoji.Id,
                emoji.IsAnimated ? "gif" : "png"
            );
        }
    }
}