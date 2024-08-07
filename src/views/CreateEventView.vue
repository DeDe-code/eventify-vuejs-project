<template>
  <div class="flex flex-col max-w-screen-md mx-auto mb-20 py-10">
    <!-- Status Message -->
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-colors-tea-green rounded-md shadow-lg">
      <p class="text-green-300">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <!-- Create form -->
    <!-- <div class="p-8 flex items-start border-2 border-green-800"> -->
    <form @submit.prevent="sendEventDataToSupabase" class="flex flex-col gp-y-5 w-4/5 mx-auto">
      <h1 class="text-2xl text-green-800">Create your event</h1>

      <!-- Event Name -->
      <div
        class="flex flex-col mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md md:flex-row md:justify-between"
      >
        <label for="event-name" class="mb-1 text-sm">Event name</label>
        <input
          type="text"
          required
          id="event-name"
          class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
          v-model="eventName"
        />
      </div>

      <!-- Event Organizer Info -->
      <div class="flex flex-col gap-y-2 mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h2 class="text-green-800">Event Organizer Info</h2>
        <div class="flex flex-col mt-4 border-b-2 border-gray-300 md:flex-row md:justify-between">
          <label for="event-organizer" class="mb-1 text-sm">Event Organizer</label>
          <input
            type="text"
            required
            id="event-organizer"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
            v-model="eventOrganizer"
          />
        </div>
        <div class="flex flex-col mt-4 border-b-2 border-gray-300 md:flex-row md:justify-between">
          <label for="organizer-phone" class="mb-1 text-sm">Phone</label>
          <input
            type="tel"
            required
            id="organizer-phone"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
            v-model="eventOrganizerPhone"
          />
        </div>

        <div class="flex flex-col mt-4 border-b-2 border-gray-300 md:flex-row md:justify-between">
          <label for="organizer-email" class="mb-1 text-sm">Email</label>
          <input
            type="email"
            required
            id="organizer-email"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
            v-model="eventOrganizerEmail"
          />
        </div>
      </div>

      <!-- Event Location -->
      <div class="flex flex-col gap-y-2 mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h2 class="text-green-800">Event Location</h2>
        <div class="flex flex-col mt-4 border-b-2 border-gray-300 md:flex-row md:justify-between">
          <label for="event-country" class="mb-1 text-sm">Country</label>
          <input
            type="text"
            required
            id="event-country"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
            v-model="eventCountry"
          />
        </div>
        <div class="flex flex-col mt-4 border-b-2 border-gray-300 md:flex-row md:justify-between">
          <label for="event-county" class="mb-1 text-sm">County</label>
          <input
            type="text"
            required
            id="event-county"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
            v-model="eventCounty"
          />
        </div>

        <div class="flex flex-col mt-4 border-b-2 border-gray-300 md:flex-row md:justify-between">
          <label for="event-city" class="mb-1 text-sm">City</label>
          <input
            type="text"
            required
            id="event-city"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
            v-model="eventCity"
          />
        </div>

        <div class="flex flex-col mt-4 border-b-2 border-gray-300 md:flex-row md:justify-between">
          <label for="event-address" class="mb-1 text-sm">Address</label>
          <input
            type="text"
            required
            id="event-address"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
            v-model="eventAddress"
          />
        </div>

        <div class="flex flex-col mt-4 border-b-2 border-gray-300 md:flex-row md:justify-between">
          <label for="event-zip" class="mb-1 text-sm">Postal Code</label>
          <input
            type="number"
            required
            id="event-zip"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
            v-model="eventZipCode"
          />
        </div>
      </div>

      <!-- Event date -->
      <div class="flex flex-col gap-y-2 mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h2 class="text-green-800">Event date</h2>
        <div class="flex flex-col mt-4 border-b-2 border-gray-300">
          <label for="event-start" class="mb-1 text-sm">Start</label>
          <input
            type="datetime-local"
            required
            id="event-start"
            class="p-1 text-gray-500 focus:outline-none"
            v-model="eventStartTime"
          />
        </div>
        <div class="flex flex-col mt-4 border-b-2 border-gray-300">
          <label for="event-end" class="mb-1 text-sm">End</label>
          <input
            type="datetime-local"
            required
            id="event-end"
            class="p-1 text-gray-500 focus:outline-none"
            v-model="eventEndTime"
          />
        </div>
      </div>

      <!-- Event description -->
      <div class="flex flex-col gap-y-2 mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h2 class="text-green-800">Event description</h2>
        <div class="flex flex-col mt-4">
          <label for="event-description" class="mb-1 text-sm">Description</label>
          <textarea
            rows="6"
            cols="20"
            required
            id="event-description"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
            v-model="eventDescription"
          ></textarea>
        </div>
      </div>

      <!-- Event Background Image -->
      <div class="flex flex-col gap-y-2 mt-4 p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h2 class="text-green-800">Event Background</h2>
        <div class="flex flex-col mt-4 border-b-2 border-gray-300 md:flex-row md:justify-between">
          <label for="background-upload" class="mt-2">Upload an event background image</label>
          <input type="file" id="background-upload" @change="handleFileInputChange" />
        </div>
      </div>

      <button
        type="submit"
        class="w-32 mt-4 p-3 text-center border-2 border-gray-300 shadow-md hover:border-blue-600"
      >
        Add Event
      </button>
    </form>
    <!-- </div> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
