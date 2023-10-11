const profesiones = require("./json/profesiones.json");
const usuarios = require("./json/usuarios.json");
const { encrypt } = require("./helpers/handleCrypt");
const { Usuario, Profesion, Post } = require("./db.js");
const axios = require("axios");

async function fnProfesiones() {
  for (const prof of profesiones) {
    await Profesion.create(prof);
  }
}

async function fnUsuarios() {
  for (const u of usuarios) {
    const user = await Usuario.create({
      nombre: u.nombre,
      apellido: u.apellido,
      email: u.email,
      domicilio: u.domicilio,
      clave: await encrypt(u.clave),
    });
    for (const profID of u.profesiones) {
      const profesion = await Profesion.findOne({
        where: { id: profID },
      });
      if (profesion) {
        await user.addProfesion(profesion);
      } else {
        console.log(`Profesión no encontrada: ${profID}`);
      }
    }
  }
}

async function fnPosts() {
  const postsResponse = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts = postsResponse.data.slice(0, 50);
  const usuariosDB = await Usuario.findAll();

  for (const post of posts) {
    const usuario = usuariosDB.find((user) => user.id === post.userId); // busca usuario en bd

    if (usuario) {
      const nuevoPost = await Post.create({
        titulo: post.title,
        cuerpo: post.body,
      });
      await nuevoPost.setUsuario(usuario); // asocia post con usuario
    } else {
      console.log(`Usuario no encontrado para el post con userId: ${userId}`);
    }
  }
}

module.exports = {
  fnProfesiones,
  fnUsuarios,
  fnPosts,
};
