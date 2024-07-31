<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-gray-500 shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Login -->
    <form
      @submit.prevent="login"
      class="p-8 flex-col border-2 border-gray-300 rounded-md shadow-md"
    >
      <h1 class="text-3xl text-green-800 mb-4">Log In</h1>
      <div class="flex w-full justify-center items-center gap-x-10 mb-2">
        <label for="email" class="mb-1 text-sm">Email</label>
        <input
          type="text"
          required
          class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
          id="email"
          v-model="email"
        />
      </div>

      <div class="flex w-full justify-center items-center gap-x-4 mb-2">
        <label for="password" class="mb-1 text-sm">Password</label>
        <input
          type="text"
          required
          class="p-1 text-white focus:outline-none bg-gray-400 rounded-md"
          id="password"
          v-model="password"
        />
      </div>
      <div class="flex justify-between items-center">
        <button
          type="submit"
          class="w-32 mt-4 p-3 text-center border-2 border-gray-300 shadow-md hover:border-blue-600"
        >
          Login
        </button>
        <p>or</p>
        <router-link
          :to="{ name: 'signup' }"
          class="w-32 mt-4 p-3 text-center border-2 border-gray-300 shadow-md hover:border-blue-600"
          >SignUp</router-link
        >
      </div>
    </form>
    <GoogleOauth
      class="max-w-screen-sm mx-auto mt-4 p-6 border-2 border-gray-300 rounded-md shadow-md hover:border-blue-600"
      >Login with Google</GoogleOauth
    >
    <FacebookOauth
      class="max-w-screen-sm mx-auto mt-4 p-6 border-2 border-gray-300 rounded-md shadow-md hover:border-blue-600"
      >Login with Facebook</FacebookOauth
    >
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
import { useRouter } from 'vue-router'
import GoogleOauth from '@/components/GoogleOauth.vue'
import FacebookOauth from '@/components/FacebookOauth.vue'
export default {
  components: { GoogleOauth, FacebookOauth },
  setup() {
    const router = useRouter()
    const email = ref(null)
    const password = ref(null)
    const errorMsg = ref(null)

    const login = async () => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value
        })
        if (error) throw error
        router.push({ name: 'home' })
      } catch (error) {
        errorMsg.value = error.message
      }
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    }

    return { email, password, errorMsg, login }
  }
}
</script>

<style lang="scss" scoped></style>
