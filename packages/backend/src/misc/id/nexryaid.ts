// nexryaid
// nexryaiからランダムで並べ替え(重複あり)+unixtime+適当にゃ数字で作るid 
// ex) neryax1699364743467
import * as crypto from "node:crypto";

const nexryaiArray = ["n","e","x","r","y","a","i"];

function getRandomNexryai() {
	return nexryaiArray.sort(() => Math.random() - 0.5).join("");
}

function getRandInt() {
	const buff = crypto.randomBytes(1);
	return parseInt(buff.toString("hex"), 16);
}

export function genNexryaid(date: Date): string {
	const nexryai = getRandomNexryai();
	const unixtime = Math.floor(date.getTime() / 1000 );
	const randInt = getRandInt();

	if (isNaN(unixtime)) throw "Failed to create nexryaid: Invalid Date";

	return `${nexryai}${unixtime}${randInt}`;
}

