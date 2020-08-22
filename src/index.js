import "dotenv/config"
import logger from "./logger";
import client from "./bot";
import axios from "axios";
import "./http";
import {getUserAgent} from "./utility";

axios.defaults.headers.common['User-Agent'] = getUserAgent();

try {
    client.login(process.env.DISCORD_TOKEN)
} catch (e) {
    logger.error(e);
}
