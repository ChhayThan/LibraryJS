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
  createBookCard(book, myLibrary.length - 1);
}

function BookCard(book, index) {
  this.book = book;
  this.index = index;
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
          editBtnSelector.innerText = "Confirm Changes?";
        } else {
          editBtnSelector.innerText = "Edit";
          input.disabled = true;
        }
      });
  };

  deleteBtnSelector.onclick = () => {
    bookshelf.removeChild(deleteBtnSelector.parentNode);
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

// const editBtn = document.querySelector(".edit-btn");
// const deleteBtn = document.querySelector(".delete-btn");

// editBtn.onclick = () => {
//   document.querySelectorAll(".book  input").forEach((input) => {
//     if (input.disabled === true) {
//       input.disabled = false;
//       editBtn.innerText = "Confirm Changes?";
//     } else {
//       editBtn.innerText = "Edit";
//       input.disabled = true;
//     }
//   });
// };

// deleteBtn.onclick = () => {
//   bookshelf.removeChild(deleteBtn.parentNode);
// };
