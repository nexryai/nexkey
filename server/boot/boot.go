package boot

import (
	"fmt"
	"git.sda1.net/nexryai/nexkey/core"
	"git.sda1.net/nexryai/nexkey/daemons"
	"git.sda1.net/nexryai/nexkey/services"
)

func greeting() {
	fmt.Println("                 _              \n",
		" _ __   _____  _| | _____ _   _ \n",
		" | '_ \\ / _ \\ \\/ / |/ / _ \\ | | |\n",
		" | | | |  __/>  <|   <  __/ |_| |\n",
		" |_| |_|\\___/_/\\_\\_|\\_\\___|\\__, |\n",
		"                           |___/ \n")
}

// すべてのはじまり
func Boot() {
	greeting()
	core.MsgInfo("Starting Nexkey Server...")

	// Node部分を起動させる
	go func() {
		daemons.StartMisskeyServer()
	}()

	// Goの部分を起動させる
	services.CreateServer()

	select {}
}
