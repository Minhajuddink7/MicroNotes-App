import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getNotes);
document.querySelector('.note-submit').addEventListener('click', submitNote);
document.querySelector('#notes').addEventListener('click', updateNote);
document.querySelector('.card-form').addEventListener('click', cancelEdit);
let id;
function getNotes() {
  let notes = JSON.parse(localStorage.getItem('notes'));
  if (notes) {
    ui.showNotes(notes);
  }
}

function submitNote() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const _id = document.querySelector('#id').value;

  if (title === '' || body === '') {
    ui.showAlert('Please fill all the fields', 'alert alert-danger');
  } else {
    let data;
    let notesArr = [];
    if (_id === '') {
      let id = 1;

      // create id for new notes
      const LsNotes = localStorage.getItem('notes');
      if (LsNotes) {
        notesArr = JSON.parse(localStorage.getItem('notes'));
        id = parseInt(notesArr[notesArr.length - 1].id) + 1;
      }

      data = {
        title,
        body,
        id
      };

      notesArr.push(data);
      localStorage.setItem('notes', JSON.stringify(notesArr));
      ui.showAlert('Note Added', 'alert alert-success');
      ui.clearFields();
      getNotes();
    } else {
      const LsNotes = localStorage.getItem('notes');
      if (LsNotes) {
        notesArr = JSON.parse(localStorage.getItem('notes'));
      }
      let id = _id;
      data = {
        title,
        body,
        id
      };
      let noteIndex = notesArr.findIndex(note => note.id == id);
      notesArr.splice(noteIndex, 1, data);
      localStorage.setItem('notes', JSON.stringify(notesArr));
      ui.showAlert('Note Updated', 'alert alert-success');
      ui.changeFormState('add');
      getNotes();
    }
  }
}
function updateNote(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are You Sure?')) {
      let notesArr = JSON.parse(localStorage.getItem('notes'));

      let noteIndex = notesArr.findIndex(note => note.id == id);
      notesArr.splice(noteIndex, 1);
      localStorage.setItem('notes', JSON.stringify(notesArr));
      ui.showAlert('Note Removed', 'alert alert-success');
      getNotes();
    }
  } else if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const data = {
      title,
      body,
      id
    };
    ui.fillForm(data);
    window.scrollTo(0, 0);
  }
  e.preventDefault();
}
function enableEdit(e) {}
function cancelEdit(e) {
  if (e.target.classList.contains('cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}
