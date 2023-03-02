<template>
<div class="_formRoot">
	<FormInfo warn class="_formBlock">{{ i18n.ts.experimentalFeatures }}</FormInfo>

	<FormSwitch v-model="enableLimitedTL" class="_formBlock">{{ i18n.ts.enableLimitedTimeline }}</FormSwitch>
	<FormSwitch v-model="enableLTL" class="_formBlock">{{ i18n.ts.enableLocalTimeline }}</FormSwitch>
	<FormSwitch v-model="enableMTL" class="_formBlock">{{ i18n.ts.enableMediaTimeline }}</FormSwitch>
	<FormSwitch v-model="enableGTL" class="_formBlock">{{ i18n.ts.enableGlobalTimeline }}</FormSwitch>
	<FormSwitch v-model="enablePTL" class="_formBlock">{{ i18n.ts.enablePersonalTimeline }}</FormSwitch>

</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import FormInfo from '@/components/MkInfo.vue';
import * as os from '@/os';
import { i18n } from '@/i18n';
import { definePageMetadata } from '@/scripts/page-metadata';
import { defaultStore } from '@/store';
import FormSwitch from '@/components/form/switch.vue';

const enableMTL = computed(defaultStore.makeGetterSetter('enableMTL'));
const enableLTL = computed(defaultStore.makeGetterSetter('enableLTL'));
const enableGTL = computed(defaultStore.makeGetterSetter('enableGTL'));
const enableLimitedTL = computed(defaultStore.makeGetterSetter('enableLimitedTL'));
const enablePTL = computed(defaultStore.makeGetterSetter('enablePTL'));

const localCustomCss = ref(localStorage.getItem('customCss') ?? '');

const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

definePageMetadata({
	title: i18n.ts.timeline,
	icon: 'fas fa-list',
});
</script>
