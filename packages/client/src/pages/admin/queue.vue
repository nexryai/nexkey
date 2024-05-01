<template>
<MkStickyContainer>
    <template #header><XHeader v-model:tab="tab" :tabs="headerTabs"/></template>
    <MkSpacer :content-max="800">
        <XQueue v-if="tab === 'deliver'" domain="deliver"/>
        <XQueue v-else-if="tab === 'inbox'" domain="inbox"/>
        <br>
        <MkButton @click="promoteAllQueues"><i class="ti ti-reload"></i> Promote all jobs</MkButton>
    </MkSpacer>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import XQueue from "./queue.chart.vue";
import XHeader from "./_header_.vue";
import * as os from "@/os";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import { $i } from "@/account";
import MkButton from "@/components/MkButton.vue";

let tab = ref("deliver");

const headerTabs = computed(() => [{
    key: "deliver",
    title: "Deliver",
}, {
    key: "inbox",
    title: "Inbox",
}]);

function promoteAllQueues() {
    os.confirm({
        type: "warning",
        title: "OK?",
    }).then(({ canceled }) => {
        if (canceled || !$i) return;

        os.apiWithDialog("admin/queue/promote", { type: tab });
    });
}

definePageMetadata({
    title: i18n.ts.jobQueue,
    icon: "ti ti-clock-play",
});
</script>
