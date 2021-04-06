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
	content: '덱 튜플',
	run(bot: Bot, msg: Message, args: Array<string>) {
		if (args.length !== 5) {
			msg.channel.send(
				new Embed(
					emoji('x') + bold('인자의 개수는 5개여야 합니다.')
				)
				.get()
			)
			return
		}
		if (!args.every(arg => RANK.KO.includes(arg))) {
			msg.channel.send(
				new Embed(
					emoji('x') + bold('유효하지 않은 등급 이름이 포함돼 있습니다.')
				)
				.addContent(
					args.filter(
						arg => !RANK.KO.includes(arg)
					).join(', ')
				)
				.get()
			)
			return
		}
		const availableDices = Object.keys(Util.objectFlat(DICE)) as Array<keyof typeof DICE_EMOJI_ID>
		const deck: Array<keyof typeof DICE_EMOJI_ID> = []
		for (let i = 0; i < 5; i++) {
			const availableFilteredDices = (Object.keys(DICE[RANK.EN[RANK.KO.indexOf(args[i])] as keyof typeof DICE]) as Array<keyof typeof DICE_EMOJI_ID>).filter(dice => availableDices.includes(dice))
			const index = Util.random(0, availableFilteredDices.length - 1)
			deck.push(availableFilteredDices[index])
			availableDices.splice(availableDices.indexOf(availableFilteredDices[index]), 1)
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
