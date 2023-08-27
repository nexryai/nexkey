<template>
<div class="_formRoot">
	<FormTextarea v-model="mutedReactions" class="_formBlock">
		<template #label>{{ i18n.ts._reactionMute.heading }}</template>
		<template #caption>{{ i18n.ts._reactionMute.reactionMuteDescription }}</template>
	</FormTextarea>
	<MkButton primary :disabled="!changed" class="_formBlock" @click="save()"><i class="ti ti-device-floppy"></i> {{ i18n.ts.save }}</MkButton>
</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import FormTextarea from '@/components/form/textarea.vue';
import MkInfo from '@/components/MkInfo.vue';
import MkButton from '@/components/MkButton.vue';
import { i18n } from '@/i18n';
import { definePageMetadata } from '@/scripts/page-metadata';
import { defaultStore } from '@/store';

const mutedReactions = ref(defaultStore.state.mutedReactions.join('\n'));
const changed = ref(false);

async function save() {
	let mutes = mutedReactions.value
		.trim().split('\n')
		.map(el => el.trim())
		.filter(el => el);

	defaultStore.set('mutedReactions', mutes);
}

watch(mutedReactions, () => {
	changed.value = true;
});

const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

definePageMetadata({
	title: i18n.ts.instanceMute,
	icon: 'ti ti-planet-off',
});
</script>
