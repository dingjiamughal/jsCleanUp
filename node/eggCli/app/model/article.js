module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const article = new Schema({
        name: String
    });

    return mongoose.model('Article', article);
};
