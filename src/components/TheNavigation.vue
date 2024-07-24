<template>
  <div class="w-full border-b-2 border-gray-300">
    <div class="max-w-7xl mx-auto p-5">
      <ul class="w-full flex justify-end gap-10">
        <router-link :to="{ name: 'home' }">Home</router-link>
        <router-link v-if="user" :to="{ name: 'createEvent' }">Create Event</router-link>
        <router-link v-if="user" :to="{ name: 'myEvents' }">MyEvents</router-link>
        <router-link v-if="user" :to="{ name: 'profile' }">MyProfile</router-link>
        <router-link v-if="!user" :to="{ name: 'signup' }">SignUp</router-link>
        <router-link v-if="!user" :to="{ name: 'login' }">LogIn</router-link>
        <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
      </ul>
    </div>
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
