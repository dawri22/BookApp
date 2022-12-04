import Category from "../models/category.model.js";
import Book from "../models/book.model.js";

export const getIndex = (req, res) => {
  Book.findAll()
    .then((result) => {
      const booksResult = result.map((result) => result.dataValues);

      Category.findAll()
        .then((result) => {
          const categoriesResult = result.map((result) => result.dataValues);

          // Find how many books with each category.
          const categories = categoriesResult.map((category) => {
            const count = booksResult.filter(
              (book) => book.categoryId === category.id
            ).length;
            return {
              id: category.id,
              name: category.name,
              description: category.description,
              count: count,
            };
          });

          res.render("../views/category/index", {
            pageTitle: "Categorias",
            categoriesActive: true,
            categories: categories,
            hasCategories: categoriesResult.length > 0,
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
  res.render("../views/category/save", {
    pageTitle: "Crear Categorias",
    categoriesActive: true,
    editMode: false,
  });
};

export const postCreate = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  Category.create({
    name: name,
    description: description,
  })
    .then(() => {
      res.redirect("/categories");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEdit = (req, res) => {
  const id = req.params.categoryId;

  Category.findOne({ where: { id: id } })
    .then((result) => {
      const category = result.dataValues;

      if (!category) {
        return res.redirect("/categories");
      }

      res.render("../views/category/save", {
        pageTitle: "Crear Categorias",
        category: category,
        categoriesActive: true,
        editMode: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postEdit = (req, res) => {
  const id = req.body.categoryId;
  const name = req.body.name;
  const description = req.body.description;

  Category.update(
    { name: name, description: description },
    { where: { id: id } }
  )
    .then(() => {
      return res.redirect("/categories");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDelete = (req, res) => {
  const id = req.params.categoryId;

  Category.findOne({ where: { id: id } })
    .then((result) => {
      const category = result.dataValues;

      if (!category) {
        return res.redirect("/categories");
      }

      res.render("../views/category/delete", {
        pageTitle: "Borrar Categorias",
        category: category,
        categoriesActive: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postDelete = (req, res) => {
  const id = req.body.categoryId;

  Category.destroy({ where: { id: id } })
    .then(() => {
      return res.redirect("/categories");
    })
    .catch((err) => {
      console.log(err);
    });
};
