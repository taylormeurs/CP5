/*global axios */
/*global Vue */
var app = new Vue({
  el: '#shopping',
  data: {
    products: [],
    product: '',
    price: '',
    imageURL: '',
    ballot: [],
  },
  created: function() {
    this.getall();
  },
  methods: {
    addCandidate() {
      var url = "http://cs.taylormeurs.com:8080/voting";
      axios.post(url, {
          Name: this.product,
          votes: 0,
          price: this.price,
          imageURL: this.imageURL
        })
        .then(response => {
          console.log("Post Response ");
          console.log(response.data);
          this.products.push(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      console.log(this.products);
      this.product = "";
      this.price = "";
      this.imageURL = "";
    },
    deleteCandidate(product) {
      var index = this.products.indexOf(product);
      if (index > -1) {
        var url = "http://cs.taylormeurs.com:8080/voting/" + product._id;
        axios.delete(url)
          .then(response => {
            console.log(response.data.votes);
            this.getall();
          })
          .catch(e => {
            console.log(e);
          });
        console.log("URL " + url);
      }
    },
    upvote(product) {
      var url = "http://cs.taylormeurs.com:8080/voting/" + product._id + "/upvote";
      console.log("upvote URL " + url);
      axios.put(url)
        .then(response => {
          console.log(response.data.votes);
          product.votes = response.data.votes;
        })
        .catch(e => {
          console.log(e);
        });
    },
    async getall() {
      console.log("get all");
      var url = "http://cs.taylormeurs.com:8080/voting"; // This is the route we set up in index.js
      try {
        let response = await axios.get(url);
        this.products = response.data; // Assign array to returned response
        console.log(this.products);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    dovote() {
      console.log("In Dovote");
      for(var product of this.products) {
        if (product.selected) {
          this.upvote(product);
          this.ballot.push(product);
        }
      }
    },
  },
  computed: {
        sortedProducts() {
            return this.products.sort((a, b) => {
                var rval = 0;
                if(a.Name < b.Name) {
                    rval = -1;
                } else if(a.Name > b.Name) {
                    rval = 1;
                }
                return(rval);
            })
        },
        sortedSelectedProducts() {
            return this.ballot.sort((a, b) => {
                var rval = 0;
                if(a.Name < b.Name) {
                    rval = -1;
                } else if(a.Name > b.Name) {
                    rval = 1;
                }
                return(rval);
            })
        }

    },
});


