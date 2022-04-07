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

module.exports = log;