const showPopup = document.querySelector(".show-popup");
const popupContainer = document.querySelector(".popup-container");
const submitBtn = document.querySelector(".submit-btn");
const closeBtn = document.querySelector(".close-btn");
const bookshelf = document.querySelector(".bookshelf");
const errorMessage = document.querySelector(".errorMessage");

const bookCount = document.querySelector(".bookCount");

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
  addBookToLibrary(book.Author, book.title, book.Pages, book.hasRead);

  document.querySelectorAll("#book-form input").forEach((input) => {
    input.value = ""; // Clear the value of each input field
  });

  popupContainer.classList.remove("active");
};

const myLibrary = [];

function updateBookCount() {
  let count = myLibrary.length;
  bookCount.innerText = `Total Number of books: ${count}`;
}

class Book {
  constructor(author, title, page, hasRead) {
    this._author = author;
    this._title = title;
    this._page = page;
    this._hasRead = hasRead;
  }

  get author() {
    return this._author;
  }

  set author(author) {
    this._author = author;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get page() {
    return this._page;
  }

  set page(page) {
    this._page = page;
  }

  get hasRead() {
    return this._hasRead;
  }

  set hasRead(hasRead) {
    this._hasRead = hasRead;
  }
}

function addBookToLibrary(author, title, page, hasRead) {
  const book = new Book(author, title, page, hasRead);
  myLibrary.push(book);
  createBookCard(book, myLibrary.length - 1);
  updateBookCount();
}

function createBookCard(book, index) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book");

  const titleLabel = document.createElement("label");
  const title = document.createElement("input");

  const authorLabel = document.createElement("label");
  const author = document.createElement("input");

  const pageLabel = document.createElement("label");
  const page = document.createElement("input");

  const switchLabel = document.createElement("label");
  const switchSpan = document.createElement("span");
  const hasReadInput = document.createElement("input");

  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

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
  page.setAttribute("type", "number");
  page.setAttribute("id", "pages");
  page.setAttribute("value", `${book.page}`);
  page.disabled = true;

  switchLabel.innerText = "Read Status:  ";
  switchLabel.classList.add("switch");
  switchLabel.appendChild(hasReadInput);
  switchLabel.appendChild(switchSpan);
  switchSpan.classList.add("slider", "round");
  hasReadInput.setAttribute("type", "checkbox");
  hasReadInput.setAttribute("id", "hasRead");
  hasReadInput.checked = book.hasRead === "on";
  hasReadInput.disabled = true;

  editBtn.classList.add("btn", "edit-btn");
  editBtn.innerText = "Edit";
  deleteBtn.classList.add("btn", "delete-btn");
  deleteBtn.innerText = "Delete";

  bookCard.appendChild(titleLabel);
  bookCard.appendChild(title);
  bookCard.appendChild(authorLabel);
  bookCard.appendChild(author);
  bookCard.appendChild(pageLabel);
  bookCard.appendChild(page);
  bookCard.appendChild(switchLabel);
  bookCard.appendChild(editBtn);
  bookCard.appendChild(deleteBtn);

  bookCard.setAttribute("data-index-number", `${index}`);
  bookshelf.appendChild(bookCard);

  const editBtnSelector = document.querySelector(
    `[data-index-number='${index}'] .edit-btn`
  );
  const deleteBtnSelector = document.querySelector(
    `[data-index-number='${index}'] .delete-btn`
  );

  editBtnSelector.onclick = () => {
    document
      .querySelectorAll(`[data-index-number='${index}'] input`)
      .forEach((input) => {
        if (input.disabled === true) {
          input.disabled = false;
          editBtnSelector.innerText = "Confirm";
        } else {
          editBtnSelector.innerText = "Edit";
          input.disabled = true;
          myLibrary[index].author = author.value;
          myLibrary[index].title = title.value;
          myLibrary[index].page = page.value;
          if (hasReadInput.value === "on") {
            myLibrary[index].hasRead = "on";
          } else {
            myLibrary[index].hasRead = "";
          }
        }
      });

    console.log(myLibrary);
  };

  deleteBtnSelector.onclick = () => {
    bookshelf.removeChild(deleteBtnSelector.parentNode);
    let index = deleteBtnSelector.parentNode.getAttribute("data-index-number");
    myLibrary.splice(index, 1);
    updateBookCount();
  };
}

const exampleBook = new Book(
  "J.K. Rowling",
  "Harry Potter and the Philosopher's Stone",
  "352",
  "on"
);

addBookToLibrary(
  exampleBook.author,
  exampleBook.title,
  exampleBook.page,
  exampleBook.hasRead
);
