// import nanoid from 'nanoid';
// const {nanoid} = require('nanoid')
const { nanoid } = require('nanoid')

const notes = []

function addNote(req) {
    //   curl -d "{\"title\":\"title1\", \"tags\":\"tag1\"}" -H "Content-Type: application/json" -X POST http://localhost:5000/notes
    const { title, tags, body } = req.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    notes.push(newNote);

    return id
}

function getAllNote() {
    return notes
}

function getNote(id) {

    const result = notes.find(note => note.id == id)

    if (result) return result
    else return false
}

function editNote(id, req) {

    const result = notes.findIndex(note => note.id == id)
    let { title, tags, body } = req.payload;

    title = checkDefine('title', title, result)
    tags = checkDefine('tags', tags, result)
    body = checkDefine('body', body, result)

    const updatedAt = new Date().toISOString();

    if (result != -1) {
        notes[result].title = title
        notes[result].tags = tags
        notes[result].body = body
        notes[result].updatedAt = updatedAt

        return true
    }
    else return false

}

function deleteNote(id) {
    // curl -X DELETE http://localhost:5000/notes/id
    const result = notes.findIndex(note => note.id == id)

    if (result != -1) {
        notes.splice(result, 1)
        return 'Succesfuly delete a note'
    }
    else return false
}

function checkDefine(name, check, index) {
    if (check == false) return notes[index][`${name}`]
    else return check
}

module.exports = { addNote, getNote, editNote, deleteNote, getAllNote }