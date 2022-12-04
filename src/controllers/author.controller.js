import Author from "../models/author.model.js";
import Book from "../models/book.model.js";

export const getIndex = (req, res) => {
  Book.findAll()
    .then((result) => {
      const booksResult = result.map((result) => result.dataValues);

      Author.findAll()
        .then((result) => {
          const authorsResult = result.map((result) => result.dataValues);

          // Find how many books with each author.
          const authors = authorsResult.map((author) => {
            const count = booksResult.filter(
              (book) => book.authorId === author.id
            ).length;
            return {
              id: author.id,
              name: author.name,
              email: author.email,
              count: count,
            };
          });

          res.render("../views/author/index", {
            pageTitle: "Autores",
            authorsActive: true,
            authors: authors,
            hasAuthors: authorsResult.length > 0,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCreate = (req, res) => {
  res.render("../views/author/save", {
    pageTitle: "Crear autores",
    authorsActive: true,
    editMode: false,
  });
};

export const postCreate = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  Author.create({
    name: name,
    email: email,
  })
    .then(() => {
      res.redirect("/authors");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEdit = (req, res) => {
  const id = req.params.authorId;

  Author.findOne({ where: { id: id } })
    .then((result) => {
      const author = result.dataValues;

      if (!author) {
        return res.redirect("/authors");
      }

      res.render("../views/author/save", {
        pageTitle: "Crear Autores",
        author: author,
        authorsActive: true,
        editMode: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postEdit = (req, res) => {
  const id = req.body.authorId;
  const name = req.body.name;
  const email = req.body.email;

  Author.update({ name: name, email: email }, { where: { id: id } })
    .then(() => {
      return res.redirect("/authors");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDelete = (req, res) => {
  const id = req.params.authorId;

  Author.findOne({ where: { id: id } })
    .then((result) => {
      const author = result.dataValues;

      if (!author) {
        return res.redirect("/authors");
      }

      res.render("../views/author/delete", {
        pageTitle: "Borrar Autores",
        author: author,
        authorsActive: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postDelete = (req, res) => {
  const id = req.body.authorId;

  Author.destroy({ where: { id: id } })
    .then(() => {
      return res.redirect("/authors");
    })
    .catch((err) => {
      console.log(err);
    });
};
