<script lang="ts" setup>
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
dayjs.locale('ja')

import { generate } from '~/models/generate'

const input = reactive({
  company: '',
  title: '',
  watchedDate: '',
  watchedTime: {
    hour: '',
    minute: '',
  },
  img: {
    src: '',
    width: 0,
    height: 0,
  },
})
const onChangeFile = (e: any) => {
  // dataURL形式でファイルを読み込む
  const reader = new FileReader()
  reader.onload = (e: any) => {
    input.img.src = e.target.result
    const img = new Image()
    img.onload = () => {
      input.img.width = img.width
      input.img.height = img.height
      console.log('img loaded', img.width, img.height)
      img.remove()
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}
const dateString = computed(() => {
  const date = dayjs(input.watchedDate)

  return `${date.format('YYYY/MM/DD')}`
})
const startAt = computed(() => {
  const hour = input.watchedTime.hour
  const minute = input.watchedTime.minute
  if (!hour || !minute) return ''
  return `${hour}:${minute}`
})

const tickettigen = async () => {
  await generate(
    {
      company: input.company,
      title: input.title,
      date: dateString.value,
      startAt: startAt.value,
    },
    // input.img,
  )
}
</script>

<template>
  <main class="h-screen w-screen flex flex-col justify-center items-center">
    <form class="flex flex-col gap-y-4">
      <label class="flex flex-col">
        <span class="text-lg">カンパニー</span>
        <input
          v-model="input.company"
          type="text"
          class="text-xl border border-grey-200 h-12 rounded-md p-2 w-full"
        />
      </label>
      <label class="flex flex-col">
        <span class="text-lg">タイトル</span>
        <input
          v-model="input.title"
          type="text"
          class="text-xl border border-grey-200 h-12 rounded-md p-2 w-full"
        />
      </label>
      <label class="flex flex-col">
        <span class="text-lg">鑑賞日</span>
        <input
          v-model="input.watchedDate"
          type="date"
          class="text-xl border border-grey-200 h-12 rounded-md p-2 w-full"
        />
      </label>
      <label class="flex flex-col">
        <span class="text-lg">開演時間</span>
        <div class="flex">
          <div class="after:content-[':'] after:ml-1 flex items-center">
            <input
              v-model="input.watchedTime.hour"
              type="number"
              class="w-16 text-xl border border-grey-200 h-12 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <input
              v-model="input.watchedTime.minute"
              type="number"
              class="w-16 text-xl border border-grey-200 h-12 rounded-md p-2 w-full"
            />
          </div>
        </div>
      </label>

      <!-- <label class="flex flex-col">
        <span class="text-lg">フライヤー</span>
        <input type="file" @change="onChangeFile" />
      </label> -->
      <div class="flex justify-end">
        <button type="button" @click="tickettigen">gen</button>
      </div>
    </form>
  </main>
</template>

<style scoped></style>
