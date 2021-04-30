using System;

namespace Shinobu.Attributes
{
    [System.AttributeUsage(System.AttributeTargets.Method)]
    sealed class ErrorMessageAttribute : System.Attribute
    {
        readonly string message;

        public ErrorMessageAttribute(string message)
        {
            this.message = message;
        }
        
        public string Message
        {
            get { return message; }
        }
    }
}