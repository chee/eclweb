importScripts("/node_modules/xterm-pty/workerTools.js");
onmessage = (msg) => {
	importScripts(location.origin + "/ecl.js");
	emscriptenHack(new TtyClient(msg.data));
};
