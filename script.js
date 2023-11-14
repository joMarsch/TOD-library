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
    let that = this;
    this.library = [];
    this.container = container;

    this.addBookToLibrary = function (book) {
        this.library.push(book);
        this.render();
    }

    this.removeBookFromLibrary = function (bookIndex) {
        this.library.splice(bookIndex, 1);
        this.render();
    }

    this.render = function () {
        this.container.replaceChildren();
        let index = 0;
        this.library.forEach((book) => {
            const card = document.createElement("div");


            // Creating children for the card element
            const titleParagraph = document.createElement("p");
            const authorParagraph = document.createElement("p");
            const pagesParagraph = document.createElement("p");
            const deleteButton = document.createElement("button");
            const readStatutsButton = document.createElement("button");

            // Adding Text Content to card children
            titleParagraph.textContent = `Title: ${book.title}`;
            authorParagraph.textContent = `Author: ${book.author}`;
            pagesParagraph.textContent = `Pages: ${book.pages}`;
            deleteButton.textContent = "Delete";
            readStatutsButton.textContent = (book.wasRead) ? "Read" : "Not Read";

            // Giving the card an idex used for deletion
            card.setAttribute("data-index", index);

            // Giving the Read Status button an attribute to use for styling
            readStatutsButton.setAttribute("data-wasRead", book.wasRead);

            // Adding functionality to delete button
            deleteButton.addEventListener("click", event => {
                const cardToDelete = event.currentTarget.parentNode;
                that.removeBookFromLibrary(cardToDelete.dataset.index);
            });

            // Adding functionality to Read Status button
            readStatutsButton.addEventListener("click", event => {
                book.wasRead = !book.wasRead;
                event.currentTarget.setAttribute("data-wasRead", book.wasRead);
                event.currentTarget.textContent = (book.wasRead) ? "Read" : "Not Read";
            });


            card.appendChild(titleParagraph);
            card.appendChild(authorParagraph);
            card.appendChild(pagesParagraph);
            card.appendChild(readStatutsButton);
            card.appendChild(deleteButton);
            

            this.container.appendChild(card);

            index++;


        })
    }
}

function initializeDialog(library) {
    const addBookForm = document.querySelector("#add-book-form")
    const addBookDialog = document.querySelector("dialog");
    const addBookButton = document.querySelector("dialog + button");
    const closeButton = document.querySelector("form button");

    addBookButton.addEventListener("click", () => {
        addBookDialog.showModal();
        addBookForm.reset();
    });

    closeButton.addEventListener("click", function (e) {
        e.preventDefault();
        addBookDialog.close();
    })

    addBookForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let formData = new FormData(addBookForm);
        let title = formData.get("title");
        let author = formData.get("author");
        let pages = Number(formData.get("pages"));
        let wasRead = (formData.get("wasRead") === "true");

        if(isNaN(pages)) {
            pages = 0;
        }

        let book = new Book(title, author, pages, wasRead);

        library.addBookToLibrary(book);
        console.log(`${title} ${author} ${pages} ${wasRead}`);



        addBookDialog.close();
        addBookForm.reset();
    })
}

function main() {
    const libraryContainer = document.querySelector(".library-container");
    const library = new Library(libraryContainer);
    
    initializeDialog(library);


    // Code Snippet for Testint purposes

    // const theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 310, false);
    // const axiomsEnd = new Book("Axiom's End", "Lindsay Ellis", 384, true);
    // const rettungDesImperiums = new Book("Die Rettung des Imperiums", "Isaac Asimov", 560, false);

    // library.addBookToLibrary(theHobbit);
    // library.addBookToLibrary(axiomsEnd);
    // library.addBookToLibrary(rettungDesImperiums);
    // library.addBookToLibrary(theHobbit);
    // library.addBookToLibrary(axiomsEnd);
    // library.addBookToLibrary(rettungDesImperiums);
}

main();
