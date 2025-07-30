# MissBooks

MissBooks is a **book management web application** built as part of a coding academy project.  
It allows users to **browse, filter, add, edit, and review books** in a simple, user-friendly interface.

---

## Features

- **Browse Books** – View a list of available books with details (title, price, language, categories, and cover image).
- **Filter & Search** – Filter books by title, maximum price, language, and category.
- **Add / Edit Books** – Add new books to the collection or edit existing ones.
- **Book Details Page** – See extended details about each book.
- **Review System** – Add reviews with name, rating (0–5), and date read.
- **Responsive UI** – Optimized for desktop and mobile screens.

---

## Tech Stack

- **Frontend:**  
  - JavaScript (ES6)  
  - React (via CDN/Babel in development)  
  - CSS (custom styles, responsive grid)  

- **Other Tools:**  
  - `live-server` for local development  
  - LocalStorage for persisting book data

---

MissBooks/
├── assets/ # Static assets (images, styles)
│ ├── img/BooksImages # Book cover images
│ └── style/cmps # Component-specific CSS files
├── cmps/ # React components (BookList, BookPreview, etc.)
├── pages/ # Page-level components (Home, About, BookIndex)
├── services/ # Data handling and bookService (with localStorage)
├── books.js # Initial book seed data
├── app.js # Main app entry point
└── index.html # App container

## Project Structure

