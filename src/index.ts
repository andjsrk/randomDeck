import Bot from './class/Bot'
import Embed from './class/Embed'
import CommandExecuter from './class/CommandExecuter'
import { TOKEN, PREFIX } from './config'

const bot = new Bot(TOKEN)

bot.on('ready', async () => {
	console.log('준비 완료')
	Embed.bindDeveloper(await bot.get('user', '485801939431456799'))
	bot.bindPrefix(PREFIX)
	bot.bindCommandsOnDir('command')
})

bot.on('message', msg => {
	if (msg.author.bot) return
	CommandExecuter.executeEveryCommands(bot, msg)
})

bot.login()
