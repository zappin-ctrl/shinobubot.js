import {randomBetween} from "../utility";

export default class RandomTimeout {
    constructor(min, max, call) {
        this.min = min;
        this.max = max;

        this.call = call;
        this.timeout = null;
    }

    start() {
        if (null !== this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(this.wrapped, randomBetween(this.min, this.max));
    }

    stop() {
        if (null !== this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = null;
    }

    wrapped() {
        this.call();
        this.timeout = null;

        this.start();
    }
}