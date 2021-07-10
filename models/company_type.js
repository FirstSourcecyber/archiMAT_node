module.exports = (sequelize, type) => {
    return sequelize.define('comp_type', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        image: type.STRING,
    })
}