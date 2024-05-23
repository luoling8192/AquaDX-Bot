import { DifficultyEnum, NoteCounts, Regions, Sheet, TypeEnum, VersionEnum } from '@gekichumai/dxdata';
import { ALL_MUSIC, DX_VERSIONS, LEVEL_EMOJI, LEVEL_EN, LEVELS } from '../consts';
import _ from 'lodash';

export default class Chart implements Sheet {
	internalId?: number;
	type: TypeEnum;
	releaseDate?: string;
	difficulty: DifficultyEnum;
	internalLevelValue: number;
	multiverInternalLevelValue?: Record<VersionEnum, number>;
	noteDesigner: string;
	noteCounts: NoteCounts;
	regions: Regions;
	isSpecial: boolean;
	version: VersionEnum;
	comment?: string;

	public constructor(data: Sheet, dataFromAllMusic?: typeof ALL_MUSIC[number], internalId?: number) {
		const dataCopy = { ...data };
		delete dataCopy.level;
		Object.assign(this, dataCopy);
		const valueFromAllMusic = dataFromAllMusic?.notes[LEVEL_EN.indexOf(data.difficulty)]?.lv;
		if (valueFromAllMusic && this.internalLevelValue !== valueFromAllMusic) {
			false && console.log('发现了定数错误', dataFromAllMusic.name, data.type, data.difficulty, '来自 DXRating.net 的定数:', data.internalLevelValue, '来自 all-music.json 的定数:', valueFromAllMusic);
			this.internalLevelValue = valueFromAllMusic;
		}
		if (internalId && !this.internalId) {
			this.internalId = internalId;
		}
		this.internalId %= 1e5;
	}

	get level(): typeof LEVELS[number] {
		const base = Math.floor(this.internalLevelValue);
		const decimal = this.internalLevelValue * 10 - base * 10;
		if (decimal >= 7) {
			return `${base}+` as typeof LEVELS[number];
		}
		return base.toString() as typeof LEVELS[number];
	}

	get displayInline(): string {
		let trend = '';
		if (this.multiverInternalLevelValue) {
			const values = _.sortBy(Object.entries(this.multiverInternalLevelValue), ([key, value]) => DX_VERSIONS.indexOf(key as any))
				.map(([key, value]) => value);
			if (values[0] !== values[values.length - 1])
				trend = values[0] > values[values.length - 1] ? ' 📉' : ' 📈';
		}

		return `${LEVEL_EMOJI[LEVEL_EN.indexOf(this.difficulty)]} ${this.internalLevelValue.toFixed(1)}${trend} ${this.noteDesigner}`;
	}

	get display() {
		let message = `${LEVEL_EMOJI[LEVEL_EN.indexOf(this.difficulty)]} ${this.level} ${this.internalLevelValue.toFixed(1)}\n` +
			`谱师:\t${this.noteDesigner}\n\n`;

		for (const type in this.noteCounts) {
			if (!this.noteCounts[type]) continue;
			message += `${_.capitalize(type)}:\t${this.noteCounts[type]}\n`;
		}

		if (this.multiverInternalLevelValue) {
			message += '\n不同版本定数:\n';
			let last = 0;
			for (const version of DX_VERSIONS) {
				if (!this.multiverInternalLevelValue[version]) continue;
				if (!last) last = this.multiverInternalLevelValue[version];
				let trend = '';
				if (this.multiverInternalLevelValue[version] > last) {
					trend = ' 🔺';
				} else if (this.multiverInternalLevelValue[version] < last) {
					trend = ' 🔻';
				}
				last = this.multiverInternalLevelValue[version];
				message += `${version}:\t${this.multiverInternalLevelValue[version].toFixed(1)} ${trend}\n`;
			}
		}

		return message;
	}
}
