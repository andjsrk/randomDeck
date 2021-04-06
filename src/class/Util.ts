import { User } from 'discord.js'

export default class Util {
	static random(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
	static mention(userResolvable: string | User) {
		return `<@${typeof userResolvable === 'string' ? userResolvable : userResolvable.id}>`
	}
	static objectFlat(obj: object): {
		[x: string]: any
	} {
		const newObj: {
			[x: string]: any
		} = {}
		for (const v of Object.values(obj)) {
			if (typeof v === 'object') {
				for (const k in v) {
					newObj[k] = v[k]
				}
			} else newObj[Object.keys(obj)[Object.values(obj).indexOf(v)]] = v
		}
		return newObj
	}
}
