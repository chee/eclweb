onmessage = message => {
	self.Module = {
		print(text) {
			self.postMessage({type: "output", text})
		},
	}
	importScripts(location.origin + "/ecl.js")
	let sharedbuffer = message.data
	let wait = new Int32Array(sharedbuffer, 0, 1)
	let ch = new Int32Array(sharedbuffer, 4)
	self.TTY.default_tty_ops.get_char = function () {
		wait[0] = 0
		self.postMessage({type: "input"})
		Atomics.wait(wait, 0, 0)
		let character = ch[0]
		started = true
		return character
	}
	self.TTY.stream_ops.poll = function () {
		return 5
	}
}

onerror = error => {
	console.error(error)
}