import { v4 } from 'uuid'
export default {
  setup() {
    // Create data

    // User info
    const userId = ref('')
    const userEmail = ref('')

    // Event Basic Info Location
    const id = v4()
    const eventName = ref('')
    const eventDescription = ref('')

    // Event Location Info Variables
    const eventCountry = ref('')
    const eventCounty = ref('')
    const eventCity = ref('')
    const eventAddress = ref('')
    const eventZipCode = ref('')

    // Event Organizer Info Variables
    const eventOrganizer = ref('')
    const eventOrganizerPhone = ref('')
    const eventOrganizerEmail = ref('')
    const labels = ref([])

    // Event Date Variables
    const eventStartTime = ref('')
    const eventEndTime = ref('')

    // Event Background Img Variables
    let backgroundImage = null
    const imageUrl = ref(null)

    // Interested Number Variables
    // const interestsNumber = ref(0)
    const statusMsg = ref(null)
    const errorMsg = ref(null)

    // Event collector data
    const eventData = ref([])

    // Get User Info
    const getUserInfo = async () => {
      try {
        const response = await supabase.auth.getUser()
        if (response) {
          const userData = response.data.user
          console.log(userData)
          const { id, email } = userData
          userId.value = id
          userEmail.value = email
        }
      } catch (error) {
        errorMsg.value = 'Error: there is no signed user'
      }
    }
    getUserInfo()

    // Uploading Background Image
    const handleFileInputChange = async (event) => {
      backgroundImage = event.target.files[0]
      imageUrl.value = URL.createObjectURL(backgroundImage)
      console.log(imageUrl.value)
      if (!backgroundImage) return
    }

    const sendBackgroundImageToSupabase = async () => {
      const { error } = await supabase.storage
        .from('event-background')
        .upload(`${id}/background`, backgroundImage)
      if (error) {
        console.log(error.message)
        return
      }
    }

    const sendEventDataToSupabase = async () => {
      sendBackgroundImageToSupabase()

      try {
        const { error } = await supabase.from('events').insert([
          {
            id: id,
            user_id: userId.value,
            email: eventOrganizerEmail.value,
            name: eventName.value,
            organizer: eventOrganizer.value,
            phone: eventOrganizerPhone.value,
            country: eventCountry.value,
            province: eventCountry.value,
            city: eventCity.value,
            address: eventAddress.value,
            postal_code: eventZipCode.value,
            start: eventStartTime.value,
            end: eventEndTime.value,
            description: eventDescription.value
          }
        ])
        if (error) throw error
        statusMsg.value = 'Success: Event created!'
        eventName.value = ''
        eventOrganizer.value = ''
        eventOrganizerPhone.value = ''
        eventOrganizerEmail.value = ''
        eventCountry.value = ''
        eventCounty.value = ''
        eventCity.value = ''
        eventAddress.value = ''
        eventZipCode.value = ''
        eventStartTime.value = ''
        eventEndTime.value = ''
        eventDescription.value = ''
        imageUrl.value = ''
        backgroundImage.value = ''
        setTimeout(() => {
          statusMsg.value = false
        }, 5000)
      } catch (error) {
        errorMsg.value = `Error:${error.message}`
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
      console.log(eventData)
    }

    return {
      eventName,
      eventOrganizer,
      eventOrganizerPhone,
      eventOrganizerEmail,
      eventCountry,
      eventCounty,
      eventCity,
      eventAddress,
      eventZipCode,
      eventStartTime,
      eventEndTime,
      eventDescription,
      labels,
      imageUrl,
      statusMsg,
      errorMsg,
      handleFileInputChange,
      eventData,
      sendEventDataToSupabase
    }
  }
}
</script>

<style lang="scss" scoped></style>
