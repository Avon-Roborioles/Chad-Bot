module.exports.run = (client, message, args) => {

  // message.reply("Thursday:" + "\nFirst Meeting - 6m to 8pm" + "\n" + "\nSaturday:" + "\nKickoff Meeting - 11am to 1pm");

  // at the top of your file
  const { EmbedBuilder } = require('discord.js');

  //Notes
  let Title = '3/16 to 3/22 Meetings:';
  let TuesdayNotes = '- Girl Scout Event (Team 15 Only) 6pm to 7pm';
  let WednesdayNotes = 'Team Debrief and Dodgeball 6pm to 8 pm'
  let ThursdayNotes = '- No Meetings';
  let SaturdayNotes = '- No Meetings ';
  let MoreNotes = "Enjoy Your Spring Break";


  // inside a command, event listener, etc.
  const Meetings_Calendar = new EmbedBuilder()
    .setColor("Gold")
    .setTitle(Title)
    .setURL('https://www.instagram.com/ahs.roborioles/')
    .setAuthor({ name: 'Chad Bot | Roborioles', iconURL: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-1923125308_632db8558d3f9.png?1663940693', url: 'https://www.instagram.com/ahs.roborioles/' })
    //.setDescription('All Meetings for the Week:')
    .addFields(
      { name: 'Tuesday', value: TuesdayNotes },
      //{ name: '\u200B', value: '\u200B' },
      { name: 'Wednesday', value: WednesdayNotes},
      { name: 'Thursday', value: ThursdayNotes, inline: true },
      // { name: '\u200B', value: '\u200B' },
      { name: 'Saturday', value: SaturdayNotes },
      { name: '\u200B', value: '\u200B' },
      { name: 'Additional Notes', value: MoreNotes },
      // { name: 'All Week:', value: 'No meetings! Have a great Thanksgiving Break!' },
    )
    // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setTimestamp()
    .setFooter({ text: 'If you have any questions, Message a @Mod for Info', iconURL: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-1923125308_632db8558d3f9.png?1663940693' });


  message.channel.send({ embeds: [Meetings_Calendar] });
}