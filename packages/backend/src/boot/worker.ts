import cluster from 'node:cluster';
import { initDb } from '../db/postgre.js';
import { envOption } from '../env.js';

/**
 * Init worker process
 */
export async function workerMain() {
	await initDb();

	// start server
	if (!envOption.onlyQueue) {
		await import('../server/index.js').then(x => x.default());
	}

	// start job queue
	if (!envOption.onlyServer) {
		import('../queue/index.js').then(x => x.default());
	}	

	if (cluster.isWorker) {
		// Send a 'ready' message to parent process
		process.send!('ready');
	}
}
