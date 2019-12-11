/*global axios */
/*global Vue */
var app = new Vue({
  el: '#santa',
  data: {
    presents: [],
    people: [],
    name: '',
    price: NaN,
    totalCost: 0,
    budget: NaN,
    imageURL: '',
    selectedGifts: [],
  },
  created: function() {
    this.getall();
  },
  methods: {
    addGift() {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      var url = "http://cs.taylormeurs.com:8080/gifting";
      axios.post(url, {
          Name: this.name,
          chosen: false,
          price: this.price,
          imageURL: this.imageURL
        })
        .then(response => {
          console.log("Post Response ");
          console.log(response.data);
          this.presents.push(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      console.log(this.presents);
      this.name = "";
      this.price = NaN;
      this.imageURL = "";
    },
    deletePresent(present) {
      var index = this.presents.indexOf(present);
      if (index > -1) {
        var url = "http://cs.taylormeurs.com:8080/gifting/" + present._id;
        axios.delete(url)
          .then(response => {
            console.log(response.data.chosen);
            this.getall();
          })
          .catch(e => {
            console.log(e);
          });
        console.log("URL " + url);
      }
    },
    selectGift(present) {
      var url = "http://cs.taylormeurs.com:8080/gifting/" + present._id + "/selectGift";
      console.log("selectGift URL " + url);
      axios.put(url)
        .then(response => {
          console.log(response.data.chosen);
          present.chosen = response.data.chosen;
        })
        .catch(e => {
          console.log(e);
        });
    },
    deselectGift(present) {
      var url = "http://cs.taylormeurs.com:8080/gifting/" + present._id + "/deselectGift";
      console.log("deselectGift URL " + url);
      axios.put(url)
        .then(response => {
          console.log(response.data.chosen);
          present.chosen = response.data.chosen;
        })
        .catch(e => {
          console.log(e);
        });
    },
    async getall() {
      console.log("get all");
      var url = "http://cs.taylormeurs.com:8080/gifting"; // This is the route we set up in index.js
      try {
        let response = await axios.get(url);
        this.presents = response.data; // Assign array to returned response
        console.log(this.presents);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    doselect() {
      console.log("In Doselect");
      this.selectedGifts = []
      for (var present of this.presents) {
        if (present.selected) {
          this.selectGift(present);
          this.selectedGifts.push(present);
        }
        else {
          this.deselectGift(present);
        }
      }
    },
  },
  computed: {
    chosenGifts() {
      this.selectedGifts = [];
      for (var present of this.presents) {
        if (present.chosen) {
          this.selectedGifts.push(present);
        }
      }
      return this.selectedGifts;
    },
    cost() {
      this.totalCost = 0;
      for (var present of this.presents) {
        if (present.chosen) {
          this.totalCost += present.price;
        }
      }
      return this.totalCost;
    }
    // sortedProducts() {
    //     return this.products.sort((a, b) => {
    //         var rval = 0;
    //         if(a.Name < b.Name) {
    //             rval = -1;
    //         } else if(a.Name > b.Name) {
    //             rval = 1;
    //         }
    //         return(rval);
    //     })
    // },

  }
});
