module.exports = (sequelize, type) => {
    return sequelize.define('like', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      
    })
}