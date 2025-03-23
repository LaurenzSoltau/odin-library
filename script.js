const books = [];

const library = document.querySelector(".library");
const form = document.querySelector("form");
const addBookButton = document.querySelector(".sidebar>button");
addBookButton.addEventListener("click", () => form.style.visibility = "visible");

function Book(title, author, notes, pages, read) {
    if (!new.target) {
        throw Error("Use New!");
    }
    this.title = title;
    this.author = author;
    this.notes = notes;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBook(title, author, notes, pages, read) {
    const newBook = new Book(title, author, notes, pages, read);
    books.push(newBook);
    displayBooks();
}

function deleteBook(id) {
   const indexOfBookToDelete = books.findIndex(book => book.id == id); 
}

function displayBooks() {
    library.innerHTML = "";
    books.forEach(book => {
        const currentCard = createCard(book);
        library.appendChild(currentCard);
    })
}

function createCard(book) {
    const card = document.createElement("div");
    card.id = book.id;
    card.classList.add("card");

    const firstCardRow = document.createElement("div");
    firstCardRow.classList.add("card-row");
    const titleNameSpan = document.createElement("span");
    titleNameSpan.classList.add("name");
    titleNameSpan.textContent = "Title";
    const titleValueSpan = document.createElement("span");
    titleValueSpan.classList.add("value");
    titleValueSpan.textContent = book.title;

    firstCardRow.appendChild(titleNameSpan);
    firstCardRow.appendChild(titleValueSpan);
    card.appendChild(firstCardRow);


    const secondCardRow = document.createElement("div");
    secondCardRow.classList.add("card-row");
    const authorNameSpan = document.createElement("span");
    authorNameSpan.classList.add("name");
    authorNameSpan.textContent = "Author";
    const authorValueSpan = document.createElement("span");
    authorValueSpan.classList.add("value");
    authorValueSpan.textContent = book.author;

    secondCardRow.appendChild(authorNameSpan);
    secondCardRow.appendChild(authorValueSpan);
    card.appendChild(secondCardRow);


    const notesDiv = document.createElement("div");
    notesDiv.classList.add("notes");
    const notesNameSpan = document.createElement("span");
    notesNameSpan.classList.add("name");
    notesNameSpan.textContent = "Notes";
    const notesValueP = document.createElement("p");
    notesValueP.classList.add("value");
    notesValueP.textContent = book.notes;

    notesDiv.appendChild(notesNameSpan);
    notesDiv.appendChild(notesValueP);
    card.appendChild(notesDiv);


    const thirdCardRow = document.createElement("div");
    thirdCardRow.classList.add("card-row");
    const pagesNameSpan = document.createElement("span");
    pagesNameSpan.classList.add("name");
    pagesNameSpan.textContent = "Pages";
    const pagesValueSpan = document.createElement("span");
    pagesValueSpan.classList.add("value");
    pagesValueSpan.textContent = book.pages;

    thirdCardRow.appendChild(pagesNameSpan);
    thirdCardRow.appendChild(pagesValueSpan);
    card.appendChild(thirdCardRow); 


    const lastRow = document.createElement("div");
    lastRow.classList.add("last-row");
    const readButton = document.createElement("button");
    readButton.classList.add("readButton");
    readButton.textContent = "read";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete"
    deleteButton.classList.add("deleteButton");
    
    lastRow.appendChild(readButton);
    lastRow.appendChild(deleteButton);
    card.appendChild(lastRow);

    return card;
}


addBook("Test", "test", "tewfwef fwefwe fwef", 200, false);