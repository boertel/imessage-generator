declare global {
	namespace App {
		interface Platform {
			env?: {
				CF_AI_API_TOKEN: string;
			};
		}
	}
}

export {};
