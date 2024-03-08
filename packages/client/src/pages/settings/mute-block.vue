<template>
<div v-if="streamModeEnabled">
    <MkInfo warn>{{ i18n.ts.streamingModeWarning }}</MkInfo>
</div>
<MkSpacer v-if="!streamModeEnabled" :content-max="1000" :margin-min="16" :margin-max="32">
    <div class="_formRoot">
        <FormFolder class="_formBlock">
            <template #icon><i class="ti ti-message-2-cancel"></i></template>
            <template #label>{{ i18n.ts.wordMute }}</template>
            <MkTab v-model="wordsTab" class="_formBlock">
                <option value="soft">{{ i18n.ts._wordMute.soft }}</option>
                <option value="hard">{{ i18n.ts._wordMute.hard }}</option>
            </MkTab>
            <div class="_formBlock">
                <div v-show="wordsTab === 'soft'">
                    <MkInfo class="_formBlock">{{ i18n.ts._wordMute.softDescription }}</MkInfo>
                    <FormTextarea v-model="softMutedWords" class="_formBlock">
                        <span>{{ i18n.ts._wordMute.muteWords }}</span>
                        <template #caption>{{ i18n.ts._wordMute.muteWordsDescription }}<br>{{ i18n.ts._wordMute.muteWordsDescription2 }}</template>
                    </FormTextarea>
                </div>
                <div v-show="wordsTab === 'hard'">
                    <MkInfo warn class="_formBlock">{{ i18n.ts._wordMute.hardDescription }} {{ i18n.ts.reflectMayTakeTime }}</MkInfo>
                    <FormTextarea v-model="hardMutedWords" class="_formBlock">
                        <span>{{ i18n.ts._wordMute.muteWords }}</span>
                        <template #caption>{{ i18n.ts._wordMute.muteWordsDescription }}<br>{{ i18n.ts._wordMute.muteWordsDescription2 }}</template>
                    </FormTextarea>
                    <MkKeyValue v-if="hardWordMutedNotesCount != null" class="_formBlock">
                        <template #key>{{ i18n.ts._wordMute.mutedNotes }}</template>
                        <template #value>{{ number(hardWordMutedNotesCount) }}</template>
                    </MkKeyValue>
                </div>
            </div>
            <MkButton primary inline :disabled="!mutedWordsChanged" @click="saveMutedWords()"><i class="ti ti-device-floppy"></i> {{ i18n.ts.save }}</MkButton>
            <FormSwitch v-model="showMessageOnMuted" class="_formBlock">{{ i18n.ts.showMessageOnMuted }}</FormSwitch>
        </FormFolder>

        <FormFolder class="_formBlock">
            <template #icon><i class="ti ti-thumb-down-off"></i></template>
            <template #label>{{ i18n.ts.reactionMute }}</template>
            <FormTextarea v-model="mutedReactions" class="_formBlock">
                <template #label>{{ i18n.ts._reactionMute.heading }}</template>
                <template #caption>{{ i18n.ts._reactionMute.reactionMuteDescription }}</template>
            </FormTextarea>
            <MkButton primary :disabled="!mutedReactionsChanged" class="_formBlock" @click="saveMutedReactions()"><i class="ti ti-device-floppy"></i> {{ i18n.ts.save }}</MkButton>
        </FormFolder>

        <FormFolder class="_formBlock">
            <template #icon><i class="ti ti-planet-off"></i></template>
            <template #label>{{ i18n.ts.instanceMute }}</template>
            <FormTextarea v-model="instanceMutes" class="_formBlock">
                <template #label>{{ i18n.ts._instanceMute.heading }}</template>
                <template #caption>{{ i18n.ts._instanceMute.instanceMuteDescription }}<br>{{ i18n.ts._instanceMute.instanceMuteDescription2 }}</template>
            </FormTextarea>
            <MkButton primary :disabled="!mutedInstanceChanged" class="_formBlock" @click="saveMutedInstance()"><i class="ti ti-device-floppy"></i> {{ i18n.ts.save }}</MkButton>
        </FormFolder>

        <FormFolder class="_formBlock">
            <template #icon><i class="ti ti-user-cancel"></i></template>
            <template #label>{{ i18n.ts.users }}</template>
            <MkTab v-model="usersTab" style="margin-bottom: var(--margin);">
                <option value="mute">{{ i18n.ts.mutedUsers }}</option>
                <option value="block">{{ i18n.ts.blockedUsers }}</option>
            </MkTab>
            <div v-if="usersTab === 'mute'">
                <MkPagination :pagination="mutingPagination" class="muting">
                    <template #empty><FormInfo>{{ i18n.ts.noUsers }}</FormInfo></template>
                    <template #default="{items}">
                        <div class="_formLinks">
                            <FormLink v-for="mute in items" :key="mute.id" :to="userPage(mute.mutee)">
                                <MkAcct :user="mute.mutee"/>
                                <div v-if="mute.expiresAt" class="clock-container">
                                    <i class="ti ti-clock-cancel"></i><MkTime :time="mute.expiresAt" mode="detail"/>
                                </div>
                            </FormLink>
                        </div>
                    </template>
                </MkPagination>
            </div>
            <div v-if="usersTab === 'block'">
                <MkPagination :pagination="blockingPagination" class="blocking">
                    <template #empty><FormInfo>{{ i18n.ts.noUsers }}</FormInfo></template>
                    <template #default="{items}">
                        <div class="_formLinks">
                            <FormLink v-for="block in items" :key="block.id" :to="userPage(block.blockee)">
                                <MkAcct :user="block.blockee"/>
                            </FormLink>
                        </div>
                    </template>
                </MkPagination>
            </div>
        </FormFolder>

        <FormFolder class="_formBlock">
            <template #icon><i class="ti ti-mood-sad"></i></template>
            <template #label>{{ i18n.ts.personNotWelcome }}</template>
            <FormTextarea v-model="personNotWelcome" class="_formBlock">
                <template #label>{{ i18n.ts.personNotWelcomeAlt }}</template>
                <template #caption>{{ i18n.ts.personNotWelcomeDescription }}</template>
            </FormTextarea>
            <MkButton primary :disabled="!personNotWelcomeChanged" class="_formBlock" @click="savePersonNotWelcome()">
                <i class="ti ti-device-floppy"></i> {{ i18n.ts.save }}
            </MkButton>
        </FormFolder>
    </div>
