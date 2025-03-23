const books = [];

const library = document.querySelector(".library");
const form = document.querySelector("form");
form.addEventListener("submit", handleAddBook);
const addBookButton = document.querySelector(".sidebar>button");
addBookButton.addEventListener(
    "click",
    () => (form.style.visibility = "visible")
);

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

function handleAddBook(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const author = formData.get("author");
    const notes = formData.get("notes");
    const pages = formData.get("pages");
    const read = formData.has("read");

    addBook(title, author, notes, pages, read);
    form.reset();
    form.style.visibility = "hidden";
}

function addBook(title, author, notes, pages, read) {
    const newBook = new Book(title, author, notes, pages, read);
    books.push(newBook);
    displayBooks();
}

function deleteBook(id) {
    const indexOfBookToDelete = books.findIndex((book) => book.id == id);
    books.splice(indexOfBookToDelete, 1);
    displayBooks();
}

function displayBooks() {
    library.innerHTML = "";
    books.forEach((book) => {
        const currentCard = createCard(book);
        library.appendChild(currentCard);
    });
}

function toggleRead(e) {
    const bookId = e.target.parentElement.parentElement.id;
    let book = books.find(book => book.id === bookId);
    book.read = !book.read;
    e.target.classList.toggle("not-read");
    e.target.textContent = book.read ? "read" : "not read";
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
    if (!book.read) {
        readButton.classList.add("not-read");
        readButton.textContent = "not read";
    }
    readButton.addEventListener("click", toggleRead);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", e => {
        deleteBook(e.target.parentElement.parentElement.id);
    });

    lastRow.appendChild(readButton);
    lastRow.appendChild(deleteButton);
    card.appendChild(lastRow);

    return card;
}


addBook("Das Schloss", "Franz Kafka", "Der Protagonist K. versucht vergeblich Zugang zu einer undurchschaubaren Bürokratie zu erhalten. Das Werk thematisiert Entfremdung, Machtstrukturen und die absurde Suche nach Anerkennung in einer unerreichbaren Instanz.", 302, false);
addBook("The Handmaids Tale", "Margaret Atwood", "The Handmaid's Tale is a dystopian novel set in the totalitarian Republic of Gilead, where women are oppressed and forced into strict societal roles. The story follows Offred, a Handmaid, as she struggles to survive and reclaim her autonomy in a regime that controls women's bodies and freedoms.", 420, true);
addBook("Placeholder", "Placeholder", "Placeholder notes", 123, true);