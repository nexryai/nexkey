import { createIndexAllNotesJob } from "@/queue/index.js";
import define from "../../../define.js";

export const meta = {
	tags: ["admin"],

	requireCredential: true,
	requireModerator: true,
} as const;

export const paramDef = {
	type: "object",
	properties: {
		cursor: {
			type: "string",
			format: "misskey:id",
			nullable: true,
			default: null,
		},
	},
	required: [],
} as const;

export default define(meta, paramDef, async (ps, _me) => {
	createIndexAllNotesJob({
		cursor: ps.cursor ?? undefined,
	});
});
