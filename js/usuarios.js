const { createApp } = Vue;
createApp({
  data() {
    return {
      usuarios: [],
      //url:'http://localhost:5000/usuarios',
      // si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
      url: "https://equipo6.pythonanywhere.com/usuarios", // si ya lo subieron a pythonanywhere
      error: false,
      cargando: true,
      novalido:false,
      /*atributos para el guardar los valores del formulario */
      id: 0,
      username: "",
      password: "",
      mail: "",
      avatar: "",
      rol_id:1,
    };
  },
  methods: 
  {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.usuarios = data;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    
    eliminar(usuario) {
      const url = this.url + "/" + usuario;
      var options = {
        method: "DELETE",
      };
      fetch(url, options)
        .then((res) => res.text()) // or res.json()
        .then((res) => {
          location.reload();
        });
    },
    grabar() {
      let usuario = {
        username: this.username,
        password: this.password,
        mail: this.mail,
        avatar: this.avatar,
        rol_id: this.rol_id
      };
      var options = {
        body: JSON.stringify(usuario),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado");
          window.location.href = "../templates/usuarios.html";
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar");
        });
    },
    validar() {
      let condition=false;
      if (/^[a-z0-9][a-z0-9_]{4,20}$/.test(this.username)){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mail)){
          if(/^(https?:\/\/[\w-]+(\.[\w-]+)+(:\d+)?(\/\S*)?)\.(jpeg|jpg|png|gif|bmp|svg)$/i.test(this.avatar)){
            if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(this.password)){
              condition=true;
              this.novalido=false;
            };
            
          };
        };
      };
        
      if (condition){
        this.grabar();
      } else {
        this.novalido=true;
      }
    },
  },
  created() {
    this.fetchData(this.url);
  },

}).mount("#app");
