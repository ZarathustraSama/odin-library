class Book {
  constructor(title, author, pages, read = "no") {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
      let info = `${this.title} by ${this.author}, ${this.pages} pages, ${this.read === "yes" ? "read" : "not read yet"}`;
      return info;
    };
  };

  changeReadStatus() {
    this.read = this.read === "yes" ? "no" : "yes";
  };
};

class Library {
  constructor() {
    this.myLibrary = [];
  }

  cleanForm() {
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("pages").value = '';
    document.getElementById("read").value = '';
  }
  
  showBooks() {
    this.myLibrary.forEach((book) => {
      this.addRow(book);
    })
  };

  createBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;  
    if (!!title && !!author && !!pages) {
      return new Book(title, author, pages, read ? read : "No"); 
    };
    return;   
  };

  addBookToLibrary(book) {
    this.myLibrary.push(book);
    this.cleanForm();
    this.addRow(book);
  };

  addRow(book) {
    const tr = document.createElement("tr");
    for (const [_key, value] of Object.entries(book)) {
      this.addBookDataToRow(value, tr)
    }
    const deleteButton = document.createElement("button");
    const changeReadStatusButton = document.createElement("button");
  
    deleteButton.innerText = "X";
    changeReadStatusButton.innerText = book.read === "yes" ? "Un-read" : "Read";
  
    tr.append(deleteButton);
    tr.append(changeReadStatusButton);
    document.querySelector("tbody").append(tr);
  
    deleteButton.addEventListener("click", this.deleteBook);
    changeReadStatusButton.addEventListener("click", this.changeReadStatus);  
  };
  
  addBookDataToRow(value, row) {
    if (typeof(value) === "function") {
      return;
    };
  
    const td = document.createElement("td");
    const data = document.createTextNode(value);
    td.append(data);
    row.append(td);
  };
  
  deleteBook = (e) => {
    this.myLibrary.splice(this.myLibrary.length - 1, 1);
    e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode);
  };
  
  changeReadStatus = (e) => {
    const book = this.myLibrary[this.myLibrary.length - 1];
    book.changeReadStatus();
    e.currentTarget.parentNode.children[3].innerText = book.read;
  };

  initializeEvents() {
    document.getElementById("new-book").addEventListener("click", () => {
      document.querySelector("dialog").showModal();
    });
    document.getElementById("add-book").addEventListener("click", () => {
      const book = this.createBook();
      if (!!book) {
        this.addBookToLibrary(book);
      }
    }, false);
    this.showBooks();
  }
}

let library = new Library();
library.initializeEvents();