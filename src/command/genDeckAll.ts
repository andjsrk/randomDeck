import { Message } from 'discord.js'
import Bot from '../class/Bot'
import Embed from '../class/Embed'
import Util from '../class/Util'
import { bold, emoji, diceEmoji } from '../markdown'
import DICE from '../const/dice'
import DICE_EMOJI_ID from '../const/diceEmojiId'
import RANK from '../const/rank'
import { Command } from '../type'

export default {
	type: 'starts',
	content: '덱 올',
	run(bot: Bot, msg: Message, args: Array<string>) {
		if (args.length !== 1) {
			msg.channel.send(
				new Embed(
					emoji('x') + bold('인자의 개수는 1개여야 합니다.')
				)
				.get()
			)
			return
		}
		if (!RANK.KO.includes(args[0])) {
			msg.channel.send(
				new Embed(
					emoji('x') + bold(`등급은 ${RANK.KO.join(', ')} 중 하나여야 합니다.`)
				)
				.get()
			)
			return
		}
		const availableDices = Object.keys(DICE[RANK.EN[RANK.KO.indexOf(args[0])] as keyof typeof DICE]) as Array<keyof typeof DICE_EMOJI_ID>
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
