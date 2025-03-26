const books = [];

const library = document.querySelector(".library");
const form = document.querySelector("form");
form.addEventListener("submit", handleAddBook);
const addBookButton = document.querySelector(".sidebar>button");
addBookButton.addEventListener(
    "click",
    () => (form.style.visibility = "visible")
);

class Book {
    constructor(title, author, notes, pages, red) {
        this.title = title;
        this.author = author;
        this.notes = notes;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }
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
    library.textContent = "";
    books.forEach((book) => {
        const currentCard = createCard(book);
        library.appendChild(currentCard);
    });
}

function toggleRead(e) {
    const bookId = e.target.parentElement.parentElement.id;
    let book = books.find((book) => book.id === bookId);
    book.read = !book.read;
    e.target.classList.toggle("not-read");
    e.target.textContent = book.read ? "read" : "not read";
}

function createCard(book) {
    function createRow(wrapperClass, nameElement, valueElement, name, value) {
        const cardRow = document.createElement("div");
        cardRow.classList.add(wrapperClass);

        const rowNameSpan = document.createElement(nameElement);
        rowNameSpan.classList.add("name");
        rowNameSpan.textContent = name;
        const rowValueSpan = document.createElement(valueElement);
        rowValueSpan.classList.add("value");
        rowValueSpan.textContent = value;

        cardRow.appendChild(rowNameSpan);
        cardRow.appendChild(rowValueSpan);

        return cardRow;
    }

    const card = document.createElement("div");
    card.id = book.id;
    card.classList.add("card");

    const firstCardRow = createRow("card-row", "span", "span", "Title", book.title);
    card.appendChild(firstCardRow);

    const secondCardRow = createRow("card-row", "span", "span", "Author", book.author);
    card.appendChild(secondCardRow);

    const notesDiv = createRow("notes", "span", "p", "Notes", book.notes);
    card.appendChild(notesDiv);

    const thirdCardRow = createRow("card-row", "span", "span", "Pages", book.pages);
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
    deleteButton.addEventListener("click", (e) => {
        deleteBook(e.target.parentElement.parentElement.id);
    });

    lastRow.appendChild(readButton);
    lastRow.appendChild(deleteButton);
    card.appendChild(lastRow);

    return card;
}

addBook(
    "Das Schloss",
    "Franz Kafka",
    "Der Protagonist K. versucht vergeblich Zugang zu einer undurchschaubaren Bürokratie zu erhalten. Das Werk thematisiert Entfremdung, Machtstrukturen und die absurde Suche nach Anerkennung in einer unerreichbaren Instanz.",
    302,
    false
);
addBook(
    "The Handmaids Tale",
    "Margaret Atwood",
    "The Handmaid's Tale is a dystopian novel set in the totalitarian Republic of Gilead, where women are oppressed and forced into strict societal roles. The story follows Offred, a Handmaid, as she struggles to survive and reclaim her autonomy in a regime that controls women's bodies and freedoms.",
    420,
    true
);
addBook("Placeholder", "Placeholder", "Placeholder notes", 123, true);
