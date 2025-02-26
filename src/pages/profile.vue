<template>
  <v-container  max-md-width="1600">
    <h1 style="margin-bottom: 20px;">個人資料</h1>
      <div class="d-md-flex text-center mx-auto" style="max-width: 1000px; margin-top: 50px;">
        <v-row>
        <v-avatar size="200" style="border: 1px solid black; margin-top: 10px; display: inline-block;" color="#89BE99"><v-img :src="profile.avatar"></v-img></v-avatar>
      </v-row>
      <v-row>
        <v-col cols="12" style="font-size: 20px;">帳號: {{ profile.account }}</v-col>
        <v-col cols="12" style="font-size: 20px;">信箱: {{ profile.email }}</v-col>
        <v-col cols="12" style="font-size: 20px;">體重: {{ profile.weight }} 公斤</v-col>
        <v-col cols="12" style="font-size: 20px;">基本所需的熱量: {{ profile.weight * 30 }} kcal</v-col>
      </v-row>
      <v-btn icon="mdi-pencil" color="#495F41" @click="openDialog()"></v-btn>
      </div>


  </v-container>
  <v-dialog v-model="dialog.open" persistent  max-width="600">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>編輯個人資料</v-card-title>
        <v-card-text>
          <v-text-field
          v-model="tempProfile.account"
          label="帳號"
          disabled
        ></v-text-field>
        <v-text-field
          v-model="tempProfile.email"
          label="信箱"
          disabled
        ></v-text-field>
        <v-text-field
          v-model="weight.value.value"
          label="體重"
          type="number"
          :error-messages="weight.meta.errors"
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
import { ref } from 'vue'
import { useAxios } from '@/composables/axios';
import { useSnackbar } from 'vuetify-use-dialog';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup'

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const profile = ref({
  account: '',
  email: '',
  avatar: '',
  weight: 0,
})

const getProfile = async () => {
  try {
    const { data } = await apiAuth.get('/user/profile')
    console.log(data.result)
    profile.value = data.result
    tempProfile.value = { ...data.result }

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
getProfile()

const tempProfile = ref({
  account: '',
  email: '',
  avatar: '',
  weight: 0,
})

const dialog = ref({
  open: false,
})

const openDialog = () => {
  dialog.value.open = true
}

const closeDialog = () => {
  dialog.value.open = false
  fileAgent.value.deleteFileRecord()
}

const schema = yup.object({
  weight: yup
    .number()
    .typeError('輸入的值必為數字')
    .required('體重必填')
    .min(0, '體重不可為負數')
})
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: { weight: 0 }
})
const weight = useField('weight')

const fileAgent = ref([null])
const fileRecords = ref([])
const rawFileRecords = ref([])


const submit = handleSubmit(async (values) => {
  console.log('Submit triggered', values)

  if (fileRecords.value[0]?.error) return
  try {
    const fd = new FormData()
    fd.append('weight', values.weight)

    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    await apiAuth.patch('/user/edit', fd)

    console.log(tempProfile.value.weight)
    profile.value.weight = values.weight
    getProfile()
    createSnackbar({
      text: '編輯成功',
      snackbarProps: {
        color: 'success'
      }
    })
    closeDialog()
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '編輯失敗，請稍後再試',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})

</script>

<route lang="yaml">
meta:
  login: true
  admin: false
  title: '個人頁面'
</route>
