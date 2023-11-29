import { ColdDeviceStorage } from '@/store';

let ctx: AudioContext;
const cache = new Map<string, AudioBuffer>();
let canPlay = true;

export async function loadAudio(file: string, useCache = true) {
	if (ctx == null) {
		ctx = new AudioContext();
	}
	if (useCache && cache.has(file)) {
		return cache.get(file)!;
	}
	const response = await fetch(`/client-assets/sounds/${file}.mp3`);
	const arrayBuffer = await response.arrayBuffer();
	const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

	if (useCache) {
		cache.set(file, audioBuffer);
	}

	return audioBuffer;
}

export function play(type: string) {
	const sound = ColdDeviceStorage.get('sound_' + type as any);
	if (sound.type == null || !canPlay) return;
	canPlay = false;
	playFile(sound.type, sound.volume).finally(() => {
		// ごく短時間に音が重複しないように
		setTimeout(() => {
			canPlay = true;
		}, 25);
	});
	playFile(sound.type, sound.volume);
}

export async function playFile(file: string, volume: number) {
	const buffer = await loadAudio(file);
	createSourceNode(buffer, volume)?.start();
}

export function createSourceNode(buffer: AudioBuffer, volume: number) : AudioBufferSourceNode | null {
	const masterVolume = ColdDeviceStorage.get('sound_masterVolume');
	if (isMute() || masterVolume === 0 || volume === 0) {
		return null;
	}

	const gainNode = ctx.createGain();
	gainNode.gain.value = masterVolume * volume;

	const soundSource = ctx.createBufferSource();
	soundSource.buffer = buffer;
	soundSource.connect(gainNode).connect(ctx.destination);
	return soundSource;
}

export function isMute(): boolean {
	if (ColdDeviceStorage.get('sound_notUseSound')) {
		// サウンドを出力しない
		return true;
	}

	// noinspection RedundantIfStatementJS
	if (ColdDeviceStorage.get('sound_useSoundOnlyWhenActive') && document.visibilityState === 'hidden') {
		// ブラウザがアクティブな時のみサウンドを出力する
		return true;
	}

	return false;
}
