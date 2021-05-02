namespace Shinobu.Utility
{
    public class Range<T>
    {
        public int From { get; private set; }
        public int? To { get; private set; }
        public T Value { get; private set; }
        
        public Range(
            int from,
            T value,
            int? to = null)
        {
            From = from;
            Value = value;
            To = to;
        }

        public override string ToString()
        {
            return "Range from: " + From + ", to: " + (null == To ? "null" : To) + ", value: " + Value;
        }
    }
}