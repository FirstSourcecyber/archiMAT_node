module.exports = (sequelize, type) => {
    return sequelize.define('material_type', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: type.STRING,
    })
}