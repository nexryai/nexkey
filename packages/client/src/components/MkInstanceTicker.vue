<template>
<div class="hpaizdrt">
	<div class="distorted-circle" :style="bg"></div>
	<img v-if="faviconUrl" class="icon instance-icon" :src="faviconUrl"/>
</div>
</template>

<script lang="ts" setup>
import { } from 'vue';
import { instanceName } from '@/config';
import { instance as Instance } from '@/instance';
import { getProxiedImageUrlNullable } from '@/scripts/media-proxy';

const props = defineProps<{
	instance?: {
		faviconUrl?: string
		name: string
		themeColor?: string
	}
}>();

// if no instance data is given, this is for the local instance
const instance = props.instance ?? {
	name: instanceName,
	themeColor: (document.querySelector('meta[name="theme-color-orig"]') as HTMLMetaElement).content,
};

const themeColor = instance.themeColor ?? '#777777';
const bg = {
	background: `linear-gradient(90deg, ${themeColor}, ${themeColor}00)`,
};

const faviconUrl = $computed(() => props.instance ? getProxiedImageUrlNullable(props.instance.faviconUrl, 'ticker')
	: getProxiedImageUrlNullable(Instance.iconUrl, 'ticker')
	?? getProxiedImageUrlNullable(Instance.faviconUrl, 'ticker') ?? '/favicon.ico');
// const themeColor = instance.themeColor ?? '#777777';
</script>

<style lang="scss" scoped>
.hpaizdrt {

	$height: 1.1rem;

	height: $height;
	border-radius: 4px;
	color: #fff;
	padding-left: 17px;

	> .icon {
		height: 100%;
	}
}

.distorted-circle {
	position: absolute;
	width: 35px;
	height: 23px;
	border-radius: 50% 70% 50% 80%;
	filter: blur(3px) opacity(27%);
	margin-left: -4px;
}

.instance-icon {
	position: relative;
	vertical-align: -3px;
	border-radius: 4px;
}
</style>
