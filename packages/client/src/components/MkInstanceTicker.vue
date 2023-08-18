<template>
<div class="hpaizdrt">
	<img v-if="faviconUrl" class="icon" :src="faviconUrl"/>
</div>
</template>

<script lang="ts" setup>
import { } from 'vue';
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
const faviconUrl = $computed(() => props.instance ? getProxiedImageUrlNullable(props.instance.faviconUrl) : getProxiedImageUrlNullable(Instance.iconUrl) ?? getProxiedImageUrlNullable(Instance.faviconUrl) ?? '/favicon.ico');

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
</style>
