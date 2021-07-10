module.exports = (sequelize, type) => {
    return sequelize.define('color', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: type.STRING,
    })
}