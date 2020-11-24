import {Model, DataTypes} from "sequelize";
import connection from "../../sequelize";

class GuildTag extends Model {}
GuildTag.init({
    guildId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'settings__GuildTag',
    tableName: 'settings__GuildTag'
});

export default GuildTag;
export const TAG_SPOOPY = 'spoopy';
export const TAG_WINTER = 'winter';

const allowedTags = [
    TAG_SPOOPY,
    TAG_WINTER
];
export {allowedTags};