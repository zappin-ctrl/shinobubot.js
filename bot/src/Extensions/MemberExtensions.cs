using Disqord;

namespace Shinobu.Extensions
{
    public static class MemberExtensions
    {
        public static string NickOrName(this IMember member)
        {
            return member.Nick != null && member.Nick.Length > 0 ? member.Nick : member.Name;
        }
    }
}