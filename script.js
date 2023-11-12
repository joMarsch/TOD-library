
function Book(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${wasRead ? "has been read" : "not read yet"}`
    }
}


const theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 310, false);
const axiomsEnd = new Book("Axiom's End", "Lindsay Ellis", 384, true);
const rettungDesImperiums = new Book("Die Rettung des Imperiums", "Isaac Asimov", 560, false);