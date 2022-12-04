import Book from "../models/book.model.js";
import Category from "../models/category.model.js";
import Author from "../models/author.model.js";
import Editorial from "../models/editorial.model.js";

let categories = [];

const getAllCategories = () => {
  Category.findAll()
    .then((result) => {
      categories = [];
      const categoriesResult = result.map((result) => result.dataValues);
      categories = categoriesResult;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getIndex = (req, res) => {
  getAllCategories();

  Book.findAll({
    include: [{ model: Category }, { model: Author }, { model: Editorial }],
  })
    .then((result) => {
      const books = result.map((result) => result.dataValues);

      res.render("../views/home/index", {
        pageTitle: "Home",
        homeActive: true,
        books: books,
        categories: categories,
        hasBooks: books.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getByFilters = (req, res) => {
  getAllCategories();

  const title = req.body.title;
  const categoryIds = req.body.categoryId;
  console.log(categoryIds);
  const relationships = [
    { model: Category },
    { model: Author },
    { model: Editorial },
  ];

  const render = (books) => {
    res.render("../views/home/index", {
      pageTitle: "Home",
      homeActive: true,
      books: books,
      categories: categories,
      hasBooks: books.length > 0,
    });
  };

  if (title === "" && categoryIds === undefined) {
    Book.findAll({ include: relationships })
      .then((result) => {
        render(result.map((result) => result.dataValues));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (title !== "") {
    Book.findAll({
      where: { title: title },
      include: relationships,
    })
      .then((result) => {
        render(result.map((result) => result.dataValues));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (categoryIds !== undefined) {
    Book.findAll({
      where: { categoryId: categoryIds },
      include: relationships,
    })
      .then((result) => {
        render(result.map((result) => result.dataValues));
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const getBook = (req, res) => {
  const bookId = req.params.bookId;

  Book.findOne({
    where: { id: bookId },
    include: [{ model: Category }, { model: Author }, { model: Editorial }],
  })
    .then((result) => {
      const book = result.dataValues;

      if (!book) {
        return res.redirect("/");
      }

      res.render("../views/home/book", {
        pageTitle: "Home",
        homeActive: true,
        book: book,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
