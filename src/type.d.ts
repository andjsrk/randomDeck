import { Message } from 'discord.js'
import Bot from './class/Bot'

interface EqualsCommand {
	readonly type: 'equals'
	readonly content: string
	run(bot: Bot, msg: Message): void
}
interface StartsCommand {
	readonly type: 'starts'
	readonly content: string
	readonly argc?: number
	readonly partialArgs?: boolean
	run(bot: Bot, msg: Message, args: Array<string>): void
}
export type Command = EqualsCommand | StartsCommand
