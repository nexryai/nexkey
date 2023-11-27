import cluster from "node:cluster";
import config from "@/config/index.js";
import { initDb } from "../db/postgre.js";

/**
 * Init worker process
 */
export async function workerMain() {
    await initDb();

    if (!config.onlyQueueProcessor) {
        // start server
        await import("../server/index.js").then((x) => x.default());
    }

    if (!config.disableQueueProcessor) {
        // start job queue
        import("../queue/index.js").then(x => x.default());
    }

    if (cluster.isWorker) {
		// Send a 'ready' message to parent process
		process.send!("ready");
    }
}
