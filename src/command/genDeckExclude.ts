import { Message } from 'discord.js'
import Bot from '../class/Bot'
import Embed from '../class/Embed'
import Util from '../class/Util'
import { bold, emoji, diceEmoji } from '../markdown'
import DICE from '../const/dice'
import DICE_EMOJI_ID from '../const/diceEmojiId'
import { Command } from '../type'

export default {
	type: 'starts',
	content: '덱 제외',
	run(bot: Bot, msg: Message, args: Array<string>) {
		if (!args.every(
			dice => Object.values(Util.objectFlat(DICE)).some(
				_dice => _dice.includes(dice)
			)
		)) {
			msg.channel.send(
				new Embed(
					emoji('x') + bold('유효하지 않은 주사위 이름이 포함돼 있습니다.')
				)
				.addContent(
					args.filter(
						dice => Object.values(Util.objectFlat(DICE)).every(
							_dice => !_dice.includes(dice)
						)
					).join(', ')
				)
				.get()
			)
			return
		}
		const availableDices = (Object.keys(Util.objectFlat(DICE)) as Array<keyof typeof DICE_EMOJI_ID>).filter(
			diceName => Util.objectFlat(DICE)[diceName].every(
				(dice: string) => !args.includes(dice)
			)
		)
		if (availableDices.length < 5) {
			msg.channel.send(
				new Embed(
					emoji('x') + bold('제외하고 난 뒤의 남은 주사위 개수가 너무 적습니다.')
				)
				.get()
			)
			return
		}
		const deck: Array<keyof typeof DICE_EMOJI_ID> = []
		for (let i = 0; i < 5; i++) {
			deck.push(availableDices.splice(Util.random(0, availableDices.length - 1), 1)[0])
		}
		const excluded = (args.map<keyof typeof DICE_EMOJI_ID>(
			arg => Object.keys(Util.objectFlat(DICE)).find(
				key => Util.objectFlat(DICE)[key].includes(arg)
			) as keyof typeof DICE_EMOJI_ID)
		)
		let sliced = 0
		if (10 < excluded.length) {
			sliced = excluded.length - 10
		}
		msg.channel.send(
			new Embed(
				emoji('game_die') + bold('덱 생성')
			)
			.addField(
				'제외한 것',
				excluded.slice(0, 9).map(
					diceName => `${diceEmoji(diceName)} ${Util.objectFlat(DICE)[diceName][0]}`
				).join('\n') + (sliced < 1 ? '' : `\n...외 ${sliced}가지의 주사위`)
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
