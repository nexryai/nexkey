export function checkReactionMute(reaction: string, mutedReactions: Array<string | string[]>) {
	console.log(reaction)
	console.log(mutedReactions)
	return mutedReactions.some(item => {
		if (Array.isArray(item)) {
			return item.includes(reaction);
		} else {
			return item === reaction;
		}
	});
}
