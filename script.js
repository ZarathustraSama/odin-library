const myLibrary = [];
const tbody = document.querySelector("tbody");
const newBookButton = document.getElementById("new-book");
const addBookButton = document.getElementById("add-book");

newBookButton.addEventListener("click", () => {document.querySelector("dialog").showModal();});
addBookButton.addEventListener("click", createBook, false);

function createBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;

  if (title === '' || author === '' || pages == '') {
    return;
  };

  const book = new Book(title, author, pages, read ? read : "No");
  addBookToLibrary(book);
};


function Book(title, author, pages, read="no") {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    let info = `${this.title} by ${this.author}, ${this.pages} pages, ${this.read === "yes" ? "read" : "not read yet"}`
    return info
  };
  this.changeReadStatus = () => {
    this.read = this.read === "yes" ? "no" : "yes";
  };
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  cleanForm();
  addRow(book);
};

function addRow(book) {
  const tr =document.createElement("tr");
  for (const [_key, value] of Object.entries(book)) {
    addBookDataToRow(value, tr)
  }
  const deleteButton = document.createElement("button");
  const changeReadStatusButton = document.createElement("button");

  deleteButton.innerText = "X";
  changeReadStatusButton.innerText = book.read === "yes" ? "Un-read" : "Read";

  tr.append(deleteButton);
  tr.append(changeReadStatusButton);
  tbody.append(tr);

  deleteButton.addEventListener("click", deleteBook);
  changeReadStatusButton.addEventListener("click", changeReadStatus);  
};

function addBookDataToRow(value, row) {
  if (typeof(value) === "function") {
    return;
  };

  const td = document.createElement("td");
  const data = document.createTextNode(value);
  td.append(data);
  row.append(td);
};

function deleteBook(e) {
  myLibrary.splice(myLibrary.length - 1, 1);
  e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode);
};

function changeReadStatus(e) {
  const book = myLibrary[myLibrary.length - 1];
  book.changeReadStatus();
  e.currentTarget.parentNode.children[3].innerText = book.read;
};

function cleanForm() {
  document.getElementById("title").value = '';
  document.getElementById("author").value = '';
  document.getElementById("pages").value = '';
  document.getElementById("read").value = '';
}

function showBooks() {
  myLibrary.forEach((book) => {
    addRow(book);
  })
};

showBooks();