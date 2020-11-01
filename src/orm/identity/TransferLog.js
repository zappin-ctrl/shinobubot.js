import {Model, DataTypes} from "sequelize";
import connection from "../../sequelize";

class TransferLog extends Model {}
TransferLog.init({
    sender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    receiver: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'identity__TransferLog',
    tableName: 'identity__TransferLog'
});

export default TransferLog;
