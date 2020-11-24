import RandomTimeout from "../classes/RandomTimeout";
import {tryClaim, run} from "./winter";

export default () => {
    (new RandomTimeout(60 * 8, 60 * 16, run, 1000)).start();
};

export const tryActionMessage = async (message) => {
    await tryClaim(message);
};