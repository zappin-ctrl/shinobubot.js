import {Sequelize} from "sequelize";
import {sequelizeLogger} from "./logger";

const connection = new Sequelize(process.env.SEQUELIZE_DSN, {
    logging: msg => sequelizeLogger.info(msg)
});
export default connection;