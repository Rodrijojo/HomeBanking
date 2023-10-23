const { createApp } = Vue;

const url = "/api/clients/currents"

createApp({
  data() {
    return {
        client: [],
        loading: true,
        isDebit: false,         // Estas indicaran si hay o 
        isCredit: false,        // no tarjetas de este tipo
    };
  },
  created() {
    axios
        .get(url)
        .then((response) => {
            this.client = response.data;
            setTimeout(() => this.loading = false, 300);
        })
        .catch((error) => console.log(error))
  },
  methods: {
    crearLink(account) {
      return 'http://localhost:8080/web/account.html?id=' + account.id
    },
    numberFormat(num) {
      let numString = num.toString().split('.')

      //La expresión regular /\B(?=(\d{3})+(?!\d))/g encuentra grupos de tres dígitos
      //seguidos por cualquier cantidad de grupos de tres dígitos adicionales y los
      //reemplaza por una coma. Esto crea el efecto de separación de miles.
      numString[0] = numString[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      return numString.join('.')
    },

    dateFormat(date){
        const fechaFormateada = date.slice(5, 7) + ' / ' + date.slice(2, 4);

        return fechaFormateada;
    },

    cardNumberFormat(number) {
        return number.split("-")
    },

    debitOrCredit(card) {
        if(card.type == "CREDIT") {
            return "CREDIT";
        } else {
            return "DEBIT";
        }
    },
    thereIsDebit() {
        if (this.client.cards.some(card => card.type === "DEBIT")) {
          console.log("Debit card found");
          this.isDebit = true;
        }
      },
      thereIsCredit() {
        if (this.client.cards.some(card => card.type === "CREDIT")) {
          console.log("Credit card found");
          this.isCredit = true;
        }
      },
      getCardGradient(color) {
        if (color === 'TITANIUM') {
            return { 'background-image': 'linear-gradient(45deg, #111111, #222222)' };
        } else if (color === 'GOLD') {
            return { 'background-image': 'linear-gradient(45deg, #FFD700, #FFA500)' };
        } else if (color === 'SILVER') {
            return { 'background-image': 'linear-gradient(45deg, #C0C0C0, #808080)' };
        }
      },
      logout() {
        axios
        .post('api/logout')
        .then((response) => {
            console.log('logged out');
            location.pathname = '/index.html';
        })
      },
  },
  computed: {

  }
}).mount('#app');