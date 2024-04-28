<template>
<MkStickyContainer>
    <template #header><XHeader v-model:tab="tab" :actions="headerActions" :tabs="headerTabs"/></template>
    <MkSpacer :content-max="800">
        <XQueue v-if="tab === 'deliver'" domain="deliver"/>
        <XQueue v-else-if="tab === 'inbox'" domain="inbox"/>
    </MkSpacer>
    <br>
    <MkButton @click="promoteAllQueues"><i class="ti ti-reload"></i> Promote all jobs</MkButton>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import XQueue from "./queue.chart.vue";
import XHeader from "./_header_.vue";
import * as os from "@/os";
import * as config from "@/config";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import { $i } from "@/account";
import MkButton from "@/components/MkButton.vue";

let tab = ref("deliver");

const headerActions = computed(() => [{
    asFullButton: true,
    icon: "ti ti-external-link",
    text: i18n.ts.dashboard,
    handler: () => {
        window.open(config.url + "/queue", "_blank");
    },
}]);

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

        // /api/queues/deliver/promoteにPUT
        fetch("/queue/api/queues/deliver/promote", {
            method: "PUT",
            headers: {
                // token
                "Cookie": "token=" + $i.token,
            },
        }).then(() => {
            os.toast(i18n.ts.retryAllQueuesSuccess);
        });
    });
}

definePageMetadata({
    title: i18n.ts.jobQueue,
    icon: "ti ti-clock-play",
});
</script>
