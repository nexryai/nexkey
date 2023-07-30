package endpoints

import (
	"git.sda1.net/nexryai/nexkey/core"
	endpoints "git.sda1.net/nexryai/nexkey/endpoints/stream"
	"github.com/fasthttp/router"
	"github.com/valyala/fasthttp"
)

func CreateServer() {
	core.MsgInfo("Starting http server...")

	r := router.New()
	r.GET("/ws", endpoints.StreamHundler)

	if err := fasthttp.ListenAndServe(":8080", r.Handler); err != nil {
		panic(err)
	}
}
