exports.run = async (client, message, args, argsclean) => { 
const Discord = require('discord.js');
if (!args[0]) {
  return message.channel.send(`Please type something for your waifu to repeat.`)
} else {
//let say = args.join(' ');
  let say = argsclean.join(" ")/*message.cleanContent.replace(`+say`,"").replace(`+echo`,"")*/
message.delete({ timeout: 10000 }).catch(O_o=>{}); 
if (message.channel.id == 652432414135681060) {
if (message.member.roles.cache.has('688536643497623641') == true) {
const yotsugi = new Discord.WebhookClient('710516700419719280', 'a2y5k-L20uSEMhCwhuJdjYrC5uUJgKdEiYy_l6Kc5GTx5k0V1LX4no2T0tVuaqiWKfPr');
yotsugi.send(say)
} else if (message.member.roles.cache.has('688536488488861720') == true) {
const senjou = new Discord.WebhookClient('710515855943008337', 'oLmkKwAp1XcuuJq-4qS_siMBhqtgJGFrzGyFrE5m3chjJ-iyTOx3MqQpsHl_CErjhgmX');
senjou.send(say)
} else if (message.member.roles.cache.has('688536542364565522') == true) {
const hanekawa = new Discord.WebhookClient('710515997366550610', 'tZOEF8UBCGiNBoXXQ4BUsduAXEcq2FHnzGmPTDAd9LcqO72jPWHympiVCYYTTCqlWsvT');
hanekawa.send(say)
} else if (message.member.roles.cache.has('688536468112670733') == true) {
const shinobu = new Discord.WebhookClient('710516076823183436', 'BwG8fIdiZi2lZvlQBgsU6Apakoe9AWgQ7jpt18nZxOMu1U9BEPCB4XRStO91jNIBbLZl');
shinobu.send(say)
} else if (message.member.roles.cache.has('688536869939838993') == true) {
const nadeko = new Discord.WebhookClient('710516396777275472', 'tUMLqgs7aXaMBeWZEhaOUW7b7k5ufNYMbWyTHXcU5fGeizHCviT9qJRkEYasNWbcN7jV');
nadeko.send(say)
} else if (message.member.roles.cache.has('688536582113722464') == true) {
const tsukihi = new Discord.WebhookClient('710516815167750194', '60ZfkC77iYsg5viBZpkmXdjWyW22FeeHTv6e-bdcMNRc-pvRhMQJg8YHqP0be-ZrJByi');
tsukihi.send(say)
} else if (message.member.roles.cache.has('688536614397411413') == true) {
const karen = new Discord.WebhookClient('710516925116973076', '5a9laqgc8dKNyOlYqJQ-DRv1bkhrdGyk0ONaU2biqN0MUok2RqWifweQxB23YUFiRXoL');
karen.send(say)
} else if (message.member.roles.cache.has('688536685725745161') == true) {
const ougi = new Discord.WebhookClient('710517073545265193', 'jq3EpVuTSIy7ZE5aWBny9v772UUfb7MO8SI562J9e-qdVmi1mDd6Ns0kFZrfLZ49Vyyy');
ougi.send(say)
} else if (message.member.roles.cache.has('688536413175808012') == true) {
const hachi = new Discord.WebhookClient('710517173805908038', 'UaMr1vOQSiLlZ6XUmBhLlor0c0mOgWJqE0TLlrZKPzDlrW7PaRZpElV1GMkbrhaHsTcG');
hachi.send(say)
} else if (message.member.roles.cache.has('688536521959407628') == true) {
const kanbaru = new Discord.WebhookClient('710517484356239432', 'qr1TEGDnB2qSEORY0S-jL12aAQKgEIY7-st8dKOagxIFvZ1aSGRMyAaHzAoedEfijuQh');
kanbaru.send(say)
} else {
  return message.channel.send(say)
}
} else {
  return message.channel.send(say)
}
}
}

    exports.conf = {
    aliases: ["echo"]
  }