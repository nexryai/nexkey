package core

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

var reset = "\033[0m"
var red = "\033[31m"
var green = "\033[32m"
var yellow = "\033[33m"
var gray = "\033[37m"

func IsDebugMode() bool {
	return os.Getenv("DEBUG_MODE") == "1"
}

func MsgInfo(text string) {
	fmt.Println(green + "✔ INFO: " + reset + text)
}

func MsgErr(text string) {
	fmt.Fprintln(os.Stderr, red+"✘ ERROR: "+text+reset)
}

func MsgWarn(text string) {
	fmt.Println(yellow + "⚠ WARNING: " + reset + text)
}

func MsgDebug(text string) {
	if IsDebugMode() {
		fmt.Println(gray + "⚙ DEBUG: " + text + reset)
	}
}

func MsgDetail(text string) {
	fmt.Println(gray + "  ↳ " + reset + text)
}

func ExitOnError(err error, message string) {
	if err != nil {
		errorInfo := fmt.Sprintf("Fatal error: %v", err)
		MsgErr(errorInfo)
		MsgDetail(message)
		os.Exit(1)
	}

	return
}

func MsgErrWithDetail(err error, message string) {
	if err != nil {
		errorInfo := fmt.Sprintf("Fatal error: %s", message)
		MsgErr(errorInfo)
		MsgDetail(fmt.Sprintf("%v", err))
	}
}

func ExecSystemCommand(command string, args []string) {
	cmd := exec.Command(command, args...)

	stderr, err := cmd.CombinedOutput()

	ExitOnError(err, fmt.Sprintf("Failed to exec.　| \"%s\" >>> %s",
		strings.Join(cmd.Args, " "),
		string(stderr)))

}
