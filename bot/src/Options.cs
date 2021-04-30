using CommandLine;

namespace Shinobu 
{
    class Options
    {
        [Option('e', "env-path", Required=false, HelpText="Path from which to load the .env files")]
        public string? envPath { get; set; }
    }
}