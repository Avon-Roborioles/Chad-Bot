module.exports.run = (client, message, args) => {

// message.reply("Thursday:" + "\nFirst Meeting - 6m to 8pm" + "\n" + "\nSaturday:" + "\nKickoff Meeting - 11am to 1pm");

// at the top of your file
const { EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.
const Meetings_Calendar = new EmbedBuilder()
	.setColor("Gold")
	.setTitle('9/3 to 9/9 Meetings')
	.setURL('https://www.instagram.com/ahs.roborioles/')
	.setAuthor({ name: 'Chad Bot | Roborioles', iconURL: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-1923125308_632db8558d3f9.png?1663940693', url: 'https://www.instagram.com/ahs.roborioles/' })
	.setDescription('All Meetings for the Week:')
	// .setThumbnail('https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-1923125308_632db8558d3f9.png?1663940693')
	.addFields(
		{ name: 'Thursday', value: '- First Meeting - 6pm to 8pm' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Saturday', value: '- Kickoff Meeting - 11am to 1pm', inline: true },
	)
	// .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setTimestamp()
	.setFooter({ text: 'If you have any questions, Message a @Mod for Info', iconURL: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/courselogos/logo-1923125308_632db8558d3f9.png?1663940693' });


message.channel.send({ embeds: [Meetings_Calendar] });
}