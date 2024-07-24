<template>
  <div v-if="dataLoaded">
    <div class="flex flex-col max-w-2xl mx-auto mt-6">
      <!-- Basic info -->
      <div class="flex flex-col p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h1 class="text-green-800">Basic info</h1>
        <div class="flex w-full items-center justify-between mt-4 border-b-2 border-gray-300">
          <h3>Profile Picture</h3>
          <div class="mb-2">
            <img
              v-if="profilePictureName"
              :src="`${cdnUrl}/${profilePictureName}.png`"
              class="w-20 h-20 block bg-cover rounded-full"
            />
            <img v-else :src="avatarUrl" class="w-full block bg-cover rounded-full" />
          </div>
        </div>
        <div class="flex flex-col w-full">
          <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
            <p class="">Name</p>
            <p class="">{{ userName }}</p>
          </div>
          <div class="flex w-full justify-between mt-4 border-b-2 border-gray-300">
            <p class="">Birthday</p>
            <p class="">{{ userInfo.userBirthday }}</p>
          </div>
          <div class="flex w-full justify-between mt-4 border-b-2">
            <p class="">Gender</p>
            <p class="">{{ userInfo.userGender }}</p>
          </div>
        </div>
      </div>

      <!-- Contact info -->
      <div class="mt-6 flex flex-col p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h3 class="">Contact info</h3>
        <div class="flex justify-between my-4 border-b-2 border-gray-300">
          <p class="">Email</p>
          <p class="">{{ userEmail }}</p>
        </div>
        <div class="flex justify-between my-4 border-b-2 border-gray-300">
          <p class="">Phone</p>
          <p class="">{{ userInfo.userPhone }}</p>
        </div>
      </div>

      <!-- Address -->
      <div class="mt-6 flex flex-col p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h3 class="">Address</h3>
        <div class="flex justify-between my-4 border-b-2 border-gray-300">
          <p class="">Home</p>
          <p class="">{{ userInfo.userCity }}</p>
        </div>
      </div>
      <router-link
        :to="{ name: 'profileForm' }"
        class="w-32 mt-4 p-3 text-center border-2 border-gray-300 shadow-md hover:border-blue-600"
        >Edit Profile</router-link
      >
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
export default {
  async setup() {
    // Variables from supabse getUser
    const userName = ref('')
    const userEmail = ref('')
    const avatarUrl = ref('')

    // Variables for user profile
    const userInfo = ref([])
    const dataLoaded = ref(null)
    const profilePictures = ref([])
    const userId = ref('')
    const profilePictureName = ref('')
    const cdnUrl = 'https://ugwhorxlnqbyedgqikec.supabase.co/storage/v1/object/public/avatars'

    // Error Status Messages
    const errorMsg = ref('')

    // Get User Info
    const getUserInfo = async () => {
      try {
        const response = await supabase.auth.getUser()
        if (response) {
          const userData = response.data.user
          const { email } = userData
          userEmail.value = email
          userName.value = userData.user_metadata.full_name
          avatarUrl.value = userData.user_metadata.avatar_url
        }
      } catch (error) {
        errorMsg.value = error.message
      }
    }
    getUserInfo()

    // Get data from supabase
    const getUserData = async () => {
      try {
        const { data, error } = await supabase.from('users').select('*, events(*)')
        if (error) throw error
        if (data) {
          dataLoaded.value = true
          userId.value = data[0].user[0].userId
          userInfo.value = data[0].user[0]
        }
      } catch (error) {
        errorMsg.value = error.message
      }
    }

    // Get Profile Image
    const getProfileImage = async () => {
      try {
        const { data, error } = await supabase.storage.from('avatars').list('')
        if (error) throw error
        if (data) {
          profilePictures.value.push(data)
          const profilePicturesName = profilePictures.value[0].map((image) => {
            const name = image.name.slice(0, -4)
            return name
          })

          profilePictureName.value = profilePicturesName.find((item) => item === userId.value)
        }
      } catch (error) {
        errorMsg.value = error.message
      }
    }

    getUserData()
    getProfileImage()

    return { userInfo, userEmail, userName, avatarUrl, dataLoaded, cdnUrl, profilePictureName }
  }
}
</script>

<style lang="scss" scoped></style>
