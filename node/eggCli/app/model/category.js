module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const categorySchema = new Schema({
        name: String
    });

    return mongoose.model('Categroy', categorySchema);
};
