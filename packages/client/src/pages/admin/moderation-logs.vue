<template>
<MkStickyContainer>
    <template #header><XHeader :actions="headerActions" :tabs="headerTabs"/></template>
    <MkSpacer :content-max="900">
        <div class="ztgjmzrw">
            <div class="inputs" style="display: flex; gap: var(--margin); flex-wrap: wrap; padding-top: 1.2em;">
                <MkInput v-model="userId" :debounce="true" type="search" style="margin: 0; flex: 1;">
                    <template #label>User ID</template>
                </MkInput>
                <MkInput v-model="type" :debounce="true" type="search" style="margin: 0; flex: 1;">
                    <template #label>Type</template>
                </MkInput>
            </div>
            <MkPagination v-slot="{items : logs}" :pagination="pagination" class="ruryvtyk _content">
                <section v-for="log in logs" class="_card _gap logs">
                    <div class="_content log">
                        <MkInput v-model="log.user.username" readonly>
                            <template #label>{{ i18n.ts.username }}</template>
                        </MkInput>
                        <MkInput v-model="log.type" readonly>
                            <template #label>{{ i18n.ts.value }}</template>
                        </MkInput>
                        <MkTextarea :model-value="JSON.stringify(log.info, null, 2)" readonly code tall>
                            <template #label>{{ i18n.ts.details }}</template>
                        </MkTextarea>
                        <p v-if="log.createdAt"><i class="far fa-clock"></i> {{ i18n.ts.createdAt }} <MkTime :time="log.createdAt" mode="detail"/></p>
                    </div>
                </section>
            </MkPagination>
        </div>
    </MkSpacer>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import XHeader from "./_header_.vue";
import MkButton from "@/components/MkButton.vue";
import MkInput from "@/components/form/input.vue";
import MkTextarea from "@/components/form/textarea.vue";
import * as os from "@/os";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import MkPagination from "@/components/MkPagination.vue";

let logs: any[] = $ref([]);
let type = $ref(null);
let userId = $ref("");

os.api("admin/show-moderation-logs").then(logsResponse => {
    logs = logsResponse;
});

const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

const pagination = {
    endpoint: "admin/show-moderation-logs" as const,
    limit: 10,
    params: computed(() => ({
        type: (type && type !== "") ? type : null,
        userId: (userId && userId !== "") ? userId : null,
    })),
};

definePageMetadata({
    title: i18n.ts.moderationlogs,
    icon: "ti ti-list-check",
});
</script>

<style lang="scss" scoped>
.ztgjmzrw {
	margin: var(--margin);
}
</style>
