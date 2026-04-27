const mongoose = require("mongoose");


// Schema
const noteSchema = new mongoose.Schema({
    applicationID: String,
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
    saveNote: async (applicationID, text, rating) => {
        return await new note({
            applicationID,
            text,
            rating,
            createdAt: new Date(),
            updatedAt: new Date()
        }).save();
    },
    updateNote: async (applicationID, noteID, text, rating) => {
        return await note.updateOne(
            {applicationID, _id: noteID}, 
            {text, rating, updatedAt: new Date()}
        )
    },
    deleteNote: async (applicationID, noteID) => {
        return await note.deleteOne({applicationID, _id: noteID});
    },
    getNoteWithTemplate: async (hbs) => {
        let noteObject = await note.findOne().lean()
        noteObject.template = await hbs.renderView(`views/note.handlebars`, {
            layout: false,
            note: noteObject
        });
        return noteObject
    }
}