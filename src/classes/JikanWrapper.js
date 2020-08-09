import axios from "axios";
import {Mutex} from "async-mutex";
import moment from "moment";
import {sleep} from "../utility";

const API_URL = 'https://api.jikan.moe/v3';

const ENDPOINT_ANIME_LOOKUP = '/anime/';
const ENDPOINT_ANIME_SEARCH = '/search/anime?q=$1&page=$2';

let minute = [];
let second = [];
let cache = {};

const mutex = new Mutex();

function calcTtl(date) {
    return new Date() < date;
}

async function isAllowedToCall() {
    if (minute.length > 30) {

    }

    if (second.length > 1) {
        if (moment().format() === moment(second[0]).format()) {
            await sleep(1000);
        }

        second = [];
        return true;
    }
}

export default class JikanWrapper {
    async animeSearch(query, page = 1) {
        const url = API_URL + ENDPOINT_ANIME_SEARCH.replace('$1', query).replace('$2', page);
        if (url in cache) {
            if (calcTtl(cache[url].ttl)) {
                return cache[url].data;
            }
        }


    }
}