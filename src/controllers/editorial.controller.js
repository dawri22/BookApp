import Editorial from "../models/editorial.model.js";
import Book from "../models/book.model.js";

export const getIndex = (req, res) => {
  Book.findAll()
    .then((result) => {
      const booksResult = result.map((result) => result.dataValues);

      Editorial.findAll()
        .then((result) => {
          const editorialsResult = result.map((result) => result.dataValues);

          // Find how many books with each editorial.
          const editorials = editorialsResult.map((editorial) => {
            const count = booksResult.filter(
              (book) => book.editorialId === editorial.id
            ).length;
            return {
              id: editorial.id,
              name: editorial.name,
              phone: editorial.phone,
              country: editorial.country,
              count: count,
            };
          });

          res.render("../views/editorial/index", {
            pageTitle: "Editoriales",
            editorialsActive: true,
            editorials: editorials,
            hasEditorials: editorialsResult.length > 0,
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
  res.render("../views/editorial/save", {
    pageTitle: "Crear Editorial",
    editorialsActive: true,
    editMode: false,
  });
};

export const postCreate = (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const country = req.body.country;

  Editorial.create({
    name: name,
    phone: phone,
    country: country,
  })
    .then(() => {
      res.redirect("/editorials");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEdit = (req, res) => {
  const id = req.params.editorialId;

  Editorial.findOne({ where: { id: id } })
    .then((result) => {
      const editorial = result.dataValues;

      if (!editorial) {
        return res.redirect("/editorials");
      }

      res.render("../views/editorial/save", {
        pageTitle: "Crear Editorial",
        editorial: editorial,
        editorialsActive: true,
        editMode: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postEdit = (req, res) => {
  const id = req.body.editorialId;
  const name = req.body.name;
  const phone = req.body.phone;
  const country = req.body.country;

  Editorial.update(
    { name: name, phone: phone, country: country },
    { where: { id: id } }
  )
    .then(() => {
      return res.redirect("/editorials");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDelete = (req, res) => {
  const id = req.params.editorialId;

  Editorial.findOne({ where: { id: id } })
    .then((result) => {
      const editorial = result.dataValues;

      if (!editorial) {
        return res.redirect("/editorials");
      }

      res.render("../views/editorial/delete", {
        pageTitle: "Borrar Editorial",
        editorial: editorial,
        editorialsActive: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postDelete = (req, res) => {
  const id = req.body.editorialId;

  Editorial.destroy({ where: { id: id } })
    .then(() => {
      return res.redirect("/editorials");
    })
    .catch((err) => {
      console.log(err);
    });
};
