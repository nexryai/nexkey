<template>
<XNotes ref="tlComponent"
        :no-gap="!$store.state.showGapBetweenNotesInTimeline"
        :mute-person-not-welcome="mutePersonNotWelcome"
        :pagination="pagination"
        @queue="emit('queue', $event)"
/>
</template>

<script lang="ts" setup>
import { computed, provide, onUnmounted } from "vue";
import XNotes from "@/components/MkNotes.vue";
import { stream } from "@/stream";
import * as sound from "@/scripts/sound";
import { $i } from "@/account";

const props = defineProps<{
	src: string;
	list?: string;
	antenna?: string;
	channel?: string;
	sound?: boolean;
}>();

const emit = defineEmits<{
	(ev: "note"): void;
	(ev: "queue", count: number): void;
}>();

provide("inChannel", computed(() => props.src === "channel"));

const tlComponent: InstanceType<typeof XNotes> = $ref();

const prepend = note => {
    tlComponent.pagingComponent?.prepend(note);

    emit("note");

    if (props.sound) {
        sound.play($i && (note.userId === $i.id) ? "noteMy" : "note");
    }
};

const onUserAdded = () => {
    tlComponent.pagingComponent?.reload();
};

const onUserRemoved = () => {
    tlComponent.pagingComponent?.reload();
};

const onChangeFollowing = () => {
    if (!tlComponent.pagingComponent?.backed) {
        tlComponent.pagingComponent?.reload();
    }
};

let endpoint;
let query;
let connection;
let connection2;
let mutePersonNotWelcome = true;

if (props.src === "antenna") {
    endpoint = "antennas/notes";
    mutePersonNotWelcome = false;
    query = {
        antennaId: props.antenna,
    };
    connection = stream.useChannel("antenna", {
        antennaId: props.antenna,
    });
    connection.on("note", prepend);
} else if (props.src === "home") {
    endpoint = "notes/timeline";
    connection = stream.useChannel("homeTimeline");
    connection.on("note", prepend);

    connection2 = stream.useChannel("main");
    connection2.on("follow", onChangeFollowing);
    connection2.on("unfollow", onChangeFollowing);
} else if (props.src === "local") {
    endpoint = "notes/local-timeline";
    connection = stream.useChannel("localTimeline");
    connection.on("note", prepend);
} else if (props.src === "social") {
    endpoint = "notes/hybrid-timeline";
    connection = stream.useChannel("hybridTimeline");
    connection.on("note", prepend);
} else if (props.src === "global") {
    endpoint = "notes/global-timeline";
    connection = stream.useChannel("globalTimeline");
    connection.on("note", prepend);
} else if (props.src === "mentions") {
    endpoint = "notes/mentions";
    mutePersonNotWelcome = false;
    connection = stream.useChannel("main");
    connection.on("mention", prepend);
} else if (props.src === "directs") {
    endpoint = "notes/mentions";
    mutePersonNotWelcome = false;
    query = {
        visibility: "specified",
    };
    const onNote = note => {
        if (note.visibility === "specified") {
            prepend(note);
        }
    };
    connection = stream.useChannel("main");
    connection.on("mention", onNote);
} else if (props.src === "list") {
    endpoint = "notes/user-list-timeline";
    mutePersonNotWelcome = false;
    query = {
        listId: props.list,
    };
    connection = stream.useChannel("userList", {
        listId: props.list,
    });
    connection.on("note", prepend);
    connection.on("userAdded", onUserAdded);
    connection.on("userRemoved", onUserRemoved);
}

const pagination = {
    endpoint: endpoint,
    limit: 10,
    params: query,
};

onUnmounted(() => {
    connection.dispose();
    if (connection2) connection2.dispose();
});
</script>
