<template>
  <!-- App Msg -->
  <div v-if="statusMsg || errorMsg" class="max-w-screen-sm mx auto px-4 py-10">
    <p>{{ statusMsg }}</p>
    <p>errorMsg</p>
  </div>

  <!-- Event -->
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
    </div>
    <div class="flex w-full gap-x-10">
      <button
        v-if="user"
        class="max-w-screen-sm mx-auto mt-4 p-6 border-2 border-gray-300 rounded-md shadow-md hover:border-blue-600"
        @click="editMode"
      >
        Edit
      </button>
      <button
        v-if="user"
        class="max-w-screen-sm mx-auto mt-4 p-6 text-white border-2 bg-red-700 shadow-md"
        @click="editMode"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { supabase } from '@/supabase/init'
import { useRoute } from 'vue-router'
import store from '@/store/index'
export default {
  setup() {
    const data = ref(null)
    const dataLoaded = ref(null)
    const errorMsg = ref(null)
    const statusMsg = ref(null)
    const route = useRoute()
    const user = computed(() => store.state.user)

    const currentId = route.params.eventId

    const getEventData = async () => {
      try {
        const { data: events, error } = await supabase
          .from('events')
          .select('*')
          .eg('id', currentId)
        if (error) throw error
        if (data.value) {
          data.value = events
          dataLoaded.value = true
        }
      } catch (error) {
        setTimeout(() => {
          errorMsg.value = error.message
        }, 5000)
      }
    }
    getEventData()

    // Edit Event
    const edit = ref(null)
    const editMode = () => {
      edit.value = !edit.value
    }

    return { statusMsg, errorMsg, dataLoaded, data, edit, editMode, user }
  }
}
</script>

<style lang="scss" scoped></style>
