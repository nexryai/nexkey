<template>
<VisitorUI/>
<XCommon/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VisitorUI from "./visitor/visitor.vue";
import XCommon from "./_common_/common.vue";

export default defineComponent({
    components: {
        XCommon,
        VisitorUI,
    },
});
</script>
