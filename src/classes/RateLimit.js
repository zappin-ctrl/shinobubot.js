export class RateLimitError extends Error {
    limitInterval = null;

    constructor(limitInterval, message) {
        super(message);
        this.limitInterval = limitInterval;
    }
}

export class RateSetting {
    available = 0;
    interval = 0;
    throwOnLimit = false;

    constructor(available = 0, interval = 0, throwOnLimit = false) {
        this.available = available;
        this.interval = interval;
        this.throwOnLimit = throwOnLimit;
    }
}

export default class RateLimit {
    storage = []
    options = [];

    timers = {};

    constructor(options = []) {
        for (let o of options) {
            this.addOption(o);
        }
    }

    addOption(option) {
        if (!(option instanceof RateSetting)) {
            throw new Error("You need to specify an object of RateSetting as a parameter");
        }

        if (this.options.length === 0) {
            this.options.push(option);
        } else {
            for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].interval > option.interval) {
                    this.options.splice(Math.max(0, i-1), 0, option);
                    break;
                } else if (this.options.length === i + 1) {
                    this.options.push(option);
                    break;
                }
            }
        }
    }

    async wait(cost = 1) {
        const reversed = this.options.reverse();
        for (let i = 0; i < reversed.length; i++) {
            const el = reversed[i];
            if (this.checkLast(el.interval, i + 1 === reversed.length) >= el.available) {
                if (el.throwOnLimit) {
                    throw new RateLimitError(el, "Hit specified limit");
                } else {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(this.wait(cost));
                        }, 200);
                    });
                }
            }
        }

        const time = this.getMilliseconds();
        this.timers[time.toString()] = time;
    }

    checkLast(interval, deleteOnLower = false) {
        const maxAllowedTime = this.getMilliseconds() - interval;
        let count = 0;
        const keysToDelete = [];
        for (let key in this.timers) {
            if (this.timers[key] > maxAllowedTime) {
                count++;
            } else if (deleteOnLower) {
                keysToDelete.push(key);
            }
        }

        for (let key in keysToDelete) {
            delete this.timers[key];
        }

        return count;
    }

    getMilliseconds() {
        if (typeof process !== 'undefined' && process.hrtime) {
            const hrtime = process.hrtime();
            const seconds = hrtime[0];
            const nanoseconds = hrtime[1];

            return seconds * 1e3 +  Math.floor(nanoseconds / 1e6);
        }

        return new Date().getTime();
    }
}
