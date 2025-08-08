module.exports.run = (client, message, args) => {

  // message.reply("Thursday:" + "\nFirst Meeting - 6m to 8pm" + "\n" + "\nSaturday:" + "\nKickoff Meeting - 11am to 1pm");

  // at the top of your file
  const { EmbedBuilder } = require('discord.js');

  //Notes
  let Title = '8/10 to 8/16 Meetings:';
  let TuesdayNotes = '- No Meetings';
  let WednesdayNotes = '- Activity Booth in Main Gym during SRT and Lunch';
  let ThursdayNotes = '- No Meetings';
  let FridayNotes = '- Callout Meeting in L119 after school till 3:40';
  let SaturdayNotes = '- No Meetings';
  let MoreNotes = "Get Ready for the Robotics callout meeting on Friday. Applications will be Due Middle of Next Week.";


  // inside a command, event listener, etc.
  const Meetings_Calendar = new EmbedBuilder()
    .setColor("Gold")
    .setTitle(Title)
    .setURL('https://www.instagram.com/ahs.roborioles/')
    .setAuthor({ name: 'Chad Bot | Roborioles', iconURL: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-1923125308_632db8558d3f9.png?1663940693', url: 'https://www.instagram.com/ahs.roborioles/' })
    //.setDescription('All Meetings for the Week:')
    .addFields(
      // { name: 'Tuesday', value: TuesdayNotes },
      { name: 'Wednesday', value: WednesdayNotes},
      // { name: 'Thursday', value: ThursdayNotes, inline: false },
      { name: 'Friday', value: FridayNotes },
      // { name: 'Saturday', value: SaturdayNotes },
      //{ name: '\u200B', value: '\u200B' },
      { name: 'Additional Notes', value: MoreNotes },
      // { name: 'All Week:', value: 'No meetings! Have a great Thanksgiving Break!' },
    )
    // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setTimestamp()
    .setFooter({ text: 'If you have any questions, Message a @Moderator or @Administrator for Info', iconURL: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-1923125308_632db8558d3f9.png?1663940693' });


  message.channel.send({ embeds: [Meetings_Calendar] });
}
