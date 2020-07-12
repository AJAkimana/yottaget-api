export default (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'Payment',
    {
      amount: DataTypes.FLOAT,
    },
    { tableName: 'payments' }
  );
  Payment.associate = (models) => {
    // associations can be defined here
    Payment.belongsTo(models.House, {
      as: 'house',
      foreignKey: 'houseId',
    });
    Payment.belongsTo(models.User, {
      as: 'tenant',
      foreignKey: 'userId',
    });
  };
  return Payment;
};
