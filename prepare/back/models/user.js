module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        //mySQL에서는 users 테이블 생성
        //id가 기본적으로 들어있다.
        email: {
            type : DataTypes.STRING(30), // types = STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, //필수 , true = 선택
            unique: true, //고유한 값
        },
        nickname: {
            type : DataTypes.STRING(30),
            allowNull: false, //필수 , true = 선택
        },
        password: {
            type : DataTypes.STRING(100),
            allowNull: false, //필수 , true = 선택
        },
        // PostId: {}
        // FollowersId: {} UserId => FollowersId(as Followers)
        // FollowinsId: {} UserId => FollowsingId(as Followings)
    } , {
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글 저장
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post); // User : Post = 1 : N 1 대 다수 관계
        db.User.hasMany(db.Comment); // User : Comment = 1 : N 1 대 다수 관계
        db.User.belongsToMany(db.Post , { through : 'Like' , as : "Liked" }); // User : Post = N : M 다 대 다 관계 (through = 중간 테이블 이름 , as = 별칭)
        db.User.belongsToMany(db.User, { through : 'Follow' , as : 'Followers' , foreignKey : 'FollowingId'}); // through = 중간 테이블 이름 , foreignKey = 반대쪽 테이블의 컬럼명
        db.User.belongsToMany(db.User, { through : 'Follow' , as : 'Followings' , foreignKey : 'FollowerId'});
    };
    return User;
}