</MkSpacer>
</template>

<script lang="ts" setup>
import { computed, ref ,watch } from "vue";
import MkPagination from "@/components/MkPagination.vue";
import MkTab from "@/components/MkTab.vue";
import FormFolder from "@/components/form/folder.vue";
import FormInfo from "@/components/MkInfo.vue";
import FormLink from "@/components/form/link.vue";
import { userPage } from "@/filters/user";
import * as os from "@/os";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import MkButton from "@/components/MkButton.vue";
import FormTextarea from "@/components/form/textarea.vue";
import { defaultStore } from "@/store";
import number from "@/filters/number";
import FormSwitch from "@/components/form/switch.vue";
import MkInfo from "@/components/MkInfo.vue";
import MkKeyValue from "@/components/MkKeyValue.vue";
import { $i } from "@/account";

let wordsTab = $ref("soft");
let usersTab = $ref("mute");

const streamModeEnabled = ref(defaultStore.state.streamModeEnabled);

// ワードミュート
const render = (mutedWords) => mutedWords.map(x => {
    if (Array.isArray(x)) {
        return x.join(" ");
    } else {
        return x;
    }
}).join("\n");

const softMutedWords = ref(render(defaultStore.state.mutedWords));
const hardMutedWords = ref(render($i!.mutedWords));
const showMessageOnMuted = computed(defaultStore.makeGetterSetter("showMessageOnMuted"));
const hardWordMutedNotesCount = ref(null);

