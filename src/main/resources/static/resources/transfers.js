const { createApp } = Vue;

const url = "/api/clients/current/transactions"

createApp({
  data() {
    return {
        clients: [],
        accounts: [],
        loading: false,
        showForm1: true,
        ammount: 0,
        description: "",
        originAccountNumber: "",
        destinyAccountNumber: "",
    };
  },
  created() {
    axios
        .get('/api/clients/currents')
        .then((response) => {
            this.clients = response.data;
            setTimeout(() => this.loading = false, 300);
            this.accounts = this.clients.accounts;
        })
        .catch((error) => console.log(error))
  },
  methods: {
    numberFormat(num) {
      let numString = num.toString().split('.')

      //La expresión regular /\B(?=(\d{3})+(?!\d))/g encuentra grupos de tres dígitos
      //seguidos por cualquier cantidad de grupos de tres dígitos adicionales y los
      //reemplaza por una coma. Esto crea el efecto de separación de miles.
      numString[0] = numString[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      return numString.join('.')
    },
    logout() {
      axios
      .post('http://localhost:8080/api/logout')
      .then((response) => {
          console.log('logged out');
          location.pathname = '/index.html';
      })
    },
    toggleForm() {
        this.showForm1 = !this.showForm1;
    },
    sendTransaction( ){
      axios
      .post('http://localhost:8080/api/transactions', `ammount=${this.ammount}&description=${this.description}&originAccountNumber=${this.originAccountNumber}&destinyAccountNumber=${this.destinyAccountNumber}`)
      .then((response) => {
        console.log('transaction sent')
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Transaction sent succesfully",
          color: "#fff",
          background: "#1c2754",
          confirmButtonColor: "#17acc9",
      });
      })
      .catch(error => {
        console.log(`ammount=${this.ammount}&description=${this.description}&originAccountNumber=${this.originAccountNumber}&destinyAccountNumber=${this.destinyAccountNumber}`)
        console.log(error);
        this.errorMessage(error.response.data)
      })
    },
    errorMessage(message) {
      Swal.fire({
        icon: "error",
        title: "An error has occurred",
        text: message,
        color: "#fff",
        background: "#1c2754",
        confirmButtonColor: "#17acc9",
    });
    }
  },
}).mount('#app');