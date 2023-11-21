import { ColdDeviceStorage } from '@/store';

const ctx = new AudioContext();
const cache = new Map<string, AudioBuffer>();

export async function loadAudio(file: string, useCache = true) {
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
	if (sound.type == null) return;
	playFile(sound.type, sound.volume);
}

export async function playFile(file: string, volume: number) {
	const buffer = await loadAudio(file);
	createSourceNode(buffer, volume)?.start();
}

export function createSourceNode(buffer: AudioBuffer, volume: number) : AudioBufferSourceNode | null {
	const masterVolume = ColdDeviceStorage.get('sound_masterVolume');
	if (masterVolume === 0 || volume === 0) {
		return null;
	}

	const gainNode = ctx.createGain();
	gainNode.gain.value = masterVolume * volume;

	const soundSource = ctx.createBufferSource();
	soundSource.buffer = buffer;
	soundSource.connect(gainNode).connect(ctx.destination);
	return soundSource;
}
