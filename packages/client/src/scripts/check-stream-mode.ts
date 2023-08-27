export function checkStreamMode(note: Record<string, any>, me: Record<string, any> | null | undefined, enabled: boolean): boolean {
	if (me && (note.userId === me.id)) return false;

	if (enabled && (note.visibility === 'followers' || note.visibility === 'specified')){
		return true;
	}
	else {
		return false;
	}
}
