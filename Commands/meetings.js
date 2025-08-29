module.exports.run = (client, message, args) => {

  // message.reply("Thursday:" + "\nFirst Meeting - 6m to 8pm" + "\n" + "\nSaturday:" + "\nKickoff Meeting - 11am to 1pm");

  // at the top of your file
  const { EmbedBuilder } = require('discord.js');

  //Notes
  let Title = '8/31 to 9/6 Meetings:';
  let TuesdayNotes = '- No Meetings';
  let WednesdayNotes = '- No Meetings';
  let ThursdayNotes = '- First Meeting - 6 to 8pm';
  let FridayNotes = '- No Meetings';
  let SaturdayNotes = '- FTC Decode Kickoff - 11am to 1pm';
  let MoreNotes = "Kickoff will be in the auditorium. Enter at Door 38 ";


  // inside a command, event listener, etc.
  const Meetings_Calendar = new EmbedBuilder()
    .setColor("Gold")
    .setTitle(Title)
    .setURL('https://www.instagram.com/ahs.roborioles/')
    .setAuthor({ name: 'Chad Bot | Roborioles', iconURL: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-1923125308_632db8558d3f9.png?1663940693', url: 'https://www.instagram.com/ahs.roborioles/' })
    //.setDescription('All Meetings for the Week:')
    .addFields(
      // { name: 'Tuesday', value: TuesdayNotes },
      // { name: 'Wednesday', value: WednesdayNotes},
      { name: 'Thursday', value: ThursdayNotes },
      // { name: 'Friday', value: FridayNotes },
      { name: 'Saturday', value: SaturdayNotes },
      // { name: '\u200B', value: '\u200B' },
      // { name: 'All Week:', value: 'No meetings! Make sure to get your Applications turned in and the Schoology Tasks Completed' },
      { name: 'Additional Notes', value: MoreNotes },
      
    )
    // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setTimestamp()
    .setFooter({ text: 'If you have any questions, Message a @Moderator or @Administrator for Info', iconURL: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-1923125308_632db8558d3f9.png?1663940693' });


  message.channel.send({ embeds: [Meetings_Calendar] });
}


