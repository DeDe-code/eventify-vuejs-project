<template>
  <div class="flex justify-between items-center max-w-7xl mx-auto py-8 border-b-2 border-gray-300">
    <router-link :to="{ name: 'home' }">
      <h1 class="pl-5 font-bold text-2xl text-green-800 xl:pl-0">Eventify</h1>
    </router-link>

    <ul class="hidden w-full justify-end gap-10 sm:flex sm:pr-5 xl:pr-0">
      <router-link :to="{ name: 'home' }" class="hover:text-green-800">Home</router-link>
      <router-link v-if="user" :to="{ name: 'createEvent' }" class="hover:text-green-800">
        Create Event
      </router-link>
      <router-link v-if="user" :to="{ name: 'myEvents' }" class="hover:text-green-800">
        MyEvents
      </router-link>
      <router-link v-if="user" :to="{ name: 'profile' }" class="hover:text-green-800">
        MyProfile
      </router-link>
      <router-link v-if="!user" :to="{ name: 'signup' }" class="hover:text-green-800">
        SignUp
      </router-link>
      <router-link v-if="!user" :to="{ name: 'login' }" class="hover:text-green-800">
        LogIn</router-link
      >
      <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
    </ul>
  </div>
</template>

<script>
import { supabase } from '@/supabase/init'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store/index'

export default {
  setup() {
    const user = computed(() => store.state.user)
    // setup  a ref to router
    const router = useRouter()

    // logout function
    const logout = async () => {
      await supabase.auth.signOut()
      router.push({ name: 'home' })
      console.log("i'm out")
    }

    return { user, logout }
  }
}
</script>

<style lang="scss" scoped></style>
