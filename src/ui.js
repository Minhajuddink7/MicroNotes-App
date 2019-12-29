class UI {
  constructor() {
    this.notes = document.querySelector('#notes');
    this.title = document.querySelector('#title');
    this.body = document.querySelector('#body');
    this.id = document.querySelector('#id');
    this.submit = document.querySelector('.note-submit');
    this.forState = 'add';
  }
  showNotes(notes) {
    let output = '';
    notes.forEach(note => {
      output += `
          <div class="card mb-3 ">
            <div class="card-body">
              <h4 class="card-title">${note.title}</h4>
              <p class="card-text">${note.body}</p>
              <a href="#" class="edit card-link" data-id="${note.id}">
                <i class="fa fa-pencil"></i>
              </a>

              <a href="#" class="delete card-link" data-id="${note.id}">
              <i class="fa fa-remove"></i>
            </a>
            </div>
          </div>
        `;
    });
    this.notes.innerHTML = output;
  }
  showAlert(msg, className) {
    this.clearAlert();
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(msg));
    const con = document.querySelector('.notes');
    const notes = document.querySelector('#notes');
    con.insertBefore(div, notes);
    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }
  clearAlert() {
    const alert = document.querySelector('.alert');
    if (alert) {
      alert.remove();
    }
  }
  clearFields() {
    this.title.value = '';
    this.body.value = '';
  }
  fillForm(data) {
    this.title.value = data.title;
    this.body.value = data.body;
    this.id.value = data.id;
    this.changeFormState('edit');
  }
  changeFormState(type) {
    if (type === 'edit') {
      this.submit.textContent = 'Update Note';
      this.submit.classList.remove('btn-primary');
      this.submit.classList.add('btn-warning');

      const cancel = document.createElement('button');
      cancel.className = 'btn btn-info btn-block cancel';
      cancel.innerText = 'Cancel Editing';

      const form = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');
      if (!document.querySelector('.cancel')) {
        form.insertBefore(cancel, formEnd);
      }
    } else {
      this.submit.textContent = 'Post your Note';
      this.submit.classList.remove('btn-warning');
      this.submit.classList.add('btn-primary');
      if (document.querySelector('.cancel')) {
        document.querySelector('.cancel').remove();
      }
      this.id.value = '';
      this.clearFields();
    }
  }
}

export const ui = new UI();
