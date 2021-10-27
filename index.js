const { Client } = require('discord.js');
const ytdl = require('ytdl-core');
const { token } = require('./token.json');
const { prefix } = require('./config.json');
const client = new Client();
const prefixx = "w/";

var randomgay = Math.floor(Math.random() * 100);
var gw = ['gaywolf', 'wolfgay', 'gay wolf', 'wolf gay', 'gaygay_wolf']
const botuser = "852936237879001088"
let owner = "605754576175497216"

const Discord = require('discord.js');
// 連上線時的事件
client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.guilds.cache.size} guilds.`);
  client.user.setActivity(`w/help`);
})

client.on('message', async (msg) => {
  let authorId = msg.author.id;
  let sadsad = '<@' + authorId + '>';
  function ws(msgg) {
    msg.channel.send(msgg)
  }
  aw = msg.content.toLowerCase()
  if (aw === `who pum`) {
    msg.channel.send('Pum Is A Gay Raper!');
  }

  if (aw === `w/link`) {
    msg.channel.send('https://discord.com/api/oauth2/authorize?client_id=852936237879001088&permissions=8&scope=bot');
  }
  if (aw === 'w/wolf') {
    const awa = new Discord.MessageEmbed()
      .setAuthor(`wolf's music`)
      .setColor("00FFFF")
      .setDescription("`https://youtu.be/iU1dATxuiL0`\n\n`https://youtu.be/65DvTCv0RbM`\n\n`https://youtu.be/ucojLVE-FOU`\n\n`https://youtu.be/v-4Ns2Q2uGI`")
    return msg.channel.send(awa)
  }
  if (aw === 'w/howgay') {
    const embed = new Discord.MessageEmbed()
      .setAuthor('HOW GAY!')
      .setColor("00FFFF")
      .setDescription(sadsad + ' is ' + randomgay + '% gay');
    return msg.channel.send(embed);
  }
  if (msg.content.toLowerCase() === `who nodeath`) {
    msg.channel.send("NoDeath Is 群主!!");
  }
  if (aw === gw[0]) {
    msg.channel.send(sadsad + " 哩三小阿，你才是GAY>:C");
  } else if (aw == gw[1]) {
    ws(sadsad + " 哩三小阿，你才是GAY>:C");
  } else if (aw == gw[2]) {
    ws(sadsad + " 哩三小阿，你才是GAY>:C");
  } else if (aw == gw[3]) {
    ws(sadsad + " 哩三小阿，你才是GAY>:C");
  } else if (aw == gw[4]) {
    ws(sadsad + " 哩三小阿，你才是GAY>:C");
  }
});
/*
if(aw==='w/howgay'){
      const embed = new Discord.MessageEmbed()
    .setAuthor('HOW GAY!')
    .setColor("00FFFF")
    .setDescription(sadsad+' is '+randomgay+'% gay')
    return msg.channel.send(embed)
    }
const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send("There's nothing to snipe!")
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author)
    .setDescription(msg.content)
    if(msg.image)embed
    .setImage(msg.image)
    .setColor("00FFFF")
    .setTimestamp();
    
    message.channel.send(embed)
 */
client.on('message', async (msg) => {
  if (msg.author.equals(client.user)) return; // if the message is sent by a bot, ignore
  if (!msg.content.startsWith(prefixx)) return; // if the message doesn't contain PREFIX (*), then ignore
  var args = msg.content.substring(prefixx.length).split(" "); // removes the prefix from the message
  var command = args[0].toLowerCase(); // sets the command to lowercase (making it incase sensitive)msg.author.id == owner_id
  if (command == "purge" && msg.author.id == owner) {
    /*if(!args[1]) return msg.reply ('Error, please define second argument')
    msg.channel.bulkDelete(args[1]);*/
    var amount = parseInt(args[1])
    if (!amount) return msg.channel.send("輸入 w/purge +你想要的數字(1~100)")
    if (amount > 100 || amount < 1) return msg.channel.send("1~100 !!!!")
    msg.channel.bulkDelete(amount).catch(err => {
      msg.channel.send('訊息太舊了喔:C')
    })
    let m = await msg.channel.send(`Deleted \`${amount}\` messages`)
    setTimeout(() => {
      // m.delete()
    }, 5000)
  }
  if (command == "say") { // creates command say
    var sayMessage = msg.content.substring(5)
    msg.channel.send(sayMessage);
    if (msg.author.id == owner) { msg.delete() }
  }
  if (command == "howgay" && msg.content.toLowerCase() !== 'w/howgay') { // creates command say
    var gay = msg.content.substring(9);
    const embed = new Discord.MessageEmbed()
      .setAuthor('HOW GAY!')
      .setColor("00FFFF")
      .setDescription(gay + ' is ' + randomgay + '% gay');
    return msg.channel.send(embed)
  }
  // if (!msg.member.roles.some(r=>["管理員"].includes(r.name)) ) return msg.reply("你個小垃圾，你沒管還想刪訊息");
});





class Music {
  constructor() {
    this.isPlaying = {};
    this.queue = {};
    this.connection = {};
    this.dispatcher = {};
  }