// リアクションミュート
const mutedReactions = ref(defaultStore.state.mutedReactions.join("\n"));

// インスタンスミュート
const instanceMutes = ref($i!.mutedInstances.join("\n"));

// 好ましくない人物
const personNotWelcome = ref(defaultStore.state.personNotWelcome.join("\n"));

// ユーザーブロック
const mutingPagination = {
    endpoint: "mute/list" as const,
    limit: 10,
};
const blockingPagination = {
    endpoint: "blocking/list" as const,
    limit: 10,
};

const mutedWordsChanged = ref(false);
const mutedReactionsChanged = ref(false);
const mutedInstanceChanged = ref(false);
const personNotWelcomeChanged = ref(false);

const headerActions = $computed(() => []);
const headerTabs = $computed(() => []);

os.api("i/get-word-muted-notes-count", {}).then(response => {
    hardWordMutedNotesCount.value = response?.count;
});

definePageMetadata({
    title: i18n.ts.muteAndBlock,
    icon: "ti ti-ban",
});

async function saveMutedWords() {
    const parseMutes = (mutes, tab) => {
        // split into lines, remove empty lines and unnecessary whitespace
        let lines = mutes.trim().split("\n").map(line => line.trim()).filter(line => line !== "");

        // check each line if it is a RegExp or not
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const regexp = line.match(/^\/(.+)\/(.*)$/);
            if (regexp) {
                // check that the RegExp is valid
                try {
                    new RegExp(regexp[1], regexp[2]);
                    // note that regex lines will not be split by spaces!
                } catch (err: any) {
                    // invalid syntax: do not save, do not reset changed flag
                    os.alert({
                        type: "error",
                        title: i18n.ts.regexpError,
                        text: i18n.t("regexpErrorDescription", { tab, line: i + 1 }) + "\n" + err.toString(),
                    });
                    // re-throw error so these invalid settings are not saved
                    throw err;
                }
            } else {
                lines[i] = line.split(" ");
            }
        }

        return lines;
    };

    let softMutes, hardMutes;
    try {
        softMutes = parseMutes(softMutedWords.value, i18n.ts._wordMute.soft);
        hardMutes = parseMutes(hardMutedWords.value, i18n.ts._wordMute.hard);
    } catch (err) {
        // already displayed error message in parseMutes
        return;
    }

    mutedWordsChanged.value = false;
    defaultStore.set("mutedWords", softMutes);
    await os.api("i/update", {
        mutedWords: hardMutes,
    });
}

async function saveMutedReactions() {
    let mutes = mutedReactions.value
		.trim().split("\n")
		.map(el => el.trim())
		.filter(el => el);

    mutedReactionsChanged.value = false;
    defaultStore.set("mutedReactions", mutes);
}

async function saveMutedInstance() {
    let mutes = instanceMutes.value
      .trim().split("\n")
      .map(el => el.trim())
      .filter(el => el);

    await os.api("i/update", {
        mutedInstances: mutes,
    });

    mutedInstanceChanged.value = false;
    instanceMutes.value = mutes.join("\n");
}

async function savePersonNotWelcome() {
    let mutes = personNotWelcome.value
        .trim().split("\n")
        .map(el => el.trim())
        .filter(el => el);

    personNotWelcomeChanged.value = false;
    defaultStore.set("personNotWelcome", mutes);
}

watch(softMutedWords, () => {
    mutedWordsChanged.value = true;
});

watch(hardMutedWords, () => {
    mutedWordsChanged.value = true;
});

watch(mutedReactions, () => {
    mutedReactionsChanged.value = true;
});

watch(instanceMutes, () => {
    mutedInstanceChanged.value = true;
});

watch(personNotWelcome, () => {
    personNotWelcomeChanged.value = true;
});
</script>

<style>
.clock-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
