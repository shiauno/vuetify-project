<template>
  <v-card
  :to=" isLink ? '/food/' + _id : undefined"
  style="background-color: #89BE99; color: black;"
  @click="handleClick" >
    <v-img :src="image" height="200" cover style="background-color: white;"></v-img>
    <v-card-title style="font-weight: bold;">{{ name }}</v-card-title>
    <v-card-subtitle>分類: {{ category}}</v-card-subtitle>
    <v-card-text>熱量: {{ calorie }} kcal</v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  calorie: {
    type: Number,
    default: 0
  },
  isLink: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['clickFood'])
function handleClick() {
  if (!props.isLink) {
    // 當 isLink 為 false 時，只發送事件，不跳轉
    emit('clickFood', props._id);
  }
}
</script>
