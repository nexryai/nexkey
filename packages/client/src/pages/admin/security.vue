<template>
<MkStickyContainer>
    <template #header><XHeader :actions="headerActions" :tabs="headerTabs"/></template>
    <MkSpacer v-if="streamModeEnabled">
        <MkInfo warn>{{ i18n.ts.streamingModeWarning }}</MkInfo>
    </MkSpacer>
    <MkSpacer v-if="!streamModeEnabled" :content-max="700" :margin-min="16" :margin-max="32">
        <FormSuspense :p="init">
            <div class="_formRoot">
                <FormFolder class="_formBlock">
                    <template v-if="enableBotProtection" #icon><i class="ti ti-shield-check folder-icon-green"></i></template>
                    <template v-else #icon><i class="ti ti-shield-x folder-icon-red"></i></template>
                    <template #label>{{ i18n.ts.botProtection }}</template>
                    <template v-if="enableHcaptcha" #suffix>hCaptcha</template>
                    <template v-else-if="enableRecaptcha" #suffix>reCAPTCHA</template>
                    <template v-else-if="enableTurnstile" #suffix>Turnstile</template>
                    <template v-else #suffix>{{ i18n.ts.none }} ({{ i18n.ts.notRecommended }})</template>

                    <XBotProtection/>
                </FormFolder>

                <FormFolder class="_formBlock">
                    <template v-if="enableActiveEmailValidation" #icon><i class="ti ti-mail-check folder-icon-green"></i></template>
                    <template v-else #icon><i class="ti ti-mail-x folder-icon-red"></i></template>
                    <template #label>Active Email Validation</template>
                    <template v-if="enableActiveEmailValidation" #suffix>Enabled</template>
                    <template v-else #suffix>Disabled</template>

                    <div class="_formRoot">
                        <span class="_formBlock">{{ i18n.ts.activeEmailValidationDescription }}</span>
                        <FormSwitch v-model="enableActiveEmailValidation" class="_formBlock" @update:model-value="save">
                            <template #label>Enable</template>
                        </FormSwitch>
                    </div>
                </FormFolder>

                <FormFolder class="_formBlock">
                    <template v-if="enableIpLogging" #icon><i class="ti ti-list-search folder-icon-green"></i></template>
                    <template v-else #icon><i class="ti ti-shield-x folder-icon-red"></i></template>
                    <template #label>Log IP address</template>
                    <template v-if="enableIpLogging" #suffix>Enabled</template>
                    <template v-else #suffix>Disabled</template>

                    <div class="_formRoot">
                        <FormSwitch v-model="enableIpLogging" class="_formBlock" @update:model-value="save">
                            <template #label>Enable</template>
                        </FormSwitch>
                    </div>
                </FormFolder>

                <FormFolder class="_formBlock">
                    <template #icon><i class="ti ti-link"></i></template>
                    <template #label>Summaly Proxy</template>

                    <div class="_formRoot">
                        <FormInput v-model="summalyProxy" class="_formBlock">
                            <template #prefix><i class="ti ti-link"></i></template>
                            <template #label>Summaly Proxy URL</template>
                        </FormInput>

                        <FormButton primary class="_formBlock" @click="save"><i class="ti ti-device-floppy"></i> {{ i18n.ts.save }}</FormButton>
                    </div>
                </FormFolder>
            </div>
        </FormSuspense>
    </MkSpacer>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import XBotProtection from "./bot-protection.vue";
import XHeader from "./_header_.vue";
import FormFolder from "@/components/form/folder.vue";
import FormSwitch from "@/components/form/switch.vue";
import FormSuspense from "@/components/form/suspense.vue";
import FormInput from "@/components/form/input.vue";
import FormButton from "@/components/MkButton.vue";
import * as os from "@/os";
import { fetchInstance } from "@/instance";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import { defaultStore } from "@/store";
import MkInfo from "@/components/MkInfo.vue";

const streamModeEnabled = ref(defaultStore.state.streamModeEnabled);

let summalyProxy: string = $ref("");
let enableHcaptcha: boolean = $ref(false);
let enableRecaptcha: boolean = $ref(false);
let enableTurnstile: boolean = $ref(false);
let enableBotProtection: boolean = $ref(false);
let enableIpLogging: boolean = $ref(false);
let enableActiveEmailValidation: boolean = $ref(false);

async function init() {
    const meta = await os.api("admin/meta");
    summalyProxy = meta.summalyProxy;
    enableHcaptcha = meta.enableHcaptcha;
    enableRecaptcha = meta.enableRecaptcha;
    enableTurnstile = meta.enableTurnstile;
    enableBotProtection = enableHcaptcha || enableRecaptcha || enableTurnstile;
    enableIpLogging = meta.enableIpLogging;
    enableActiveEmailValidation = meta.enableActiveEmailValidation;
}

function save() {
    os.apiWithDialog("admin/update-meta", {
        summalyProxy,
        enableIpLogging,
        enableActiveEmailValidation,
    }).then(() => {
        fetchInstance();
    });
}

const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

definePageMetadata({
    title: i18n.ts.security,
    icon: "ti ti-shield",
});
</script>

<style>
.folder-icon-green {
    color: #41b781;
}

.folder-icon-red {
    color: red;
}

</style>
