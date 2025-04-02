const { Sequelize } = require("sequelize");

// const db = new Sequelize("n17", "root", "Odil5060", {
//   host: "localhost",
//   dialect: "mysql",
//   logging: false,
// });

const db = new Sequelize("bir", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// const db = new Sequelize("exam3", "root", "billybutcher1", {
//   host: "localhost",
//   dialect: "mysql",
// });
// const db = new Sequelize(
//   "mysql://root:CfJTQGvpJbnQYBYJwelkoCMrbpEYgGyJ@shuttle.proxy.rlwy.net:39859/railway",
//   {
//     dialect: "mysql",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//     logging: false,
//   }
// );

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
