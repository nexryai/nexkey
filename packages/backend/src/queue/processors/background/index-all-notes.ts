
import { MoreThan } from "typeorm";
import { Notes } from "@/models/index.js";
import { index } from "@/services/note/create.js";
import { Note } from "@/models/entities/note.js";
import { queueLogger } from "../../logger.js";
import type Bull from "bull";

const logger = queueLogger.createSubLogger("index-all-notes");

export default async function indexAllNotes(
    job: Bull.Job<Record<string, unknown>>,
    done: ()=>void,
): Promise<void> {
    logger.info("Indexing all notes...");

    let cursor: string|null = job.data.cursor as string ?? null;
    let indexedCount: number = job.data.indexedCount as number ?? 0;
    let total: number = job.data.total as number ?? 0;

    let running = true;
    const take = 50000;
    const batch = 100;
    while (running) {
        logger.info(`Querying for ${take} notes ${indexedCount}/${total ? total : "?"} at ${cursor}`);

        let notes: Note[] = [];
        try {
            notes = await Notes.find({
                where: {
                    ...(cursor ? { id: MoreThan(cursor) } : {}),
                },
                take: take,
                order: {
                    id: 1,
                },
            });
        } catch (e) {
            logger.error(`Failed to query notes ${e}`);
            continue;
        }

        if (notes.length === 0) {
            job.progress(100);
            running = false;
            break;
        }

        try {
            const count = await Notes.count();
            total = count;
            job.update({ indexedCount, cursor, total });
        } catch (e) {
        }

        for (let i = 0; i < notes.length; i += batch) {
            const chunk = notes.slice(i, i + batch);
            await Promise.all(chunk.map(note => index(note)));

            indexedCount += chunk.length;
            const pct = (indexedCount / total) * 100;
            job.update({ indexedCount, cursor, total });
            job.progress(+(pct.toFixed(1)));
            logger.info(`Indexed notes ${indexedCount}/${total ? total : "?"}`);
        }
        cursor = notes[notes.length - 1].id;
        job.update({ indexedCount, cursor, total });

        if (notes.length < take) {
            running = false;
        }
    }

    done();
    logger.info("All notes have been indexed.");
}
