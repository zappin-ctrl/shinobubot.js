import _ from "lodash";

export default class RangeHelper {
    ranges = [];

    constructor(ranges = []) {
        if (!_.isEmpty(ranges)) {
            this.addRanges(ranges);
        }
    }

    addRanges(ranges) {
        for (let range of ranges) {
            this.addRange(range.from, range.to, range.value);
        }
    }

    addRange(from, to, value) {
        if (!_.isUndefined(this.getValue(from)) || !_.isUndefined(this.getValue(to))) {
            throw new Error("Ranges cannot overlap");
        }

        this.ranges.push({
            from: from,
            to: to,
            value: value
        });
    }

    getValue(count) {
        for (let range of this.ranges) {
            if (count >= range.from && count <= range.to) {
                return range.value;
            }
        }

        return undefined;
    }
};