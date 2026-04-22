const express = require("express");
const Note = require("../models/note")
const noteRouter = express.Router();

// Get all notes for a single application
noteRouter.get("/:id/notes", (req, res) => {
    const id = req.params.id;
    let notes = Note.getNotes(id);
    res.status(200).json(notes);
})


// Create a new note for application
noteRouter.post("/:id/notes", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    let note = Note.addNote(id, body.text, Number.parseInt(body.rating));
    res.status(200).json(note);
})


// Update a note for application
noteRouter.put("/:id/notes/:noteIndex", (req, res) => {
    const id = req.params.id;
    const noteIndex = req.params.noteIndex;
    const body = req.body;
    let note = Note.updateNote(id, noteIndex, body.text, Number.parseInt(body.rating));
    res.status(200).json(note);
})


// Delete a note for application
noteRouter.delete("/:id/notes/:noteIndex", (req, res) => {
    const id = req.params.id;
    const noteIndex = req.params.noteIndex;
    let note = Note.deleteNote(id, noteIndex);
    res.status(200).json(note);
})

module.exports = noteRouter;