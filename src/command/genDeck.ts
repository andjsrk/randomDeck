import { Message } from 'discord.js'
import Bot from '../class/Bot'
import Embed from '../class/Embed'
import Util from '../class/Util'
import { bold, emoji, diceEmoji } from '../markdown'
import DICE from '../const/dice'
import DICE_EMOJI_ID from '../const/diceEmojiId'
import { Command } from '../type'

export default {
	type: 'equals',
	content: '덱',
	run(bot: Bot, msg: Message) {
		const availableDices = Object.keys(Util.objectFlat(DICE)) as Array<keyof typeof DICE_EMOJI_ID>
		const deck: Array<keyof typeof DICE_EMOJI_ID> = []
		for (let i = 0; i < 5; i++) {
			deck.push(availableDices.splice(Util.random(0, availableDices.length - 1), 1)[0])
		}
		msg.channel.send(
			new Embed(
				emoji('game_die') + bold('덱 생성')
			)
			.addField(
				'덱',
				deck.map(
					diceName => `${diceEmoji(diceName)} ${Util.objectFlat(DICE)[diceName][0]}`
				).join('\n')
			)
			.setAuthor(msg.author)
			.get()
		)
	}
} as Command
