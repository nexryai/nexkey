<template>
<transition :name="$store.state.animation ? 'zoom' : ''" appear>
	<div class="mjndxjcg">
		<i class="ti ti-exclamation-mark"></i>
		<p>{{ i18n.ts.somethingHappened }}</p>
		<MkButton class="button" @click="() => $emit('retry')">{{ i18n.ts.retry }}</MkButton>
	</div>
</transition>
</template>

<script lang="ts" setup>
import MkButton from "@/components/MkButton.vue";
import { i18n } from "@/i18n";
</script>

<style lang="scss" scoped>
.mjndxjcg {
	padding: 32px;
	text-align: center;

	> p {
		margin: 0 0 8px 0;
	}

	> .button {
		margin: 0 auto;
	}

	> i {
		vertical-align: bottom;
		padding: 24px;
    font-size: xxx-large;
	}
}
</style>
