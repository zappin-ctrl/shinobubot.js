import "dotenv/config"
import logger from "./logger";
import client from "./bot";
import "./http";

try {
    client.login(process.env.DISCORD_TOKEN)
} catch (e) {
    logger.error(e);
}
