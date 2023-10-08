let worker = new Worker("/io.worker.js")
let sharedbuffer = new SharedArrayBuffer(8)
let wait = new Int32Array(sharedbuffer, 0, 1)
let data = new Int32Array(sharedbuffer, 4)
let codes = string => Array.from(string + "\n", ch => ch.charCodeAt(0))
let buffer = codes(`"hello, world :>"`)

async function get_char() {
	if (buffer.length) {
		return buffer.shift()
	} else {
		return new Promise(yay => {
			button.addEventListener(
				"click",
				() => {
					buffer = codes(`(format nil "~R" ${number.value})`)
					yay(buffer.shift())
				},
				{once: true}
			)
		})
	}
}
worker.onmessage = async function ({data: message}) {
	if (message.type == "input") {
		data.set([await get_char()], 0)
		Atomics.store(wait, 0, 1)
		Atomics.notify(wait, 0)
	} else if (message.type == "output" || message.type == "error") {
		output.textContent += "\n" + message.text
	}
}
worker.postMessage(sharedbuffer)
