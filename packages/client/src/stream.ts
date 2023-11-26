import * as Misskey from "misskey-js";
import { markRaw } from "vue";
import { $i } from "@/account";
import { url } from "@/config";

export const stream = markRaw(new Misskey.Stream(url, $i ? {
	token: $i.token,
} : null));

export let isReloading = false;

export function reloadStream() {
	isReloading = true;

	stream.close();
	stream.once("_connected_", () => isReloading = false);
	stream.stream.reconnect();

	return stream;
}
