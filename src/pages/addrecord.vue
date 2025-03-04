<template>
    <v-container max-width="1600">
      <h1>新增飲食紀錄</h1><br>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="search" prepend-icon="mdi-magnify"></v-text-field>
        </v-col>
        <v-col cols="12">
          <div style="color: red;">以下為食物每100克的含量</div>
        </v-col>
        <v-col v-for="food of filteredFood" :key="food._id" cols="12" md="6" lg="3">
          <food-card v-bind="food" :is-link="false" @click-food="() => handleFoodClick(food)"></food-card>
        </v-col>
        <v-col cols="12">
          <v-pagination v-model="currentPage" :length="totalPage"></v-pagination>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog.open" persistent max-width="500">
      <v-form :disabled="isSubmitting" @submit.prevent="submit">
        <v-card>
          <v-card-title>新增飲食紀錄</v-card-title>
          <v-card-text>
            <v-text-field
            v-model="foodName"
            label="食物名稱"
            disabled
            ></v-text-field>
            <v-text-field
            v-model="quantity.value.value"
            label="份數"
            type="number"
            min="0"
            ></v-text-field>
            <v-select
            v-model="time.value.value"
            label="時段"
            :items="timeOptions"
            item-title="text"
            item-value="value"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeDialog">取消</v-btn>
            <v-btn type="submit" :loading="isSubmitting">確認</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAxios } from '@/composables/axios';
import FoodCard from '@/components/Foodcard.vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup'
import { useSnackbar } from 'vuetify-use-dialog';
import router from '@/router';


const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()


const currentPage = ref(1)
const totalPage = computed(()=>Math.ceil(foods.value.length/ITEMS_PER_PAGE))

const ITEMS_PER_PAGE = 12

const foods = ref([])
const search = ref('')
const foodName = ref('');
const filteredFood = computed(() => {
  return foods.value.filter(food => food.name.toLowerCase().includes(search.value.toLowerCase()))
  .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
})

const getFoods = async () => {
  try {
    const { data } = await apiAuth.get('/food')
    foods.value.push(...data.result)
  } catch (error) {
    console.log(error)
  }
}
getFoods()

const dialog = ref({
  open: false,
  food: null
})


const handleFoodClick = (food) => {
  console.log('Selected food id: ', food)
  dialog.value.food = food
  dialog.value.open = true
  console.log('有開嗎' + dialog.value.open)
}

const closeDialog = () => {
  dialog.value.food = null
  dialog.value.open = false
}


watch(() => dialog.value.food, (newFood) => {
  foodName.value = newFood ? newFood.name : ''
  console.log('新選中的食物:', newFood)
  console.log('foodName:', foodName.value)
})


const timeOptions = [
  {text: '早餐', value: '早餐'},
  {text: '午餐', value: '午餐'},
  {text: '晚餐', value: '晚餐'},
]

const schema = yup.object({
  quantity: yup
    .number()
    .typeError('輸入的值必為數字')
    .required('份量必填')
    .min(0, '分量不可為負數'),
  time: yup
    .string()
    .required('紀錄時段必填')
    .oneOf([
      '早餐',
      '午餐',
      '晚餐',
    ],'時段分類不符')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    quantity: 1,
    time: '早餐'
  }
})
const quantity = useField('quantity')
const time = useField('time')

const submit = handleSubmit(async (values) => {
  console.log(values)
  try {
    const fd = new FormData()
    fd.append('food', dialog.value.food._id)
    fd.append('quantity', values.quantity)
    fd.append('time', values.time)

    for (let pair of fd.entries()) {
      console.log(pair[0] + ': ' + pair[1])
    }
    const { data } = await apiAuth.post('/record', fd)
    console.log(data.result)
    closeDialog()
    router.push('./record')
    createSnackbar({
      text: '飲食紀錄新增成功',
      snackbarProps: {
        color: 'success'
      }
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: '飲食紀錄新增失敗',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})

</script>

<route lang="yaml">
meta:
  layout: default
  login: false
  admin: false
  title: '熱量查詢'
</route>


