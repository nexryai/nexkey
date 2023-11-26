<template>
<FormSwitch v-model="streamModeEnabled" class="_formBlock">{{ i18n.ts.enableStreamingMode }}</FormSwitch>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useWidgetPropsManager, Widget, WidgetComponentExpose } from "./widget";
import { defaultStore } from "@/store";
import { i18n } from "@/i18n";
import FormSwitch from "@/components/form/switch.vue";
import { GetFormResultType } from "@/scripts/form";

const streamModeEnabled = computed(defaultStore.makeGetterSetter("streamModeEnabled"));

const name = "streamMode";

const widgetPropsDef = {
};

type WidgetProps = GetFormResultType<typeof widgetPropsDef>;

const props = defineProps<{ widget?: Widget<WidgetProps>; }>();
const emit = defineEmits<{ (ev: "updateProps", props: WidgetProps); }>();

const { configure } = useWidgetPropsManager(name,
	widgetPropsDef,
	props,
	emit,
);

defineExpose<WidgetComponentExpose>({
	name,
	configure,
	id: props.widget ? props.widget.id : null,
});

//TODO: 自動リロード
</script>
