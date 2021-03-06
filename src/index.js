import "dotenv/config"
import logger from "./logger";
import client from "./bot";
import axios from "axios";
import {getUserAgent} from "./utility";
import sequelize from "./sequelize";
import {registerFont} from 'canvas';
import autoRun from "./auto/init"

// models here, they have to be imported to be sync-able
import Wallet from "./orm/identity/Wallet";
import TransferLog from "./orm/identity/TransferLog";
import GuildTag from "./orm/settings/GuildTag";
import CommandStateList from "./orm/settings/CommandStateList";

registerFont('./assets/fonts/Roboto.ttf', { family: 'Roboto' });

axios.defaults.headers.common['User-Agent'] = getUserAgent();

(async () => {
    try {
        await sequelize.authenticate();
        client.login(process.env.DISCORD_TOKEN);
        await sequelize.sync();
        autoRun();
    } catch (e) {
        console.log(e);
        logger.error(e);
    }
})();