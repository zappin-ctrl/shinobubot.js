import {getRandomInt} from "../utility";
import _ from "lodash";

export default class NonRepeatingRandom {
    constructor(data) {
        this.data = data;
        this.copy = _.clone(data);
    }

    get() {
        if (_.isArray(this.data)) {
            const index = getRandomInt(0, this.copy.length);
            const val = this.copy[index];
            this.copy.splice(index, 1);

            if (!this.copy.length) {
                this.copy = this.data;
            }

            return val;
        } else if (_.isObject(this.data)) {
            const index = _.sample(Object.keys(this.copy));
            const val = this.copy[index];
            delete this.copy[index];

            if (!Object.keys(this.copy).length) {
                this.copy = _.clone(this.data);
            }

            return [index, val];
        }

        return null;
    }
}