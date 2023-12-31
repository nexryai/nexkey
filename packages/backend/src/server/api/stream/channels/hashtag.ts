import { Notes } from "@/models/index.js";
import { normalizeForSearch } from "@/misc/normalize-for-search.js";
import { isUserRelated } from "@/misc/is-user-related.js";
import { Packed } from "@/misc/schema.js";
import Channel from "../channel.js";

export default class extends Channel {
    public readonly chName = "hashtag";
    public static shouldShare = false;
    public static requireCredential = false;
    private q: string[][];

    constructor(id: string, connection: Channel["connection"]) {
        super(id, connection);
        this.onNote = this.onNote.bind(this);
    }

    public async init(params: any) {
        this.q = params.q;

        if (this.q == null) return;

        // Subscribe stream
        this.subscriber.on("notesStream", this.onNote);
    }

    private async onNote(note: Packed<"Note">) {
        const noteTags = note.tags ? note.tags.map((t: string) => t.toLowerCase()) : [];
        const matched = this.q.some(tags => tags.every(tag => noteTags.includes(normalizeForSearch(tag))));
        if (!matched) return;

        // Renoteなら再pack
        if (note.renoteId != null) {
            note.renote = await Notes.pack(note.renoteId, this.user, {
                detail: true,
            });
        }

        // 流れてきたNoteがミュートしているユーザーが関わるものだったら無視する
        if (isUserRelated(note, this.muting)) return;
        // 流れてきたNoteがブロックされているユーザーが関わるものだったら無視する
        if (isUserRelated(note, this.blocking)) return;
        // リノートミュートされてたら無視
        if (note.renote && !note.text && isUserRelated(note, this.renoteMuting)) return;

        this.connection.cacheNote(note);

        this.send("note", note);
    }

    public dispose() {
        // Unsubscribe events
        this.subscriber.off("notesStream", this.onNote);
    }
}
