import * as fs from 'fs'
import { Client, ClientEvents, User } from 'discord.js'
import CommandExecuter from './CommandExecuter'
import { Command } from '../type'

export default class Bot {
	private readonly client: Client
	token: string
	constructor(token: string) {
		if (!token) throw new Error('no token provided')
		this.client = new Client()
		this.token = token
	}
	get readied() {
		return this.client.uptime !== null
	}
	get id() {
		if (!this.readied) throw new Error('bot wasn\'t ready.')
		return this.client.user!.id
	}
	get user() {
		if (!this.readied) throw new Error('bot wasn\'t ready.')
		return this.client.user!
	}
	bindPrefix(prefix: string) {
		CommandExecuter.bindPrefix(prefix)
	}
	registerSlashCommands(path: string) {
		const commandPaths = fs.readdirSync(path, 'utf-8')
		commandPaths.forEach(commandPath => {
			const command: Command = require(`../${path}${path.endsWith('/') ? '' : '/'}${commandPath}`).default
			if (command.type === 'equals') {
				command.content
			}
		})
	}
	bindCommandsOnDir(path: string) {
		const commandPaths = fs.readdirSync(path, 'utf-8')
		commandPaths.forEach(commandPath => {
			const command: Command = require(`../${path}${path.endsWith('/') ? '' : '/'}${commandPath}`).default
			CommandExecuter.bindCommand(command)
		})
	}
	setActivity(name: string, type: 'PLAYING' | 'WATCHING' | 'STREAMING' | 'LISTENING' = 'PLAYING') {
		if (!this.readied) throw new Error('bot wasn\'t ready.')
		this.client.user!.setActivity({ name, type })
	}
	on<K extends keyof ClientEvents>(eventName: K, listener: (...args: ClientEvents[K]) => void): this {
		this.client.on(eventName, listener)
		return this
	}
	once<K extends keyof ClientEvents>(eventName: K, listener: (...args: ClientEvents[K]) => void): this {
		this.client.once(eventName, listener)
		return this
	}
	get(type: 'user', id: string): Promise<User> {
		switch (type) {
			case 'user':
				return this.client.users.fetch(id)
			default:
				throw new Error(`Unexpected type: ${type}`)
		}
	}
	login() {
		return this.client.login(this.token)
	}
}