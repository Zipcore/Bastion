/**
 * @file wordFilter
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

/**
 * Handles filtering of specific words in messages
 * @param {Message} message Discord.js message object
 * @returns {void}
 */
module.exports = async message => {
  let guild = await message.client.db.get(`SELECT filterWord, filteredWords FROM guildSettings WHERE guildID=${message.guild.id}`).catch(e => {
    message.client.log.error(e);
  });

  if (guild.filterWord !== 'true' || message.guild.members.get(message.author.id).hasPermission('ADMINISTRATOR')) return;

  let filteredWords = JSON.parse(guild.filteredWords);
  for (let i = 0; i < filteredWords.length; i++) {
    if (message.content.toLowerCase().includes(filteredWords[i].toLowerCase())) continue;
    if (message.deletable) {
      return message.delete();
    }
  }
};
