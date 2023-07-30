package core

import (
	"fmt"
	"os/exec"
)

func ExecDaemonCommand(command string, args []string) error {
	// コマンドを実行するための準備
	cmd := exec.Command(command, args...)

	// 標準出力と標準エラー出力のパイプを設定
	cmd.Stdout = newPipedWriter("node_server: ")
	cmd.Stderr = newPipedWriter("node_server: ")

	// コマンドを非同期で実行
	if err := cmd.Run(); err != nil {
		MsgErrWithDetail(err, "failed to exec daemon command!")
	}

	return nil
}

func newPipedWriter(prefix string) *pipedWriter {
	return &pipedWriter{
		prefix: prefix,
	}
}

type pipedWriter struct {
	prefix string
}

func (pw *pipedWriter) Write(p []byte) (n int, err error) {
	// prefixを付加してコンソールに出力
	fmt.Print(pw.prefix)
	return fmt.Print(string(p))
}
