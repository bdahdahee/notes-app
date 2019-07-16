'use strict'

const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(function (note){
    return note.id === noteId
})

if (!note){
    location.assign('/index.html')
}




//Generates the title textbox
document.querySelector('#note-title').value = note.title
document.querySelector('#note-title').addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    document.querySelector('#last-edited').textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

//Generates the body textbox
document.querySelector('#note-body').value = note.body
document.querySelector('#note-body').addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    document.querySelector('#last-edited').textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})


//Creates the home remove button
document.querySelector('#remove-button').addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

//Creates the home button
document.querySelector('#home-button').addEventListener('click', () => {
    location.assign('/index.html')
})


//Creates the "last edited" message
document.querySelector('#last-edited').textContent = generateLastEdited(note.updatedAt)


//Updates the updates across the pages in realtime
window.addEventListener('storage', function(e){
    if (e.key ==='notes') {
        notes = JSON.parse(e.newValue)
        let note = notes.find((note) => note.id === noteId)
        
        if (!note){
            location.assign('/index.html')
        }
    
        document.querySelector('#note-title').value = note.title
        document.querySelector('#note-body').value = note.body
        document.querySelector('#last-edited').textContent = generateLastEdited(note.updatedAt)
    }
})