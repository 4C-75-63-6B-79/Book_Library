function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
} 

Book.prototype.info = function() {
    var temp = read ? "read" : "not read yet";
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + temp;
}

function addBookToLibrary() {
    let formData = new FormData(form);
    title = formData.has("bookName") ? formData.get("bookName") : "notitle";
    author = formData.has("authorName") ? formData.get("authorName") : "notitle";
    pages = formData.has("numberOfPages") ? formData.get("numberOfPages") : "nopages";
    read = formData.has("readStatus") ? formData.get("readStatus") : null;
    let newBook = new Book(title, author, pages, read);
    myLibrary[newBook.title] = newBook;
    console.log(myLibrary);
    return newBook;
}

function addOnScreen(book) {
    // -----> Adding the last entry on to the screen
    let newBookCard = createBookCard(book);
    bookCards.appendChild(newBookCard);
}

function createBookCard(book) {
    let newElement = document.createElement('div');
    newElement.setAttribute("data-book-name",book.title);
    let p = document.createElement("p");
    p.textContent = book.info();
    let remBtn = createRemoveButton(book);
    let readBtn = createReadStatusButton(book);
    newElement.appendChild(p);
    newElement.appendChild(remBtn);
    newElement.appendChild(readBtn);
    return newElement;
}

function createRemoveButton(book) {
    let remBtn = document.createElement("button")
    remBtn.textContent = "Remove";
    remBtn.setAttribute("id", book.title)
    remBtn.addEventListener("click", removeBookAndDiv);
    return remBtn;
}

function createReadStatusButton(book) {
    let readBtn = document.createElement("button");
    readBtn.setAttribute("data-read-button", book.title)
    readBtn.textContent = book.read ? "Read" : "Not Read";
    readBtn.addEventListener("click", readStatusUpdate);
    return readBtn;
}

function readStatusUpdate(event) {
    console.log(event.target.getAttribute('data-read-button') + "read button pressed");
    let btnDataAttr = event.target.getAttribute('data-read-button');
    myLibrary[btnDataAttr].read = myLibrary[btnDataAttr].read ? null : 'true';
    console.log(myLibrary);
    let btn = document.querySelector(`[data-read-button="${btnDataAttr}"]`);
    btn.textContent = myLibrary[btnDataAttr].read ? "Read" : "Not Read";
}

function removeBookAndDiv(event) {
    console.log("Remove Button was pressed");
    let btnId = this.id;
    let parentDiv = document.querySelector(`[data-book-name="${btnId}"`);
    bookCards.removeChild(parentDiv)
    delete myLibrary[btnId];
    console.log(myLibrary)
}

function inform(event) {
    event.preventDefault();
    console.log("Submit button pressed")
    let book = addBookToLibrary();
    addOnScreen(book);
    form.reset();
    form.style.transform = 'scale(0)';
}

let myLibrary = []
const bookCards = document.querySelector("#book-cards");
const form = document.querySelector('form');
form.addEventListener("submit", inform);


function scaleform100() {
    form.style.transform = 'scale(1)';
    console.log("Add book button pressed");
}

const addBookButton = document.querySelector("#add-book-btn")
addBookButton.addEventListener('click', scaleform100);
