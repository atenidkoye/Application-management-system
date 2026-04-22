class Note {
    applicationID;
    text;
    rating;
    createdAt;
    updatedAt;

    // TODO: Remove once a database exists
    static notes = [
        new Note(1, "This is good", 4),
        new Note(1, "It's fine", 3),
        new Note(1, "HORRIBLE!", 1),
        new Note(2, "Different note", 3)
    ]

    constructor(applicationID, text, rating, createdAt = new Date(), updatedAt = new Date()) {
        this.applicationID = applicationID;
        this.text = text;
        this.rating = rating;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // TODO: Change to get notes from database
    static getNotes(applicationID) {
        return Note.notes.filter(note => note.applicationID == applicationID);
    }

    // TODO: Change to add notes to database
    static addNote(applicationID, text, rating) {
        let note = new Note(applicationID, text, rating);
        Note.notes.push(note);
        return note;
    }

    // TODO: Change to replace notes in database
    static updateNote(applicationID, noteIndex, text, rating) {
        let note = Note.notes.filter(note => note.applicationID == applicationID)[noteIndex];
        note.text = text;
        note.rating = rating;
        note.updatedAt = new Date();
        let index = Note.notes.findIndex(n => n == note);
        Note.notes[index] = note;
        return note;
    }

    // TODO: Change to remove notes from database
    static deleteNote(applicationID, noteIndex) {
        let note = Note.notes.filter(n => n.applicationID == applicationID)[noteIndex];
        let index = Note.notes.findIndex(n => n == note);
        return Note.notes.splice(index, 1)[0];
    }
}

module.exports = Note