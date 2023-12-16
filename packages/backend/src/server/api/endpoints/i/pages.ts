import { Pages } from "@/models/index.js";
import define from "../../define.js";
import { makePaginationQuery } from "../../common/make-pagination-query.js";

export const meta = {
    tags: ["account", "pages"],

    requireCredential: true,

    kind: "read:pages",

    res: {
        type: "array",
        optional: false, nullable: false,
        items: {
            type: "object",
            optional: false, nullable: false,
            ref: "Page",
        },
    },
} as const;

export const paramDef = {
    type: "object",
    properties: {
        limit: { type: "integer", minimum: 1, maximum: 100, default: 10 },
        sinceId: { type: "string", format: "misskey:id" },
        untilId: { type: "string", format: "misskey:id" },
    },
    required: [],
} as const;

// eslint-disable-next-line import/no-default-export
export default define(meta, paramDef, async (ps, user) => {
    const query = makePaginationQuery(Pages.createQueryBuilder("page"), ps.sinceId, ps.untilId)
		.andWhere("page.userId = :meId", { meId: user.id });

    const pages = await query
		.take(ps.limit)
		.getMany();

    return await Pages.packMany(pages);
});
