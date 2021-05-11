const Discord = require('discord.js');
const bot = new Discord.Client();
const axios = require('axios');

let consultations = [];
let times = "";
let email = "";

axios.get('https://api.bredbrains.tech/consultations').then(response => {
    consultations = response.data.data;
    console.log(consultations);
})

module.exports = {
    name: 'tthk',
    description: 'Show consultations',
    execute(msg, args) {
        times = "";
        let result = consultations.filter(x => x.teacher.includes(args));
        if (!result.length) {
            let fail = new Discord.MessageEmbed()
                .setColor('#E74C3C')
                .setTitle('Error!')
                .setDescription('No such teacher, maybe, try again?')

            return msg.channel.send(fail)
        }
        for (i = 0; i < result[0].times.length; i++) {
            times += `${result[0].times[i].weekday}, ${result[0].times[i].time}; `
        }

        let success = new Discord.MessageEmbed()
            .setColor('#2ECC71')
            .setTitle('Teacher found!')
            .setDescription(`Hey ${msg.author.toString()}, here is the results.`)
            .addFields(
                { name: "Name", value: result[0].teacher },
                { name: "Room", value: result[0].room },
                { name: "Email", value: result[0].email },
                { name: "Department", value: result[0].department },
                { name: "Times", value: times }
            )
        msg.channel.send(success);
    }
}


