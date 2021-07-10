module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: type.STRING,
        lastname: type.STRING,
        email: type.STRING,
        phoneNo: type.STRING,
        password: type.STRING,
        mob_token: type.STRING,
        image: type.STRING,
        status: type.BOOLEAN,
    })
}