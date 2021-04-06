import { Message } from 'discord.js'
import Bot from '../class/Bot'
import Embed from '../class/Embed'
import Util from '../class/Util'
import { bold } from '../markdown'
import FIELD from '../const/field'
import { Command } from '../type'

export default {
	type: 'equals',
	content: '필드',
	run(bot: Bot, msg: Message) {
		msg.channel.send(
			new Embed(
				bold('나온 필드')
			)
			.addContent(FIELD[Util.random(0, FIELD.length - 1)][0])
			.setAuthor(msg.author)
			.get()
		)
	}
} as Command
