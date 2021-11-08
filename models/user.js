module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: type.STRING,
        lastname: type.STRING,
        username: type.STRING,
        email: type.STRING,
        phoneNo: type.STRING,
        gender: type.STRING,
        dateofbirth: type.STRING,
        password: type.STRING,
        mob_token: type.STRING,
        image: type.STRING,
        countrycode: type.STRING,
        google: type.STRING,
        status: type.BOOLEAN,
    })
}