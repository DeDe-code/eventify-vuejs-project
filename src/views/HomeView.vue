<template>
  <div v-if="dataLoaded">
    <div v-for="info in eventInfo" :key="info.eventId">
      <h1>{{ info.eventName }}</h1>
    </div>
    <!-- <img :src="`${cdnUrl}/${backgroundImageName}.png`" alt="" /> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
export default {
  setup() {
    const eventInfo = ref([])
    console.log(eventInfo)
    const dataLoaded = ref(null)
    const backgroundImages = ref([])
    const cdnUrl =
      'https://ugwhorxlnqbyedgqikec.supabase.co/storage/v1/object/public/event-background'
    const eventId = ref('')
    console.log(eventId.value)
    const backgroundImageName = ref('')

    // Get data from supabase
    const getEventInfo = async () => {
      try {
        const response = await supabase.from('events').select('*')
        if (response) {
          dataLoaded.value = true
          eventId.value = response.data[0].event[0].eventId
          eventInfo.value = response.data[0].event
        }
      } catch (error) {
        console.warn(error.message)
      }
    }

    // Get Background Image
    const getBackgroundImage = async () => {
      const { data } = await supabase.storage.from('event-background').list('')
      backgroundImages.value.push(data)
      const backgroundImagesName = backgroundImages.value[0].map((image) => {
        const name = image.name.slice(0, -4)
        return name
      })
      backgroundImageName.value = backgroundImagesName.find((item) => item === eventId.value)
    }

    // Run getData Function
    getEventInfo()
    getBackgroundImage()

    return { eventInfo, dataLoaded, cdnUrl, backgroundImageName }
  }
}
</script>

<style lang="scss" scoped></style>
