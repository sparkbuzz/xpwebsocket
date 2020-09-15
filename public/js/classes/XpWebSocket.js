/**
 * This class handles WebSocket communication with the flight simulator.
 */
class XpWebSocket {

    constructor(url, data) {
        Config.DEBUG ? console.info('[' + this.constructor.name + '] Initializing Web Socket') : null;

        this.data = data;
        this.file_reader = new FileReader();
        this.file_reader.addEventListener("loadend", this.onLoadEnd.bind(this));

        this.initializeWebSocket(url);
    }

    initializeWebSocket(url) {
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        this.web_socket = new WebSocket(url, 'dumb-increment-protocol');

        this.web_socket.onopen = this.onOpen.bind(this);
        this.web_socket.onerror = this.onError.bind(this);
        this.web_socket.onmessage = this.onMessage.bind(this);
    }

    onLoadEnd(event) {
        this.data.raw = this.file_reader.result;
    }

    onOpen() {
        Config.DEBUG ? console.info('[' + this.constructor.name + '] Connected') : null;
        $('h4#title').css('color', 'lime');
    }

    onError() {
        $('h4#title').css('color', 'orangered');
    }

    onMessage(message) {
        if (this.file_reader.readyState != FileReader.LOADING) {
            this.file_reader.readAsArrayBuffer(message.data);
        }
    }
}