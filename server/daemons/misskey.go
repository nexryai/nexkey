package daemons

import "git.sda1.net/nexryai/nexkey/core"

func StartMisskeyServer() {
	core.MsgInfo("Starting misskey...")
	core.ExecDaemonCommand("node", []string{"--experimental-json-modules", "../packages/backend/built/index.js"})
}
