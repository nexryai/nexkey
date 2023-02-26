<template>
<MkStickyContainer>
	<template #header><XHeader :actions="headerActions" :tabs="headerTabs"/></template>
	<MkSpacer :content-max="700" :margin-min="16" :margin-max="32">
		<FormSuspense :p="init">
			<FormTextarea v-model="blockedEmailDomains" class="_formBlock">
				<span>{{ i18n.ts.blockedEmailDomains }}</span>
				<template #caption>{{ i18n.ts.blockedEmailDomainsDescription }}</template>
			</FormTextarea>

			<FormButton primary class="_formBlock" @click="save"><i class="fas fa-save"></i> {{ i18n.ts.save }}</FormButton>
		</FormSuspense>
	</MkSpacer>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { } from 'vue';
import XHeader from './_header_.vue';
import FormButton from '@/components/MkButton.vue';
import FormTextarea from '@/components/form/textarea.vue';
import FormSuspense from '@/components/form/suspense.vue';
import * as os from '@/os';
import { fetchInstance } from '@/instance';
import { i18n } from '@/i18n';
import { definePageMetadata } from '@/scripts/page-metadata';

let blockedEmailDomains: string = $ref('');

async function init() {
	const meta = await os.api('admin/meta');
	blockedEmailDomains = meta.blockedEmailDomains.join('\n');
}

function save() {
	os.apiWithDialog('admin/update-meta', {
		blockedEmailDomains: blockedEmailDomains.split('\n') || [],
	}).then(() => {
		fetchInstance();
	});
}

const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

definePageMetadata({
	title: i18n.ts.emailDomainBlocking,
	icon: 'fas fa-ban',
});
</script>
