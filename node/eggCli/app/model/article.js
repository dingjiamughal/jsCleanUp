module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const objectId = Schema.Types.ObjectId;
    const article = new Schema({
        title: {type: String, required: true},
        content: {type: String, required: true},
        user: {type: objectId, ref: 'User'},
        pv: {type: Number, default: 0},
        comments: [
            {user: {type: objectId, ref: 'User'}, content: String, createAt: {type: Date, default: Date.now}}
        ],
        createAt: {type: Date, default: Date.now}
    });

    return mongoose.model('Article', article);
};
