import {Model, DataTypes} from "sequelize";
import connection from "../../sequelize";

class Wallet extends Model {}
Wallet.init({
    discordId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize: connection,
    modelName: 'identity__Wallet',
    tableName: 'identity__Wallet'
});

export default Wallet;
