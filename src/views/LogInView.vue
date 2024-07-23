<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-gray-500 shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Login -->
    <form @submit.prevent="login" class="p-8 flex-col bg-gray-500 rounded-md shadow-lg">
      <h1 class="text-3xl text-green-500 mb-4">Log In</h1>
      <div class="flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-green-500">Email</label>
        <input
          type="text"
          required
          class="p2 text-gray-500 focus: outline-none"
          id="email"
          v-model="email"
        />
      </div>

      <div class="flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-green-500">Password</label>
        <input
          type="text"
          required
          class="p2 text-gray-500 focus: outline-none"
          id="password"
          v-model="password"
        />
      </div>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-green-300 duration-200 border-solid border-2 border-transparent hover: border-white hover:bg-white hover:text-green-500"
      >
        Login
      </button>
      <router-link :to="{ name: 'signup' }"
        >Don't have an account<span class="bg-orange-500 p-4">SignUp</span></router-link
      >
    </form>
    <GoogleOauth>Login with Google</GoogleOauth>
    <FacebookOauth>Login with Facebook</FacebookOauth>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
import { useRouter } from 'vue-router'
import GoogleOauth from '@/components/GoogleOauth.vue'
import FacebookOauth from '@/components/FacebookOauth.vue'
export default {
  name: 'login',
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
