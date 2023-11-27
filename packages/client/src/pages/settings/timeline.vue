<template>
<div class="_formRoot">
    <FormSwitch v-model="enableLTL" class="_formBlock">{{ i18n.ts.enableLocalTimeline }}</FormSwitch>
    <FormSwitch v-model="enableGTL" class="_formBlock">{{ i18n.ts.enableGlobalTimeline }}</FormSwitch>
</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import FormInfo from "@/components/MkInfo.vue";
import * as os from "@/os";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import { defaultStore } from "@/store";
import FormSwitch from "@/components/form/switch.vue";

const enableLTL = computed(defaultStore.makeGetterSetter("enableLTL"));
const enableGTL = computed(defaultStore.makeGetterSetter("enableGTL"));

const localCustomCss = ref(localStorage.getItem("customCss") ?? "");

const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

definePageMetadata({
    title: i18n.ts.timeline,
    icon: "ti ti-list",
});
</script>
