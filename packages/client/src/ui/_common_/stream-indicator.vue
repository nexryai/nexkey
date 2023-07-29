<template>
  <div v-if="hasDisconnected && $store.state.serverDisconnectedBehavior === 'quiet'" class="nsbbhtug _panel _shadow" @click="resetDisconnected">
    <div><i class="ti ti-alert-triangle"></i> {{ i18n.ts.disconnectedFromServer }}</div>
    <div class="command _buttons">
      <MkButton class="commandButton" small primary @click="reload">{{ i18n.ts.reload }}</MkButton>
      <MkButton class="commandButton" small>{{ i18n.ts.doNothing }}</MkButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue';
import { stream } from '@/stream';
import { i18n } from '@/i18n';
import MkButton from '@/components/MkButton.vue';
import * as os from '@/os';
const zIndex = os.claimZIndex('high');

let hasDisconnected = $ref(false);

function onDisconnected() {
	hasDisconnected = true;
}

function resetDisconnected() {
	hasDisconnected = false;
}

function reload() {
	location.reload();
}

stream.on('_disconnected_', onDisconnected);

onUnmounted(() => {
	stream.off('_disconnected_', onDisconnected);
});
</script>

<style lang="scss" scoped>
.nsbbhtug {
	position: fixed;
  z-index: v-bind(zIndex);
  padding: 12px;
  bottom: 8px;
	right: 8px;
	margin: 0;
	font-size: 0.9em;
	max-width: 320px;

	> .command {
    display: flex;
    margin-top: 8px;
    > .commandButton {
        margin: 5px;
    }
	}
}
</style>
