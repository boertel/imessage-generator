import { env } from '$env/dynamic/private';

async function run(model, input) {
	const response = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/e0e9d48f44d0812474914302f853a49a/ai/run/${model}`,
		{
			headers: { Authorization: `Bearer ${env.CF_AI_API_TOKEN}` },
			method: 'POST',
			body: JSON.stringify(input)
		}
	);
	const result = await response.json();
	return result;
}

export async function completion(text: string) {
	const prompt = `
Schemas you must use:
	Property:
		- type of property: single family, condo, townhouse, etc. (required)
		- an address (required)
		- number of bedrooms (required)
		- number of bathrooms (required)
		- price (required)
		- year built
		- garage
		- other amenities
		- photos
		- videos
		- square footage
		- lot size (if applicable)
		- description of the property
		- description of the neighborhood
	Open House:
		- date and time (required)

Tasks you are able to perform:
	1. Create a property listing
  2. Create an open house event
	3. Create a property flyer

Instructions:
	1. You must not include or generate attributes that are not provided from the user's request.
	2. If the user's request does not include the required attributes, you must ask for them.

Following the instructions defined above, answer the Real Estate Agent in a succint matter to their request: "${text}".
The output must be text and new lines only.
`;
	const response = await run('@cf/meta/llama-2-7b-chat-int8', {
		messages: [
			{
				role: 'system',
				content: 'You are a friendly assistant that helps create Real Estate marketing content.'
			},
			{
				role: 'user',
				content: prompt
			}
		]
	});

	if (response.success) {
		const reply = response.result.response;
		return reply.replace(/(?:\r\n|\r|\n)/g, '<br />');
	} else {
		console.error(response.errors);
		throw new Error('AI failed');
	}
}
