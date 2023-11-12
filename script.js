const libraryContainer = document.querySelector(".library-container");


function Book(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${wasRead ? "has been read" : "not read yet"}`
    }
}

function Library(container) {
    this.library = [];
    this.container = container;

    this.addBookToLibrary = function (book) {
        this.library.push(book);
    }

    this.render = function () {
        let index = 0;
        this.library.forEach((book) => {
            const card = document.createElement("div");

            const titleParagraph = document.createElement("p");
            const authorParagraph = document.createElement("p");
            const pagesParagraph = document.createElement("p");

            titleParagraph.textContent = `Title: ${book.title}`;
            authorParagraph.textContent = `Author: ${book.author}`;
            pagesParagraph.textContent = `Pages: ${book.pages}`;

            card.setAttribute("data-index", index);

            card.appendChild(titleParagraph);
            card.appendChild(authorParagraph);
            card.appendChild(pagesParagraph);

            this.container.appendChild(card);

            index++;

             
        })
    }
}

function main() {
    const theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 310, false);
    const axiomsEnd = new Book("Axiom's End", "Lindsay Ellis", 384, true);
    const rettungDesImperiums = new Book("Die Rettung des Imperiums", "Isaac Asimov", 560, false);

    const library = new Library(libraryContainer);
    library.addBookToLibrary(theHobbit);
    library.addBookToLibrary(axiomsEnd);
    library.addBookToLibrary(rettungDesImperiums);
    library.addBookToLibrary(theHobbit);
    library.addBookToLibrary(axiomsEnd);
    library.addBookToLibrary(rettungDesImperiums);
    library.render();
}

main();
