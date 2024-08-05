<template>
  <div v-if="dataLoaded" class="flex flex-col max-w-6xl mx-auto border-2 border-red-700">
    <div class="flex gap-x-4 mt-10 mb-10">
      <router-link
        v-for="info in eventInfo"
        :key="info.id"
        class="flex flex-col max-w-sm"
        :to="{ name: 'event', params: { eventId: info.id } }"
      >
        <div
          class="w-full h-56 relative overflow-hidden border-b-2 border-gray-300 rounded-md shadow-md"
        >
          <img
            :src="`${cdnUrl}/${info.id}/background`"
            alt="eventBackground"
            class="w-full block bg-cover z-0"
          />
          <h1 class="absolute bottom-32 left-10 text-3xl text-colors-beige-light">
            {{ `${info.name}test is working` }}
          </h1>
        </div>
        <!-- Event Date -->
        <div
          class="flex flex-col w-full justify-between mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md"
        >
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
      </router-link>
    </div>
    <router-link
      :to="{ name: 'createEvent' }"
      class="max-w-48 mt-4 p-6 text-center border-2 border-gray-300 rounded-md shadow-md hover:border-blue-600"
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
