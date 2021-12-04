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
const serviceModel = require('./models/service');
const sliderModel = require('./models/homeslider');
const inboxModel = require('./models/inbox');
const fallowModel = require('./models/fallow');
const MaterialModel = require('./models/material');
const LikeModel = require('./models/like');
const CommentModel = require('./models/comment');

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
//     host: 'localhost',
//     dialect: 'mysql',
   
//     pool: {
//         max: 10,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// });

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
const service = serviceModel(sequelize, Sequelize);
const slider = sliderModel(sequelize, Sequelize);
const inbox = inboxModel(sequelize, Sequelize);
const fallow = fallowModel(sequelize, Sequelize);
const material = MaterialModel(sequelize, Sequelize);
const like = LikeModel(sequelize, Sequelize);
const comment = CommentModel(sequelize, Sequelize);




//role and user
user.belongsTo(role);
role.hasMany(user, {foreignKey: 'roleId', sourceKey: 'id'});

//user and inbox
inbox.belongsTo(user);
user.hasMany(inbox, {foreignKey: 'userId', sourceKey: 'id'});

//shop and inbox
inbox.belongsTo(shop);
shop.hasMany(inbox, {foreignKey: 'shopId', sourceKey: 'id'});

//user and inbox
fallow.belongsTo(user);
user.hasMany(fallow, {foreignKey: 'userId', sourceKey: 'id'});

//shop and inbox
fallow.belongsTo(shop);
shop.hasMany(fallow, {foreignKey: 'shopId', sourceKey: 'id'});

//category and subcategory
subcategory.belongsTo(category);
category.hasMany(subcategory, {foreignKey: 'categoryId', sourceKey: 'id'});

//product and shop
product.belongsTo(shop);
shop.hasMany(product, {foreignKey: 'shopId', sourceKey: 'id'});

service.belongsTo(shop);
shop.hasMany(service, {foreignKey: 'shopId', sourceKey: 'id'});

material.belongsTo(shop);
shop.hasMany(material, {foreignKey: 'shopId', sourceKey: 'id'});

user.belongsTo(shop);
shop.hasMany(user, {foreignKey: 'shopId', sourceKey: 'id'});

slider.belongsTo(shop);
shop.hasMany(slider, {foreignKey: 'shopId', sourceKey: 'id'});
//product and color
// product.belongsTo(color);
// color.hasMany(product, {foreignKey: 'colorId', sourceKey: 'id'});

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


//shop and shoptype
shop.belongsTo(stype);
// stype.hasMany(shop, {foreignKey: 'stypeId', sourceKey: 'id'});


shoptime.belongsTo(shop);
shop.hasMany(shoptime, {foreignKey: 'shopId', sourceKey: 'id'});

shop.belongsTo(company);
company.hasMany(shop, {foreignKey: 'companyId', sourceKey: 'id'});


////like with product material and service
like.belongsTo(product);
product.hasMany(like, {foreignKey: 'productId', sourceKey: 'id'});

like.belongsTo(user);
user.hasMany(like, {foreignKey: 'userId', sourceKey: 'id'});

like.belongsTo(material);
material.hasMany(like, {foreignKey: 'materialId', sourceKey: 'id'});

like.belongsTo(service);
service.hasMany(like, {foreignKey: 'serviceId', sourceKey: 'id'});



////comment with product material and service
comment.belongsTo(product);
product.hasMany(comment, {foreignKey: 'productId', sourceKey: 'id'});

comment.belongsTo(user);
user.hasMany(comment, {foreignKey: 'userId', sourceKey: 'id'});

comment.belongsTo(material);
material.hasMany(comment, {foreignKey: 'materialId', sourceKey: 'id'});

comment.belongsTo(service);
service.hasMany(comment, {foreignKey: 'serviceId', sourceKey: 'id'});



/////////

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
    inbox,
    fallow,
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
    shoptime,
    service,
    slider,
    material
};
