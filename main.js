const showPopup = document.querySelector(".show-popup");
const popupContainer = document.querySelector(".popup-container");
const closeBtn = document.querySelector(".close-btn");
const bookshelf = document.querySelector(".bookshelf");

showPopup.onclick = () => {
  popupContainer.classList.add("active");
};

closeBtn.onclick = () => {
  const book = Array.from(document.querySelectorAll("#book-form input")).reduce(
    (acc, input) => ({ ...acc, [input.id]: input.value }),
    {}
  );

  console.log(book);
  addBookToLibrary(book.Author, book.title, book.Pages);

  popupContainer.classList.remove("active");
};

const myLibrary = [];

function Book(author, title, page) {
  this.author = author;
  this.title = title;
  this.page = page;
}

function addBookToLibrary(author, title, page) {
  const book = new Book(author, title, page);
  myLibrary.push(book);
  createBookCard(book);
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book");

  const titleLabel = document.createElement("label");
  const title = document.createElement("input");

  const authorLabel = document.createElement("label");
  const author = document.createElement("input");

  const pageLabel = document.createElement("label");
  const page = document.createElement("input");

  titleLabel.setAttribute("for", "title");
  titleLabel.innerText = "Title:";
  title.setAttribute("type", "text");
  title.setAttribute("id", "title");
  title.setAttribute("value", `${book.title}`);
  title.disabled = true;

  authorLabel.setAttribute("for", "author");
  authorLabel.innerText = "Author:";
  author.setAttribute("type", "text");
  author.setAttribute("id", "author");
  author.setAttribute("value", `${book.author}`);
  author.disabled = true;

  pageLabel.setAttribute("for", "pages");
  pageLabel.innerText = "Pages:";
  page.setAttribute("type", "text");
  page.setAttribute("id", "pages");
  page.setAttribute("value", `${book.page}`);
  page.disabled = true;

  bookCard.appendChild(titleLabel);
  bookCard.appendChild(title);
  bookCard.appendChild(authorLabel);
  bookCard.appendChild(author);
  bookCard.appendChild(pageLabel);
  bookCard.appendChild(page);
  bookshelf.appendChild(bookCard);
}
