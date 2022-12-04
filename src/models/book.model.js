import Sequelize from "sequelize";
import database from "../helpers/database.helper.js";

const Book = database.define("book", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  publicationYear: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imagePath: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Book;
