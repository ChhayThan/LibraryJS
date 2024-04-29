const showPopup = document.querySelector(".show-popup");
const popupContainer = document.querySelector(".popup-container");
const submitBtn = document.querySelector(".submit-btn");
const closeBtn = document.querySelector(".close-btn");
const bookshelf = document.querySelector(".bookshelf");
const errorMessage = document.querySelector(".errorMessage");

showPopup.onclick = () => {
  popupContainer.classList.add("active");
};

closeBtn.onclick = () => {
  popupContainer.classList.remove("active");
};

submitBtn.onclick = () => {
  const book = Array.from(document.querySelectorAll("#book-form input")).reduce(
    (acc, input) => ({ ...acc, [input.id]: input.value }),
    {}
  );

  if (
    book.Author.length === 0 ||
    book.title.length === 0 ||
    book.Pages.length === 0
  ) {
    errorMessage.innerText = "Please input the required information.";
    return;
  } else {
    errorMessage.innerText = "";
  }
  console.log(book);
  addBookToLibrary(book.Author, book.title, book.Pages, book.hasRead);

  document.querySelectorAll("#book-form input").forEach((input) => {
    input.value = ""; // Clear the value of each input field
  });

  popupContainer.classList.remove("active");
};

const myLibrary = [];

function Book(author, title, page, hasRead) {
  this.author = author;
  this.title = title;
  this.page = page;
  this.hasRead = hasRead;
}

function addBookToLibrary(author, title, page, hasRead) {
  const book = new Book(author, title, page, hasRead);
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

  const hasReadLabel = document.createElement("label");
  const switchLabel = document.createElement("label");
  const switchSpan = document.createElement("span");
  const hasReadInput = document.createElement("input");

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

  hasReadLabel.setAttribute("for", "hasRead");
  hasReadLabel.innerText = "Read Status:";
  switchLabel.classList.add("switch");
  switchLabel.appendChild(hasReadInput);
  switchLabel.appendChild(switchSpan);
  switchSpan.classList.add("slider", "round");
  hasReadInput.setAttribute("type", "checkbox");
  hasReadInput.setAttribute("id", "hasRead");
  hasReadInput.checked = book.hasRead === "on";

  bookCard.appendChild(titleLabel);
  bookCard.appendChild(title);
  bookCard.appendChild(authorLabel);
  bookCard.appendChild(author);
  bookCard.appendChild(pageLabel);
  bookCard.appendChild(page);
  bookCard.appendChild(hasReadLabel);
  bookCard.appendChild(switchLabel);
  bookshelf.appendChild(bookCard);
}
