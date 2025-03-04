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
  <v-container  max-width="1600" class="text-center" style="margin-top: 100px;">
    <!-- <v-img src="https://cdn.blog.health2sync.com/wp-content/uploads/2021/07/23151655/j7irES8.png.webp" width="700" class="img"></v-img> -->
    <h1>歡迎來到食兼管理</h1>
    <p>在這裡，您可以查詢食物的熱量和營養成分，記錄您的飲食，並管理個人飲食目標。</p>
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

<style scoped>
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
