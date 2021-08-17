module.exports = (sequelize, type) => {
    return sequelize.define('fallow', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    })
}