  async join(msg) {
    if (msg.member.voice.channel !== null) {
      this.connection[msg.guild.id] = await msg.member.voice.channel.join();
    } else {
      msg.channel.send('**請先進入語音頻道**');
    }
  }

  async play(msg) {

    const guildID = msg.guild.id;
    if (!this.connection[guildID]) {
      this.connection[msg.guild.id] = await msg.member.voice.channel.join();
      return;
    }

    if (this.connection[guildID].status === 4) {
      this.connection[msg.guild.id] = await msg.member.voice.channel.join();
      return;
    }
    const musicURL = msg.content.replace(`${prefix}play `, '').trim();

    try {
      const res = await ytdl.getInfo(musicURL);
      const info = res.videoDetails;
      if (!this.queue[guildID]) {
        this.queue[guildID] = [];
      }

      this.queue[guildID].push({
        name: info.title,
        url: musicURL
      });

      if (this.isPlaying[guildID]) {
        msg.channel.send(`**歌曲加入隊列**：${info.title}`);
      } else {
        this.isPlaying[guildID] = true;
        this.playMusic(msg, guildID, this.queue[guildID][0]);
      }

    } catch (e) {
      console.log(e);
    }

  }

  playMusic(msg, guildID, musicInfo) {
    msg.channel.send(`**播放音樂**：${musicInfo.name}`);
    this.dispatcher[guildID] = this.connection[guildID].play(ytdl(musicInfo.url, { filter: 'audioonly' }));
    this.dispatcher[guildID].setVolume(0.5);
    this.queue[guildID].shift();
    this.dispatcher[guildID].on('finish', () => {
      if (this.queue[guildID].length > 0) {
        this.playMusic(msg, guildID, this.queue[guildID][0]);
      } else {
        this.isPlaying[guildID] = false;
        msg.channel.send('**目前沒有音樂了，請加入音樂 :D**');
      }

    });

  }

  resume(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('**恢復播放:D**');
      this.dispatcher[msg.guild.id].resume();
    }

  }

  pause(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('**暫停播放**');
      this.dispatcher[msg.guild.id].pause();
    }

  }

  skip(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('**跳過目前歌曲:(**');
      this.dispatcher[msg.guild.id].end();
    }

  }

  nowQueue(msg) {
    if (this.queue[msg.guild.id] && this.queue[msg.guild.id].length > 0) {
      const queueString = this.queue[msg.guild.id].map((item, index) => `[${index + 1}] ${item.name}\n`).join();
      msg.channel.send(queueString);
    } else {
      msg.channel.send('**目前隊列中沒有歌曲:(**');
    }

  }

  leave(msg) {
    if (this.connection[msg.guild.id] && this.connection[msg.guild.id].status === 0) {
      if (this.queue.hasOwnProperty(msg.guild.id)) {
        delete this.queue[msg.guild.id];
        this.isPlaying[msg.guild.id] = false;
      }
      this.connection[msg.guild.id].disconnect();
    } else {
      msg.channel.send('**機器人未加入任何頻道:(**');
    }

  }
}
const music = new Music();

client.on('message', async (msg) => {
  if (!msg.guild) return;
  if (msg.content.toLowerCase() == `${prefix}help`) {
    embed = new Discord.MessageEmbed()
      .setTitle('指令')
      .setDescription("**w/join** (加入使用者在的語音頻道)\n **w/play**+網址(記得先用 w/join)\n**w/skip** (跳過目前的音樂)\n **w/queue** (播放清單)\n **w/resume** (恢復播放)\n **w/stop** (暫停播放)\n **w/leave** (退出使用者在的語音頻道)")
      .addField('其他指令', '**who pum** (好玩的:D)\n**who nodeath** (好玩的:D)\n**w/say** (你想說的)', true)
      .addField('好笑指令', 'w/howgay (人名,空白的話會是自己)', true)
      .setColor(6004223)
      .setFooter("Made By WoLf", "https://cdn.discordapp.com/avatars/605754576175497216/fad4ca481b83153ab004adfcf678f6ba.png")
      .setImage('https://cdn.discordapp.com/avatars/605754576175497216/fad4ca481b83153ab004adfcf678f6ba.png');

    return msg.channel.send(embed);
  }

  if (msg.content.toLowerCase() === `w/join`) {
    music.join(msg);
  }
  if (msg.content.indexOf(`W/play`) > -1) {
    if (msg.member.voice.channel) {
      await music.play(msg);
    } else {
      msg.reply('你必須先加入語音頻道');
    }
  }
  if (msg.content.indexOf(`w/play`) > -1) {
    if (msg.member.voice.channel) {
      await music.play(msg);
    } else {
      msg.reply('你必須先加入語音頻道');
    }
  }
  if (msg.content.toLowerCase() === `${prefix}resume`) {
    music.resume(msg);
  }
  if (msg.content.toLowerCase() === `${prefix}stop`) {
    music.pause(msg);
  }
  if (msg.content.toLowerCase() === `${prefix}skip`) {
    music.skip(msg);
  }
  if (msg.content.toLowerCase() === `${prefix}queue`) {
    music.nowQueue(msg);
  }
  if (msg.content.toLowerCase() === `${prefix}leave`) {
    music.leave(msg);
  }
});
client.login(token);
