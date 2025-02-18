<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">食物管理</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="foods" :headers="headers" :search="search">
          <template #top>
            <v-toolbar>
              <v-btn @click="openDialog(null)">新增商品</v-btn>
              <v-spacer></v-spacer>
              <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" variant="underlined" max-width="400"></v-text-field>
            </v-toolbar>
          </template>
          <template #[`item.image`]="{ value }">
            <v-img :src="value" height="50"></v-img>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.edit`]="{ item }">
            <v-btn icon="mdi-pencil" variant="text" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog.open" persistent>
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>{{ dialog.id? '編輯食物' : '新增食物' }}</v-card-title>
        <v-card-text >
          <v-text-field
            v-model="name.value.value"
            label="食物名稱"
            :error-messages="name.errorMessage.value"
          ></v-text-field>
          <v-select
          v-model="category.value.value"
          :error-messages="category.errorMessage.value"
          :items="categoryOptions"
          label="分類"
          item-title="text"
          item-value="value"
          ></v-select>
          <v-text-field
            v-model="calorie.value.value"
            label="熱量"
            :error-messages="calorie.errorMessage.value"
            type="number" min="0"
          ></v-text-field>
          <v-text-field
            v-model="moisture.value.value"
            label="水分"
            :error-messages="moisture.errorMessage.value"
            type="number" min="0"
          ></v-text-field>
          <v-text-field
            v-model="protein.value.value"
            label="蛋白質"
            :error-messages="protein.errorMessage.value"
            type="number" min="0"
          ></v-text-field>
          <v-text-field
            v-model="fat.value.value"
            label="脂肪"
            :error-messages="fat.errorMessage.value"
            type="number" min="0"
          ></v-text-field>
          <v-text-field
            v-model="carbo.value.value"
            label="碳水化合物"
            :error-messages="carbo.errorMessage.value"
            type="number" min="0"
          ></v-text-field>
          <v-text-field
            v-model="sodium.value.value"
            label="鈉"
            :error-messages="sodium.errorMessage.value"
            type="number" min="0"
          ></v-text-field>
          <v-text-field
            v-model="fibre.value.value"
            label="膳食纖維"
            :error-messages="fibre.errorMessage.value"
            type="number" min="0"
          ></v-text-field>
          <v-text-field
            v-model="cholesterol.value.value"
            label="膽固醇"
            :error-messages="cholesterol.errorMessage.value"
            type="number" min="0"
          ></v-text-field>
          <vue-file-agent
            ref="fileAgent"
            v-model="fileRecords" v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            max-size="1MB"
            :help-text="'點擊或拖曳檔案至此'"
            :error-text="{type: '檔案類型錯誤', size: '檔案大小超過限制'}"
          ></vue-file-agent>
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
import { useAxios } from '@/composables/axios';
import { useSnackbar } from 'vuetify-use-dialog';
import { reactive, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup'

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const foods = reactive([])
const search = ref('')
const headers =[
    { title: 'ID', key: '_id', sortable: true },
    { title: '圖片', key: 'image', sortable: false },
    { title: '名稱', key: 'name', sortable: true },
    { title: '分類', key: 'category', sortable: true },
    { title: '熱量(kcal)', key: 'calorie', sortable: true},
    { title: '水分(g)', key: 'moisture', sortable: true},
    { title: '蛋白質(g)', key: 'protein', sortable: true },
    { title: '脂肪(g)', key: 'fat', sortable: true },
    { title: '碳水化合物(g)', key: 'carbo', sortable: true},
    { title: '鈉(mg)', key: 'sodium', sortable: true },
    { title: '膳食纖維(g)', key: 'fibre', sortable: true },
    { title: '膽固醇(mg)', key: 'cholesterol', sortable: true },
    { title: '新增時間', key: 'createdAt', sortable: true },
    { title: '更新時間', key: 'updatedAt', sortable: true},
    { title: '編輯食物', key: 'edit', sortable: false},
]

const getFoods = async () => {
  try {
    const { data } = await apiAuth.get('/food/all')
    foods.push(...data.result)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '未知錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}
getFoods()

const dialog = ref({
  open: false,
  id: ''
})
const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id
    name.value.value = item.name
    category.value.value = item.category
    calorie.value.value = item.calorie
    moisture.value.value = item.moisture
    protein.value.value = item.protein
    fat.value.value = item.fat
    carbo.value.value = item.carbo
    sodium.value.value = item.sodium
    fibre.value.value = item.fibre
    cholesterol.value.value = item.cholesterol
  }
  dialog.value.open = true
}

const closeDialog = () => {
  resetForm()
  dialog.value.id = ''
  dialog.value.open = false
  fileAgent.value.deleteFileRecord()
}

const schema = yup.object({
  name: yup
    .string()
    .required('食物名稱必填'),
  calorie: yup
    .number()
    .typeError('輸入的值必為數字')
    .required('食物熱量必填')
    .min(0, '食物熱量不可為負數'),
  moisture: yup
    .number()
    .typeError('輸入的值必為數字')
    .required('食物水分必填')
    .min(0, '食物水分不可為負數'),
  protein: yup
    .number()
    .typeError('輸入的值必為數字')
    .required('食物蛋白質必填')
    .min(0, '食物蛋白質不可為負數'),
  fat: yup
    .number()
    .typeError('輸入的值必為數字')
    .required('食物脂肪必填')
    .min(0, '食物脂肪不可為負數'),
  carbo: yup
    .number()
    .typeError('輸入的值必為數字')
    .required('食物碳水必填')
    .min(0, '食物碳水不可為負數'),
  sodium: yup
    .number()
    .typeError('輸入的值必為數字')
    .required('食物鈉必填')
    .min(0, '食物鈉不可為負數'),
  fibre: yup
    .number()
    .typeError('輸入的值必為數字')
    .required('食物纖維必填')
    .min(0, '食物纖維不可為負數'),
  cholesterol: yup
    .number()
    .typeError('輸入的值必為數字')
    .required('食物膽固醇必填')
    .min(0, '食物膽固醇不可為負數'),
  category: yup
    .string()
    .required('食物分類必填')
    .oneOf([
          '穀物類',
          '糕餅點心類',
          '加工調理',
          '肉類',
          '蔬菜類',
          '魚貝類',
          '蛋類',
          '堅果種子類',
          '豆類',
          '油脂類',
          '飲料類',
          '水果類',
          '乳品類',
          '調味料及辛香料類',
          '其他類',
        ], '食物分類不符'),
})
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    category: '',
    calorie: 0,
    moisture: 0,
    protein: 0,
    fat: 0,
    carbo: 0,
    sodium: 0,
    fibre: 0,
    cholesterol: 0
  }
})
const name = useField('name')
const calorie = useField('calorie')
const moisture = useField('moisture')
const protein = useField('protein')
const fat = useField('fat')
const carbo = useField('carbo')
const sodium = useField('sodium')
const fibre = useField('fibre')
const cholesterol = useField('cholesterol')
const category = useField('category')
const categoryOptions = [
  { text: '穀物類', value: '穀物類' },
  { text: '糕餅點心類', value: '糕餅點心類' },
  { text: '加工調理', value: '加工調理' },
  { text: '肉類', value: '肉類' },
  { text: '蔬菜類', value: '蔬菜類' },
  { text: '魚貝類', value: '魚貝類' },
  { text: '蛋類', value: '蛋類' },
  { text: '堅果種子類', value: '堅果種子類' },
  { text: '豆類', value: '豆類' },
  { text: '油脂類', value: '油脂類' },
  { text: '飲料類', value: '飲料類' },
  { text: '水果類', value: '水果類' },
  { text: '乳品類', value: '乳品類' },
  { text: '調味料及辛香料類', value: '調味料及辛香料類' },
  { text: '其他類', value: '其他類' },]

const fileAgent = ref([null])
const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error)  return
  if (dialog.value.id.length === 0 && fileRecords.value.length === 0) {
    createSnackbar({
      text: '圖片必填',
      snackbarProps: {
        color: 'red'
      }
    })
    return
  }

  try {
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('category', values.category)
    fd.append('calorie', values.calorie)
    fd.append('moisture', values.moisture)
    fd.append('protein', values.protein)
    fd.append('fat', values.fat)
    fd.append('carbo', values.carbo)
    fd.append('sodium', values.sodium)
    fd.append('fibre', values.fibre)
    fd.append('cholesterol', values.cholesterol)

    if (fileRecords.value.length > 0) {
      fd.append('image',fileRecords.value[0].file)
    }

    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/food/' + dialog.value.id, fd)
    } else {
      const {data} = await apiAuth.post('/food', fd)
      console.log(data)
    }

    foods.splice(0, foods.length)
    getFoods()
    createSnackbar({
      text: dialog.value.length > 0? '編輯成功' : '新增成功',
      snackbarProps: {
        color: 'success'
      }
    })
    closeDialog()
  } catch (error) {
    console.log(error)
  }
})

</script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: '食物管理'
</route>
