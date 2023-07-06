console.log(location.search); // lee los argumentos pasados a este formulario
var id = location.search.substr(4);
console.log(id);
console.log(rol_id)
const { createApp } = Vue;
createApp({
  data() {
    return {
      id: 0,
      username: "",
      avatar: "",
      mail: "",
      password: "",
      rol_id:0,
      url: "https://equipo6.pythonanywhere.com/usuarios/" + id,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.id = data.id;
          this.username = data.username;
          this.avatar = data.avatar;
          this.mail = data.mail;
          this.password = "";
          this.rol_id= data.rol_id;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    modificar() {
      
      let usuario = {
        username: this.username,
        password: this.password,
        mail: this.mail,
        avatar: this.avatar,
        rol_id: this.rol_id
      };
      console.log(usuario.rol_id)
      var options = {
        body: JSON.stringify(usuario),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          
          alert("Registro modificado");
          window.location.href = "../templates/usuarios.html";
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Modificar");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
