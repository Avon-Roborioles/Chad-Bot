module.exports.run = (client, message, args) => {

// message.reply("Thursday:" + "\nFirst Meeting - 6m to 8pm" + "\n" + "\nSaturday:" + "\nKickoff Meeting - 11am to 1pm");

// at the top of your file
const { EmbedBuilder } = require('discord.js');

  //Notes
  let TuesdayNotes = '- All Members Meeting: Game Breakdown & Discussion - 6pm to 8pm ';
  let ThursdayNotes = '- All Members Meeting: Will Split Teams & Plan for Season - 6pm to 8pm';
  let SaturdayNotes = 'All Members Meeting: Begin Prototyping Mechanisms - 9am to 12pm';
  let MoreNotes = 'Make sure to sign in at every meeting to maintain your attendance record! 👍';

  
// inside a command, event listener, etc.
const Meetings_Calendar = new EmbedBuilder()
	.setColor("Gold")
	.setTitle('9/10 to 9/16 Meetings')
	.setURL('https://www.instagram.com/ahs.roborioles/')
	.setAuthor({ name: 'Chad Bot | Roborioles', iconURL: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-1923125308_632db8558d3f9.png?1663940693', url: 'https://www.instagram.com/ahs.roborioles/' })
	.setDescription('All Meetings for the Week:')
	.addFields(
		{ name: 'Tuesday', value: TuesdayNotes},
		//{ name: '\u200B', value: '\u200B' },
		{ name: 'Thursday', value: ThursdayNotes, inline: true },
   // { name: '\u200B', value: '\u200B' },
    { name: 'Saturday', value: SaturdayNotes },
	  { name: '\u200B', value: '\u200B' },
    { name: 'Additional Notes', value: MoreNotes },
	)
	// .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setTimestamp()
	.setFooter({ text: 'If you have any questions, Message a @Mod for Info', iconURL: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-1923125308_632db8558d3f9.png?1663940693' });


message.channel.send({ embeds: [Meetings_Calendar] });
}