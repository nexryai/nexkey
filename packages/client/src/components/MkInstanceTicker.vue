<template>
<div class="hpaizdrt">
	<img v-if="instance.faviconUrl" class="icon" :src="instance.faviconUrl"/>
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
	faviconUrl: getProxiedImageUrlNullable(Instance.iconUrl) ?? getProxiedImageUrlNullable(Instance.faviconUrl) ?? '/favicon.ico',
	name: instanceName,
	themeColor: (document.querySelector('meta[name="theme-color-orig"]') as HTMLMetaElement).content,
};
</script>

<style lang="scss" scoped>
.hpaizdrt {

	$height: 1.1rem;

	height: $height;
	border-radius: 4px;
	overflow: hidden;
	color: #fff;
	padding-left: 17px;

	> .icon {
		height: 100%;
	}
}
</style>
