const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, // 필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
    }, {
      modelName: 'User',
      tableName: 'Users',
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
      sequelize,
    });
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Comment , { through : 'CommentLiker' , as : 'CommentLiked' });
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  }
};

//----------------- 구버전 -----------------


// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define('User', {
//         //mySQL에서는 users 테이블 생성
//         //id가 기본적으로 들어있다.
//         email: {
//             type : DataTypes.STRING(30), // types = STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
//             allowNull: false, //필수 , true = 선택
//             unique: true, //고유한 값
//         },
//         nickname: {
//             type : DataTypes.STRING(30),
//             allowNull: false, //필수 , true = 선택
//         },
//         password: {
//             type : DataTypes.STRING(100),
//             allowNull: false, //필수 , true = 선택
//         },
//         // PostId: {}
//         // FollowersId: {} UserId => FollowersId(as Followers)
//         // FollowinsId: {} UserId => FollowsingId(as Followings)
//     } , {
//         charset: 'utf8',
//         collate: 'utf8_general_ci', //한글 저장
//     });
//     User.associate = (db) => {
//         db.User.hasMany(db.Post); // User : Post = 1 : N 1 대 다수 관계
//         db.User.hasMany(db.Comment); // User : Comment = 1 : N 1 대 다수 관계
//         db.User.belongsToMany(db.Comment, { through : 'CommentLiker' , as : 'CommentLiked' }); // User : Comment = N : M 다 대 다 관계 (through = 중간 테이블 이름 , as = 별칭
//         db.User.belongsToMany(db.Post , { through : 'Like' , as : "Liked" }); // User : Post = N : M 다 대 다 관계 (through = 중간 테이블 이름 , as = 별칭)
//         db.User.belongsToMany(db.User, { through : 'Follow' , as : 'Followers' , foreignKey : 'FollowingId'}); // through = 중간 테이블 이름 , foreignKey = 반대쪽 테이블의 컬럼명
//         db.User.belongsToMany(db.User, { through : 'Follow' , as : 'Followings' , foreignKey : 'FollowerId'});
//     };
//     return User;
// }