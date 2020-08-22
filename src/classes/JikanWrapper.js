import axios from "axios";
import RateLimit, {RateSetting} from "./RateLimit";

const API_URL = 'https://api.jikan.moe/v3';

const ENDPOINT_ANIME_LOOKUP = '/anime/$1';
const ENDPOINT_ANIME_SEARCH = '/search/anime?q=$1&page=$2';

const limits = new RateLimit([
    new RateSetting(2, 1000),
    new RateSetting(30, 60000, true)
]);

const simpleRequestCache = {};

export default class JikanWrapper {
    checkCache(url) {
        const allowedMaxTime = new Date().getTime() - (60 * 1000 * 24);
        if (url in simpleRequestCache) {
            if (simpleRequestCache[url].ms > allowedMaxTime) {
                return simpleRequestCache[url].data;
            } else {
                delete simpleRequestCache[url];
            }
        }

        return null;
    }

    addCache(url, data) {
        simpleRequestCache[url] = {
            ms: new Date().getTime(),
            data: data
        };
    }

    async handleByUrl(url) {
        const cache = this.checkCache(url);
        if (null !== cache) {
            return cache;
        }

        await limits.wait();
        try {
            const response = await axios.get(url);
            this.addCache(url, response.data);
            return response.data;
        } catch (e) {
            throw new Error("An error occurred while fetching resource");
        }
    }

    async animeSearch(query, page = 1) {
        query = query.trim();
        if (query.length <= 2) {
            throw new Error("Query is not long enough")
        }
        return this.handleByUrl(API_URL + ENDPOINT_ANIME_SEARCH.replace('$1', query).replace('$2', page));
    }

    async animeLookup(id) {
        return this.handleByUrl(API_URL + ENDPOINT_ANIME_LOOKUP.replace('$1', id));
    }
}