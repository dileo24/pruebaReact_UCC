const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { fnProfesiones, fnUsuarios, fnPosts } = require("./src/loadDB.js");

conn.sync({ force: true }).then(async () => {
  server.listen(3001, async () => {
    await fnProfesiones();
    await fnUsuarios();
    await fnPosts();
    console.log("%s listening at 3001");
  });
});
