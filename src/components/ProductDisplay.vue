<template>
  <div :class="product.style">
    <!-- loader -->
    <div v-show="isLoadData" class="container-loader">
      <span class="loader"></span>
    </div>

    <!-- background decoration -->
    <div class="bg-decoration">
      <img src="../../public/images/bg-pattern.svg" alt="bakcground pattern" />
    </div>

    <!-- catalog product -->
    <div v-show="!isUnavailable" class="container">
      <div :class="{ 'on-show-more': showFullText, 'card': true }">
        <p class="category-top-right" style="">{{ product.category }}</p>
        <div class="card-image">
          <img class="image-product" :src="product.image" alt="product image" />
        </div>
        <div class="card-description">
          <div class="card-description-header">
            <h3 class="text-600">{{ product.title }}</h3>
            <div class="card-description-header-rating">
              <p class="my-15 hide-category">{{ product.category }}</p>
              <div class="rating">
                <p v-if="product.rating">{{ product.rating.rate }}/5</p>
                <div v-if="product.rating" class="wrapper-bubble-range">
                <span v-for="n in product.rating.remain" :key="'remain-' + n" class="bubble-range"></span>
                <span v-for="m in 5 - product.rating.remain" :key="'outline-' + m" class="bubble-range outline"></span>
              </div>
                <!-- <div class="wrapper-bubble-range">
                  <span class="bubble-range"></span>
                  <span class="bubble-range"></span>
                  <span class="bubble-range"></span>
                  <span class="bubble-range outline"></span>
                </div> -->
              </div>
            </div>
          </div>
          <div :class="{'card-description-body': true, 'on-show-more-body' : showFullText}">

            <p v-if="showFullText">
              {{ product.description }}
            </p>
            <p class="limited-text" v-else>
              {{ product.description }}
            </p>
          </div>
          <a id="toogle-show-more" @click="toggleText">{{ showFullText ? "Read Less..." : "Read More..." }}</a>
          <div class="card-description-footer">
            <p class="text-600 fs-18 my-15">${{ product.price }}</p>
            <div class="card-description-navigate">
              <button class="btn btn-buy">Buy now</button>
              <button id="btn-next" @click="getProduct(idProduct)" class="btn btn-next">Next Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- unavailable product -->
    <div v-show="isUnavailable" class="container">
      <div class="card">

        <div class="wrapper-image-unavailable">
          <img class="unavailable-image" src="../../public/images/bg-sad-unavailable.svg" alt="unavailable product">
        </div>
        <div class="unavailable-navigate">
          <p>This product is unavailable to show</p>
          <button @click="getProduct(idProduct)" class="btn btn-unavailable">Next Product</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idProduct: 1,
      product: {},
      showFullText: false,
      isLoadData: false,
      isUnavailable: false
    };
  },
  methods: {
    async getProduct(id) {
      try {
        this.isLoadData = true;

        if (id > 20) {
          id = 1;
          this.idProduct = 1;
        }

        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();

        // set product
        this.setProduct(data);

        this.idProduct++;
      } catch (error) {
        console.log("Tidak ada data!");
      }finally{
        this.isLoadData = false;
      }
    },
    setProduct(data) {
      data.rating.remain = Math.round(data.rating.rate);

      if (data.category == "men's clothing") {
        data.style = "mens";
        this.product = data;
        this.isUnavailable = false;
      } else if (data.category == "women's clothing") {
        data.style = "women";
        this.product = data;
        this.isUnavailable = false;
      } else {
        this.isUnavailable = true;
        data.style = "unavailable";
        this.product = data;
      }

    },
    toggleText() {
      this.showFullText = !this.showFullText;
    },
  },
  mounted() {
    this.getProduct(this.idProduct);
  },
};
</script>
