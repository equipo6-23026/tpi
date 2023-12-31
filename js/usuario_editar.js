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
      password_backup:"",
      novalido:false,
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
          this.password_backup = data.password;
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
        mail: this.mail,
        avatar: this.avatar,
        rol_id: this.rol_id
      };
      if (this.password.length>0){
        usuario['password']=this.password;
      } 
      console.log(usuario);
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
    validar() {
      let condition=false;
        if (/^[a-z0-9][a-z0-9_]{4,20}$/.test(this.username)){
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mail)){
            if(/^(https?:\/\/[\w-]+(\.[\w-]+)+(:\d+)?(\/\S*)?)\.(jpeg|jpg|png|gif|bmp|svg)$/i.test(this.avatar)){
              if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(this.password)|this.password.length===0){
                condition=true;
                this.novalido=false;
              };
            };
          };
        };
        
      if (condition){
        this.modificar();
      } else {
        this.novalido=true;
      };
    },
  },
  
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
