import { Message } from 'discord.js'
import Bot from './Bot'
import Embed from './Embed'
import { bold, emoji } from '../markdown'
import { Command } from '../type'

export default class CommandExecuter {
	private static prefix = ''
	private static commands: Array<Command> = []
	static bindPrefix(prefix: string) {
		CommandExecuter.prefix = prefix
	}
	static bindCommand(command: Command) {
		CommandExecuter.commands.push(command)
	}
	static executeEveryCommands(bot: Bot, msg: Message) {
		CommandExecuter.commands.forEach(command => {
			CommandExecuter.execute(command, bot, msg)
		})
	}
	static execute(command: Command, bot: Bot, msg: Message) {
		switch (command.type) {
			case 'equals':
				if (msg.content === `${CommandExecuter.prefix}${command.content}`) {
					command.run(bot, msg)
				}
				break
			case 'starts':
				if (msg.content.startsWith(`${CommandExecuter.prefix}${command.content}`)) {
					if ((command.argc || Infinity) >= msg.content.replace(RegExp(`\\${CommandExecuter.prefix}${command.content} ?`), '').split(' ').length) {
						command.run(bot, msg, msg.content.replace(RegExp(`\\${CommandExecuter.prefix}${command.content} ?`), '').split(' '))
					} else msg.channel.send(
						new Embed(
							emoji('exclamation') + bold('인자가 너무 많습니다.')
						)
						.get()
					)
				}
				break
		}
	}
}