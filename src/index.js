import "dotenv/config"
import logger from "./logger";
import client from "./bot";
import axios from "axios";
import {getUserAgent} from "./utility";
import sequelize from "./sequelize";
import {startTimeout} from "./auto/spoopy";
import { registerFont } from 'canvas';

// models here, they have to be imported to be sync-able
import Wallet from "./orm/identity/Wallet";
import GuildTag from "./orm/settings/GuildTag";

registerFont('./assets/fonts/Roboto.ttf', { family: 'Roboto' });

axios.defaults.headers.common['User-Agent'] = getUserAgent();

(async () => {
    try {
        await sequelize.authenticate();
        client.login(process.env.DISCORD_TOKEN)
        await sequelize.sync();

        startTimeout();
    } catch (e) {
        console.log(e);
        logger.error(e);
    }
})();