<template>
  <div v-if="dataLoaded" class="mt-10 mb-10">
    <div v-for="info in eventInfo" :key="info.eventId" class="flex flex-col max-w-4xl mx-auto">
      <div
        class="w-full h-56 relative overflow-hidden border-b-2 border-gray-300 rounded-md shadow-md"
      >
        <img
          :src="`${cdnUrl}/${backgroundImageName}.png`"
          alt="eventBackground"
          class="w-full block bg-cover z-0"
        />
        <h1 class="absolute bottom-32 left-10 text-3xl text-colors-beige-light">
          {{ info.eventName }}
        </h1>
      </div>

      <div class="flex flex-col w-ful">
        <!-- Description -->
        <div
          class="flex flex-col w-full justify-between mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md"
        >
          <h2 class="text-green-800">Description</h2>
          <p>{{ info.eventDescription }}</p>
        </div>

        <!-- Event Date -->
        <div
          class="flex flex-col w-full justify-between mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md"
        >
          <h2 class="text-green-800">Event Date</h2>
          <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
            <h3>Start</h3>
            <p>{{ info.eventStartTime }}</p>
          </div>
          <div class="flex w-full justify-between mt-4">
            <h3>End</h3>
            <p>{{ info.eventEndTime }}</p>
          </div>
        </div>

        <!-- Event Location -->
        <div
          class="flex flex-col w-full justify-between mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md"
        >
          <h2 class="text-green-800">Location</h2>
          <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
            <h3>Country</h3>
            <p>{{ info.eventCountry }}</p>
          </div>
          <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
            <h3>Province</h3>
            <p>{{ info.eventCounty }}</p>
          </div>
          <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
            <h3>City</h3>
            <p>{{ info.eventCity }}</p>
          </div>
          <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
            <h3>Street Address</h3>
            <p>{{ info.eventAddress }}</p>
          </div>
          <div class="flex w-full justify-between mt-4">
            <h3>Postal Code</h3>
            <p>{{ info.eventZipCode }}</p>
          </div>
        </div>

        <!-- Event Organizer -->
        <div
          class="flex flex-col w-full justify-between mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md"
        >
          <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
            <h3 class="text-green-800">Organizer</h3>
            <p>{{ info.eventOrganizer }}</p>
          </div>
          <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
            <h3>Phone</h3>
            <p>{{ info.eventOrganizerPhone }}</p>
          </div>
          <div class="flex w-full justify-between mt-4">
            <h3>Email</h3>
            <p>{{ info.eventOrganizerEmail }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
export default {
  setup() {
    const eventInfo = ref([])
    const dataLoaded = ref(null)
    const backgroundImages = ref([])
    const eventId = ref('')
    const backgroundImageName = ref('')
    const cdnUrl =
      'https://ugwhorxlnqbyedgqikec.supabase.co/storage/v1/object/public/event-background'

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
