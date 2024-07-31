<template v-if="dataLoaded">
  <!-- App Msg -->
  <div v-if="statusMsg || errorMsg" class="max-w-screen-sm mx auto px-4 py-10">
    <p>{{ statusMsg }}</p>
    <p>errorMsg</p>
  </div>

  <!-- Event -->
  <div v-for="event in data" :key="event.id" class="max-w-4xl mx-auto mt-10 mb-10">
    <div class="flex flex-col">
      <div
        class="w-full h-56 relative overflow-hidden border-b-2 border-gray-300 rounded-md shadow-md"
      >
        <img
          :src="`${backgroundImageUrl}`"
          alt="eventBackground"
          class="w-full block bg-cover z-0"
        />
        <h1 class="absolute bottom-32 left-10 text-3xl text-colors-beige-light">
          {{ event.name }}
        </h1>
      </div>

      <div class="flex flex-col w-ful">
        <!-- Description -->
        <div
          class="flex flex-col w-full justify-between mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md"
        >
          <h2 class="text-green-800">Description</h2>
          <p>{{ event.description }}</p>
        </div>
      </div>

      <!-- Event Date -->
      <div
        class="flex flex-col w-full justify-between mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md"
      >
        <h2 class="text-green-800">Event Date</h2>
        <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
          <h3>Start</h3>
          <p>{{ event.start }}</p>
        </div>
        <div class="flex w-full justify-between mt-4">
          <h3>End</h3>
          <p>{{ event.end }}</p>
        </div>
      </div>

      <!-- Event Location -->
      <div
        class="flex flex-col w-full justify-between mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md"
      >
        <h2 class="text-green-800">Location</h2>
        <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
          <h3>Country</h3>
          <p>{{ event.country }}</p>
        </div>
        <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
          <h3>Province</h3>
          <p>{{ event.province }}</p>
        </div>
        <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
          <h3>City</h3>
          <p>{{ event.city }}</p>
        </div>
        <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
          <h3>Street Address</h3>
          <p>{{ event.address }}</p>
        </div>
        <div class="flex w-full justify-between mt-4">
          <h3>Postal Code</h3>
          <p>{{ event.postal_code }}</p>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-between">
      <button
        v-if="user"
        class="w-32 mt-4 p-3 text-center border-2 border-gray-300 shadow-md hover:border-blue-600"
        @click="editMode"
      >
        Edit Event
      </button>
      <button
        v-if="user"
        class="w-42 mt-4 p-3 text-white text-center shadow-md bg-red-600"
        @click="editMode"
      >
        Delete Event
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
    const errorMsg = ref('')
    const statusMsg = ref('')
    const route = useRoute()
    const user = computed(() => store.state.user)

    // GET CURRENT ID FORM ROUTE PARAMS
    const currentId = route.params.eventId

    // BACKGROUND IMAGE URL
    const cdnUrl =
      'https://ugwhorxlnqbyedgqikec.supabase.co/storage/v1/object/public/event-background'
    const backgroundImageUrl = `${cdnUrl}/${currentId}/background`

    // GET EVENT DATA
    const getEventData = async () => {
      try {
        let { data: events, error } = await supabase.from('events').select('*').eq('id', currentId)
        if (error) throw error
        data.value = events
        console.log(data.value)
        if (data.value) dataLoaded.value = true
      } catch (error) {
        errorMsg.value = error.message
      }
    }
    getEventData()

    // Edit Event
    const edit = ref(null)
    const editMode = () => {
      edit.value = !edit.value
    }

    return { statusMsg, errorMsg, data, dataLoaded, edit, editMode, user, backgroundImageUrl }
  }
}
</script>

<style lang="scss" scoped></style>
