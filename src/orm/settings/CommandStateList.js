import {Model, DataTypes} from "sequelize";
import connection from "../../sequelize";

export const MODEL = 'settings__CommandStateList';

class CommandStateList extends Model {}
CommandStateList.init({
    guildId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    channelId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isWhitelist: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    command: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: MODEL,
    tableName: MODEL
});

export default CommandStateList;