import { MessageEmbed, User } from 'discord.js'

export default class Embed {
	private embed: MessageEmbed
	constructor(title: string) {
		this.embed = new MessageEmbed
		this.embed.setDescription(title)
		if (Embed.developer !== null) this.embed.setFooter(Embed.developer.tag, Embed.developer.avatarURL() as string)
	}
	private static developer: User | null = null
	static bindDeveloper(user: User) {
		Embed.developer = user
	}
	get() {
		return this.embed
	}
	addContent(content: string | number) {
		this.embed.setDescription(`${this.embed.description}\n\n${content}`)
		return this
	}
	addField(name: string, value: any, inline?: boolean) {
		this.embed.addField(name, value, inline)
		return this
	}
	setAuthor(author: User) {
		this.embed.setFooter(author.tag, author.avatarURL() as string)
		return this
	}
}
