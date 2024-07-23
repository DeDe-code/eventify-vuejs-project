<template>
  <div class="max-w-screen-md mx-auto px4 py-10">
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
    <div class="p-8 flex items-start bg-colors-buff-md rounded-md shadow-lg">
      <form @submit.prevent="sendEventDataToSupabase" class="flex flex-col gp-y-5 w-full">
        <h1 class="text-2xl text-colors-corn-silk">Create your event</h1>

        <!-- Event Name -->
        <div class="flex flex-col mt-4">
          <label for="event-name" class="mb-1 text-sm text-colors-beige-light">Event name</label>
          <input
            type="text"
            required
            id="event-name"
            class="p-1 text-gray-500 focus:outline-none"
            v-model="eventName"
          />
        </div>

        <!-- Event Organizer Info -->
        <div class="flex flex-col gap-y-3">
          <div class="flex flex-col mt-4">
            <h3>Event Organizer Info</h3>
            <label for="event-organizer" class="mb-1 text-sm text-colors-beige-light"
              >Event Organizer</label
            >
            <input
              type="text"
              required
              id="event-organizer"
              class="p-1 text-gray-500 focus:outline-none"
              v-model="eventOrganizer"
            />
          </div>
          <div class="flex flex-col mt-4">
            <label for="organizer-phone" class="mb-1 text-sm text-colors-beige-light">Phone</label>
            <input
              type="tel"
              required
              id="organizer-phone"
              class="p-1 text-gray-500 focus:outline-none"
              v-model="eventOrganizerPhone"
            />
          </div>

          <div class="flex flex-col mt-4">
            <label for="organizer-email" class="mb-1 text-sm text-colors-beige-light">Email</label>
            <input
              type="email"
              required
              id="organizer-email"
              class="p-1 text-gray-500 focus:outline-none"
              v-model="eventOrganizerEmail"
            />
          </div>
        </div>

        <!-- Event Location -->
        <div class="flex flex-col mt-4">
          <h3>Event Location</h3>
          <label for="event-country" class="mb-1 text-sm text-colors-beige-light">Country</label>
          <input
            type="text"
            required
            id="event-country"
            class="p-1 text-gray-500 focus:outline-none"
            v-model="eventCountry"
          />
        </div>
        <div class="flex flex-col mt-4">
          <label for="event-county" class="mb-1 text-sm text-colors-beige-light">County</label>
          <input
            type="text"
            required
            id="event-county"
            class="p-1 text-gray-500 focus:outline-none"
            v-model="eventCounty"
          />
        </div>

        <div class="flex flex-col mt-4">
          <label for="event-city" class="mb-1 text-sm text-colors-beige-light">City</label>
          <input
            type="text"
            required
            id="event-city"
            class="p-1 text-gray-500 focus:outline-none"
            v-model="eventCity"
          />
        </div>

        <div class="flex flex-col mt-4">
          <label for="event-address" class="mb-1 text-sm text-colors-beige-light">Address</label>
          <input
            type="text"
            required
            id="event-address"
            class="p-1 text-gray-500 focus:outline-none"
            v-model="eventAddress"
          />
        </div>

        <div class="flex flex-col mt-4">
          <label for="event-zip" class="mb-1 text-sm text-colors-beige-light">Zip code</label>
          <input
            type="number"
            required
            id="event-zip"
            class="p-1 text-gray-500 focus:outline-none"
            v-model="eventZipCode"
          />
        </div>

        <!-- Event date -->
        <div class="flex flex-col gap-y-3 mt-4">
          <h3>Event date</h3>
          <div class="flex flex-col">
            <label for="event-start" class="mb-1 text-sm text-colors-beige-light">Start</label>
            <input
              type="datetime-local"
              required
              id="event-start"
              class="p-1 text-gray-500 focus:outline-none"
              v-model="eventStartTime"
            />
          </div>
          <div class="flex flex-col">
            <label for="event-end" class="mb-1 text-sm text-colors-beige-light">End</label>
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
        <div class="flex flex-col mt-4">
          <h3>Event description</h3>
          <label for="event-description" class="mb-1 text-sm text-colors-beige-light"
            >Description</label
          >
          <textarea
            rows="6"
            cols="20"
            required
            id="event-description"
            class="p-1 text-gray-500 focus:outline-none"
            v-model="eventDescription"
          ></textarea>
        </div>

        <!-- Event Background Image -->
        <div class="flex flex-col mt-4">
          <h3>Event Background</h3>
          <label for="background-upload" class="mt-2">Upload an event background image</label>
          <input type="file" id="background-upload" @change="handleFileInputChange" />
        </div>

        <button
          type="submit"
          class="mt-6 p-3 rounded-sm self-start text-sm bg-colors-tea-green duration-200 border-solid border-2 border-transparent hover:border-colors-papaya-whip hover:bg-colors-beige-light"
        >
          Add Event
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
import { uid } from 'uid'
// import { uuid } from 'vue3-uuid'
export default {
  setup() {
    // Create data

    // User info
    const userId = ref('')
    const userEmail = ref('')

    // Event Basic Info Location
    let eventId = uid()
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
        .upload(`${eventId}.png`, backgroundImage)
      if (error) {
        console.log(error.message)
        return
      }
    }

    const gatheringEventData = () => {
      eventData.value.push({
        eventId: eventId,
        eventName: eventName.value,
        eventOrganizer: eventOrganizer.value,
        eventOrganizerPhone: eventOrganizerPhone.value,
        eventOrganizerEmail: eventOrganizerEmail.value,
        eventCountry: eventCountry.value,
        eventCounty: eventCountry.value,
        eventCity: eventCity.value,
        eventAddress: eventAddress.value,
        eventZipCode: eventZipCode.value,
        eventStartTime: eventStartTime.value,
        eventEndTime: eventEndTime.value,
        eventDescription: eventDescription.value
      })
    }

    const sendEventDataToSupabase = async () => {
      gatheringEventData()
      sendBackgroundImageToSupabase()

      try {
        const { error } = await supabase.from('events').insert([
          {
            event: eventData.value,
            user_id: userId.value,
            user_email: userEmail.value
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
