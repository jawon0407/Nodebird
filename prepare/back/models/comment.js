module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        //mySQL에서는 Comments 테이블 생성
        //id가 기본적으로 들어있다.
        content: {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        // UserId: {}
        // PostId: {}
    } , {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //이모티콘 저장
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User); // Comment : User = N : 1 다 대 1 관계
        db.Comment.belongsTo(db.Post);
        db.Comment.hasMany(db.Image);
        db.Comment.belongsToMany(db.User, { through : 'CommentLike' , as: 'CommentLikers' }); // 하나의 댓글에 여러명이 좋아요를 누를 수 있기 때문에 1:N 관계
    };
    return Comment;
}