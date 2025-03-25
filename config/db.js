const { Sequelize } = require("sequelize");

// const db = new Sequelize("kommanda", "root", "Odil5060", {
<<<<<<< HEAD
//   host: "localhost",
//   dialect: "mysql",
//   logging: false,
// });

// const db = new Sequelize("prosta", "root", "1234", {
=======
>>>>>>> c18ed1e9c97ef034171e0c6742a7693e93d02f0f
//   host: "localhost",
//   dialect: "mysql",
//   logging: false,
// });

<<<<<<< HEAD
const db = new Sequelize("fen", "root", "billybutcher1", {
  host: "localhost",
  dialect: "mysql",
});
=======
const db = new Sequelize("az", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  logging:false
});

// const db = new Sequelize("fen", "root", "billybutcher1", {
//   host: "localhost",
//   dialect: "mysql",
// });
>>>>>>> c18ed1e9c97ef034171e0c6742a7693e93d02f0f

async function connectDb() {
  try {
    await db.authenticate();
    console.log("db connected");
    // await db.sync({ force: true });
    // console.log("db synced");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connectDb, db };
