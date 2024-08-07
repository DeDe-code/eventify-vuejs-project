<template>
  <div v-if="dataLoaded" class="max-w-7xl mx-auto mb-20 md:grid grid-cols-3 gap-0 shadow-2xl">
    <div v-for="info in eventInfo" :key="info.id" class="flex flex-col mx-auto max-w-sm">
      <router-link :to="{ name: 'event', params: { eventId: info.id } }">
        <div
          class="flex flex-col gap-4 justify-between w-4/5 mx-auto mt-8 overflow-hidden shadow-2xl"
        >
          <h1 class="text-2xl text-green-800">
            {{ info.name }}
          </h1>
          <div>
            <img
              :src="`${cdnUrl}/${info.id}/background`"
              alt="eventBackground"
              class="w-full block bg-cover z-0"
            />
          </div>
          <div class="flex-col w-full justify-between p-4">
            <h2 class="text-green-800">Event Date</h2>
            <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
              <h3>Start</h3>
              <p>{{ info.start }}</p>
            </div>
            <div class="flex w-full justify-between mt-4">
              <h3>End</h3>
              <p>{{ info.end }}</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <router-link
      :to="{ name: 'createEvent' }"
      class="hidden max-w-48 mt-4 p-6 text-center border-2 border-gray-300 rounded-md shadow-md hover:border-blue-600"
      >Create your event</router-link
    >
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
export default {
  setup() {
    const eventInfo = ref([])
    const dataLoaded = ref(null)
    const cdnUrl =
      'https://ugwhorxlnqbyedgqikec.supabase.co/storage/v1/object/public/event-background'

    // Get data from supabase
    const getEventInfo = async () => {
      try {
        const response = await supabase.from('events').select('*')
        if (response) {
          console.log(response.data)
          dataLoaded.value = true
          eventInfo.value = response.data
        }
      } catch (error) {
        console.warn(error.message)
      }
    }

    // Run getData Function
    getEventInfo()

    return { eventInfo, dataLoaded, cdnUrl }
  }
}
</script>

<style lang="scss" scoped></style>
