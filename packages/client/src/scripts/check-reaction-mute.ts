export function checkReactionMute(reaction: string, mutedReactions: Array<string | string[]>) {
	return mutedReactions.some(item => {
		if (Array.isArray(item)) {
			return item.includes(reaction);
		} else {
			return item === reaction;
		}
	});
}
