using CommandLine;

namespace shinobu 
{
    class Options
    {
        [Option('e', "env-path", Required=false, HelpText="Path from which to load the .env files")]
        public string envPath { get; set; }
    }
}