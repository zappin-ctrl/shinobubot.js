using Disqord;

namespace Shinobu.Extensions
{
    public static class UserExtensions
    {
        public static bool IsSameAs(
            this IUser me,
            IUser another
        )
        {
            return me.Id == another.Id;
        }
    }
}