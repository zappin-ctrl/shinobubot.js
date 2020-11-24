import {randomBetween} from "../utility";

export default class RandomTimeout {
    constructor(min, max, call, multiplier = 1) {
        this.min = min;
        this.max = max;
        this.multiplier = multiplier;

        this.call = call.bind(this);
        this.timeout = null;
    }

    start() {
        if (null !== this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(this.wrapped.bind(this), this.multiplier * randomBetween(this.min, this.max));
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