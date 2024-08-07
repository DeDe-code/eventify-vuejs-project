<template>
  <div class="max-w-screen-md mx-auto px4 py-10 mb-25">
    <!-- Status Message -->
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-colors-tea-green rounded-md shadow-lg">
      <p class="text-green-300">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>
  </div>

  <form @submit.prevent="sendUserDataToSupabase">
    <div class="flex flex-col max-w-2xl mx-auto mt-6">
      <!-- Basic info -->
      <div class="flex flex-col p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h1 class="">Basic info</h1>
        <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
          <label for="profile-picture">Profile picture</label>
          <input type="file" id="profile-picture" @change="handleFileInputChange" />
        </div>
        <div class="flex flex-col w-full">
          <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
            <label for="birthday">Birthday</label>
            <input
              type="date"
              required
              id="birthday"
              v-model="userBirthday"
              class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
            />
          </div>
          <div class="flex w-full justify-between mt-4 border-b-2">
            <label for="name">Gender</label>
            <select
              required
              v-model="userGender"
              class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Contact info -->
      <div class="mt-6 flex flex-col p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h3 class="">Contact info</h3>

        <div class="flex justify-between my-4 border-b-2 border-gray-300">
          <label for="phone">Phone</label>
          <input
            type="tel"
            required
            id="phone"
            v-model="userPhone"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
          />
        </div>
      </div>

      <!-- Address -->
      <div class="mt-6 flex flex-col p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h3 class="">Address</h3>
        <div class="flex justify-between my-4 border-b-2 border-gray-300">
          <label for="country">Country</label>
          <input
            type="text"
            required
            id="country"
            v-model="userCountry"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
          />
        </div>
        <div class="flex justify-between my-4 border-b-2 border-gray-300">
          <label for="street-address">Street address</label>
          <input
            type="text"
            required
            id="street-address"
            v-model="userStreetAddress"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
          />
        </div>
        <div class="flex justify-between my-4 border-b-2 border-gray-300">
          <label for="postal-code">Postal code</label>
          <input
            type="text"
            required
            id="postal-code"
            v-model="userPostalCode"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
          />
        </div>
        <div class="flex justify-between my-4 border-b-2 border-gray-300">
          <label for="province">Province</label>
          <input
            type="text"
            required
            id="province"
            v-model="userProvince"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
          />
        </div>
        <div class="flex justify-between my-4 border-b-2 border-gray-300">
          <label for="city">City</label>
          <input
            type="text"
            required
            id="city"
            v-model="userCity"
            class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
          />
        </div>
      </div>
      <div class="flex gap-4">
        <router-link
          :to="{ name: 'profile' }"
          class="w-32 mt-4 p-3 text-center border-2 border-gray-300 shadow-md hover:border-blue-600"
        >
          Cancel
        </router-link>
        <button
          type="submit"
          class="w-32 mt-4 p-3 text-center border-2 border-gray-300 shadow-md hover:border-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
import { v4 } from 'uuid'
export default {
  setup() {
    // User authenticated variables
    const authenticatedUserId = ref('')
    const authenticatedUserEmail = ref('')

    // User info variables
    const userBirthday = ref('')
    const userGender = ref('')
    const userPhone = ref('')
    const userCountry = ref('')
    const userStreetAddress = ref('')
    const userPostalCode = ref('')
    const userProvince = ref('')
    const userCity = ref('')
    const userData = ref([])

    // Profile image variables
    const imageUrl = ref(null)
    let profileImage = null

    // Error Status messages
    const errorMsg = ref('')
    const statusMsg = ref('')

    // Get User Info
    const getUserInfo = async () => {
      try {
        const response = await supabase.auth.getUser()
        if (response) {
          const authenticatedUserData = response.data.user
          const { id, email } = authenticatedUserData
          console.log(authenticatedUserData)
          authenticatedUserId.value = id
          authenticatedUserEmail.value = email
          console.log(authenticatedUserId.value)
        }
      } catch (error) {
        errorMsg.value = 'Error: there is no signed user'
      }
    }
    getUserInfo()

    // Uploading Profile Image
    const handleFileInputChange = async (event) => {
      profileImage = event.target.files[0]
      imageUrl.value = URL.createObjectURL(profileImage)
      console.log(imageUrl.value)
      if (!profileImage) return
    }

    const sendProfileImageToSupabase = async () => {
      const { error } = await supabase.storage
        .from('avatars')
        .upload(`/${authenticatedUserId.value}/avatar`, profileImage)
      if (error) {
        console.log(error.message)
        return
      }
    }

    const sendUserDataToSupabase = async () => {
      sendProfileImageToSupabase()

      try {
        const { error } = await supabase
          .from('profiles')
          .update([
            {
              birthday: userBirthday.value,
              gender: userGender.value,
              phone: userPhone.value,
              country: userCountry.value,
              province: userProvince.value,
              city: userCity.value,
              address: userStreetAddress.value,
              postal_code: userPostalCode.value
            }
          ])
          .eq('id', authenticatedUserId.value)
        if (error) throw error
        statusMsg.value = 'Success: Event created!'
        userBirthday.value = ''
        userGender.value = ''
        userPhone.value = ''
        userCountry.value = ''
        userProvince.value = ''
        userCity.value = ''
        userStreetAddress.value = ''
        userPostalCode.value = ''
        profileImage.value = ''
        setTimeout(() => {
          statusMsg.value = false
        }, 5000)
      } catch (error) {
        errorMsg.value = `Error:${error.message}`
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
      console.log(userData)
    }

    return {
      statusMsg,
      errorMsg,
      userBirthday,
      userGender,
      userPhone,
      userCountry,
      userStreetAddress,
      userPostalCode,
      userProvince,
      userCity,
      handleFileInputChange,
      sendUserDataToSupabase
    }
  }
}
</script>

<style lang="scss" scoped></style>
