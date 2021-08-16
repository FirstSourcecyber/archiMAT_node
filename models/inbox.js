module.exports = (sequelize, type) => {
    return sequelize.define('inbox', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message: type.STRING,
        seen: type.STRING,
        status: type.STRING
        
        

    })
}