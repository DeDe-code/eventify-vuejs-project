<template>
  <div>
    <div v-for="info in profileInfos" :key="info.id" class="flex flex-col max-w-2xl mx-auto mt-6">
      <!-- Basic info -->
      <div class="flex flex-col p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h1 class="text-green-800">Basic info</h1>
        <div class="flex w-full items-center justify-between mt-4 border-b-2 border-gray-300">
          <h3>Profile Picture</h3>
          <div class="mb-2">
            <img
              v-if="profilePictureName"
              :src="`${profileImageUrl}`"
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
            <p class="">{{ info.birthday }}</p>
          </div>
          <div class="flex w-full justify-between mt-4 border-b-2">
            <p class="">Gender</p>
            <p class="">{{ info.gender }}</p>
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
          <p class="">{{ info.phone }}</p>
        </div>
      </div>

      <!-- Address -->
      <div class="mt-6 flex flex-col p-4 border-2 border-gray-300 rounded-md shadow-md">
        <h3 class="">Address</h3>
        <div class="flex justify-between my-4 border-b-2 border-gray-300">
          <p class="">Home</p>
          <p class="">{{ info.country }}, {{ info.province }}, {{ info.city }}{{ info.address }}</p>
        </div>
      </div>
      <div class="flex justify-between">
        <router-link
          :to="{ name: 'profileForm' }"
          class="w-32 mt-4 p-3 text-center border-2 border-gray-300 shadow-md hover:border-blue-600"
          >Edit Profile</router-link
        >
        <button
          @click="deleteProfile"
          :to="{ name: 'profileForm' }"
          class="w-42 mt-4 p-3 text-white text-center shadow-md bg-red-600"
        >
          Delete Profile
        </button>
      </div>
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
    const profileInfos = ref([])
    const userId = ref('')
    const dataLoaded = ref(null)
    const profilePictures = ref([])
    const profilePictureName = ref('')
    const cdnUrl = 'https://ugwhorxlnqbyedgqikec.supabase.co/storage/v1/object/public/avatars'
    const profileImageUrl = ref('')

    // Error Status Messages
    const errorMsg = ref('')
    const statusMsg = ref('')

    // GET USER INFO FROM META
    const getUserInfo = async () => {
      try {
        const response = await supabase.auth.getUser()
        if (response) {
          console.log(response)
          const userData = response.data.user
          const { email, id } = userData
          userId.value = id
          console.log(userId.value)
          userEmail.value = email
          userName.value = userData.user_metadata.full_name
          avatarUrl.value = userData.user_metadata.avatar_url
        }
      } catch (error) {
        errorMsg.value = error.message
      }
    }
    getUserInfo()

    // GET PROFILE IMAGE
    const getProfileImage = async () => {
      try {
        const { data, error } = await supabase.storage.from('avatars').list('')
        if (error) throw error
        if (data) {
          profilePictures.value.push(data)
          const profilePicturesName = profilePictures.value[0].map((image) => {
            const name = image.name
            return name
          })

          profilePictureName.value = profilePicturesName.find((item) => item === userId.value)
          profileImageUrl.value = ` ${cdnUrl}/${profilePictureName.value}/avatar`
        }
      } catch (error) {
        errorMsg.value = error.message
      }
    }
    getProfileImage()

    // GET USER INFO FROM PROFILES TABLE
    const getProfileInfo = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select(userId.value)
        if (error) throw error
        profileInfos.value = data
        console.log(data)
      } catch (error) {
        errorMsg.value = error.message
      }
    }
    getProfileInfo()

    // DELETE PROFILE IMAGE
    const deleteProfileImage = async () => {
      try {
        const res = await supabase.storage.delete_bucket(userId.value)
        if (res) {
          statusMsg.value = 'Deleting Profile Image is successful'
        }
        console.log('done')
      } catch (error) {
        errorMsg.value = error.message
      }
    }

    // DELETE PROFILE FROM PROFILES TABLE
    const deleteProfile = async () => {
      try {
        const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', `${userId.value}/avatar`)
        if (error) throw error
        statusMsg.value = 'Deleting profile is successful'
      } catch (error) {
        errorMsg.value = error.message
        console.log(error)
      }
      deleteProfileImage()
    }

    return {
      profileInfos,
      userEmail,
      userName,
      avatarUrl,
      dataLoaded,
      cdnUrl,
      profilePictureName,
      profileImageUrl,
      deleteProfile
    }
  }
}
</script>

<style lang="scss" scoped></style>
