export function checkPersonNotWelcome(checkUser: string, mutedUsers: Array<string | string[]>) {
    return mutedUsers.some(item => {
        if (Array.isArray(item)) {
            return item.includes(checkUser);
        } else {
            return item === checkUser;
        }
    });
}
