<template>
<MkSpacer :content-max="800">
    <MkTab v-model="tab" style="margin-bottom: var(--margin);">
        <option value="notes">{{ i18n.ts.notes }}</option>
        <option value="polls">{{ i18n.ts.poll }}</option>
    </MkTab>
    <XNotes v-if="tab === 'notes'" :pagination="paginationForNotes"/>
    <XNotes v-else-if="tab === 'polls'" :pagination="paginationForPolls"/>
</MkSpacer>
</template>

<script lang="ts" setup>
import XNotes from "@/components/MkNotes.vue";
import MkTab from "@/components/MkTab.vue";
import { i18n } from "@/i18n";

const paginationForNotes = {
    endpoint: "notes/featured" as const,
    limit: 10,
    offsetMode: true,
};

const paginationForPolls = {
    endpoint: "notes/polls/recommendation" as const,
    limit: 10,
    offsetMode: true,
};

let tab = $ref("notes");
</script>
