<template>
  <v-carousel
    height="500"
    show-arrows="hover"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item
    v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      cover
    >
    </v-carousel-item>
  </v-carousel>
  <v-container>
    <v-img src="https://cdn.blog.health2sync.com/wp-content/uploads/2021/07/23151655/j7irES8.png.webp" width="700" class="img"></v-img>

  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
          { src: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
          { src: 'https://images.pexels.com/photos/5466808/pexels-photo-5466808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
        ]
      }
    },
  }
</script>

<style>
  .img{
    margin-top: 150px;
    margin-bottom: 50px;
    display: inline-block;
  }
</style>

<route lang="yaml">
meta:
  login: false
  admin: false
  title: '首頁'
</route>
