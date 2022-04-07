class log {
    // debug
    debug = false;

    constructor(debug) {
        this.debug = debug
    }

    info(msgs = []) {
        if (this.debug) {
            console.log(...msgs);
        }
    }
}

(function (msgs) {
    var log = new log(true)
    log.info(msgs)
})( msgs);