const Sequelize = require('sequelize');

// const AdminModel = require('./models/admin');
// const UserModel = require('./models/user');
const CategoryModel = require('./models/categories');
const SubCategoryModel = require('./models/subCategories');
const UserModel = require('./models/user');
const RoleModel = require('./models/role');
const CompanyModel = require('./models/company');
const ShopModel = require('./models/shop');
const ShopTypeModel = require('./models/shop_type');
const SocialLinkModel = require('./models/sociallinks');
const ProductModel = require('./models/product');
const ColorModel = require('./models/color');
const ImagesModel = require('./models/images');
const MaterialTypeModel = require('./models/material_type');
const CompanytypeModel = require('./models/company_type');
const shopTimeModel = require('./models/shoptiming');

const sequelize = new Sequelize('archimat', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
   
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// const sequelize = new Sequelize('archimat', 'root', 'Ali@12345', {
//   host: 'localhost',
//   dialect: 'mysql',
//   // dialectOptions: {
//   //     charset: "utf8mb4",
//   //     // collate: "utf8mb4_unicode_ci",
//   //     supportBigNumbers: true,
//   //     bigNumberStrings: true
//   // },
//   pool: {
//       max: 10,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//   }
// });

const category = CategoryModel(sequelize, Sequelize);
const subcategory = SubCategoryModel(sequelize, Sequelize);
const role = RoleModel(sequelize, Sequelize);
const user = UserModel(sequelize, Sequelize);
const company = CompanyModel(sequelize, Sequelize);
const shop = ShopModel(sequelize, Sequelize);
const stype = ShopTypeModel(sequelize, Sequelize);
const sociallink = SocialLinkModel(sequelize, Sequelize);
const product = ProductModel(sequelize, Sequelize);
const color = ColorModel(sequelize, Sequelize);
const images = ImagesModel(sequelize, Sequelize);
const materialtype = MaterialTypeModel(sequelize, Sequelize);
const comp_type = CompanytypeModel(sequelize, Sequelize);
const shoptime = shopTimeModel(sequelize, Sequelize);


// admin and user
// admin.belongsTo(user);
// user.hasMany(admin, {foreignKey: 'userId', sourceKey: 'id'});

//role and user
user.belongsTo(role);
role.hasMany(user, {foreignKey: 'roleId', sourceKey: 'id'});

//category and subcategory
subcategory.belongsTo(category);
category.hasMany(subcategory, {foreignKey: 'categoryId', sourceKey: 'id'});

//product and shop
product.belongsTo(shop);
shop.hasMany(product, {foreignKey: 'shopId', sourceKey: 'id'});

//product and color
product.belongsTo(color);
color.hasMany(product, {foreignKey: 'colorId', sourceKey: 'id'});

//product and materialtype
product.belongsTo(materialtype);
// materialtype.hasMany(product, {foreignKey: 'mattypeId', sourceKey: 'id'});

//product and category
product.belongsTo(category);
category.hasMany(product, {foreignKey: 'categoryId', sourceKey: 'id'});
//product and subcategory
product.belongsTo(subcategory);
subcategory.hasMany(product, {foreignKey: 'subcategoryId', sourceKey: 'id'});
//product and images
images.belongsTo(product);
product.hasMany(images, {foreignKey: 'productId', sourceKey: 'id'});
//product and images
product.belongsTo(user);
user.hasMany(product, {foreignKey: 'userId', sourceKey: 'id'});

//company and user
company.belongsTo(comp_type);
// comp_type.hasMany(company, {foreignKey: 'comp_typeId', sourceKey: 'id'});
//company and type
company.belongsTo(user);
user.hasMany(company, {foreignKey: 'userId', sourceKey: 'id'});

//shop and shoptype
shop.belongsTo(stype);
// stype.hasMany(shop, {foreignKey: 'stypeId', sourceKey: 'id'});

//shop and user
shop.belongsTo(user);
user.hasMany(shop, {foreignKey: 'userId', sourceKey: 'id'});

shoptime.belongsTo(shop);
shop.hasMany(shoptime, {foreignKey: 'shopId', sourceKey: 'id'});

shop.belongsTo(company);
company.hasMany(shop, {foreignKey: 'companyId', sourceKey: 'id'});
// //shop and social link
// sociallink.belongsTo(shop);
// shop.hasMany(sociallink, {foreignKey: 'shopId', sourceKey: 'id'});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

// sequelize.sync({ alter: true})
//     .then(() => {
//         console.log(`Database & tables created!`)
//     }); 

module.exports = {
    category,
    subcategory,
    user,
    role,
    company,
    shop,
    stype,
    sociallink,
    product,
    color,
    materialtype,
    images,
    comp_type,
    shoptime
};
