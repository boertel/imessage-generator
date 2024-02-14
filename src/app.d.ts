declare global {
	namespace App {
		interface Platform {
			env: {
				CF_AI_API_TOKEN: string;
				D1: D1Namespace;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
