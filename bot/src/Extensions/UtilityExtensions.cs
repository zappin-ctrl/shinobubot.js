using System;
using System.Collections.Generic;

namespace Shinobu.Extensions
{
    public static class UtilityExtensions
    {
        private static Random _random = new Random();

        public static T Random<T>(this T[] items)
        {
            return items[_random.Next(items.Length)];
        }

        public static T Random<T>(this List<T> items)
        {
            return items[_random.Next(items.Count)];
        }
    }
}