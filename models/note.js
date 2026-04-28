const mongoose = require("mongoose");


// Schema
const noteSchema = new mongoose.Schema({
    applicationID: String,
    authorID: String,
    text: String,
    rating: Number,
    createdAt: Date,
    updatedAt: Date
})


// Model
const note = mongoose.model("Note", noteSchema);


// Export model and functions
module.exports = {
    Note: note,
    saveNote: async (applicationID, authorID, text, rating) => {
        return await new note({
            applicationID,
            authorID,
            text,
            rating,
            createdAt: new Date(),
            updatedAt: new Date()
        }).save();
    },
    updateNote: async (applicationID, authorID, text, rating) => {
        return await note.updateOne(
            {applicationID, authorID}, 
            {text, rating, updatedAt: new Date()}
        )
    },
    deleteNote: async (applicationID, authorID) => {
        return await note.deleteOne({applicationID, authorID});
    },
    getNoteWithTemplate: async (hbs, user) => {
        let noteObject = await note.findOne().lean()
        noteObject.template = await hbs.renderView(`views/note.handlebars`, {
            layout: false,
            note: noteObject,
            user
        });
        return noteObject
    }
}