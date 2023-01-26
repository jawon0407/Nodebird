module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        //mySQL에서는 posts 테이블 생성
        //id가 기본적으로 들어있다.
        content: {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        //belongsTo로 연결된 컬럼이 생긴다.
        // UserId: {}
        // RetweetId: {} PostId => as : 'Retweeted'
        // Hashtag: {}
    } , {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //이모티콘 저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User); // Post : User = N : 1 다 대 1 관계
        db.Post.belongsTo(db.Post, { through: 'Retweet', as: 'Retweeted', foreignKey: 'RetweetId' })
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // Post : Hashtag = N : M 다 대 다 관계
        db.Post.belongsToMany(db.User , { through : "Like" , as : "Likers"})
        db.Post.hasMany(db.Comment);   // Post : Comment = 1 : N 1 대 다수 관계
        db.Post.hasMany(db.Image); // Post : Image = 1 : N 1 대 다수 관계
    };
    return Post;
}