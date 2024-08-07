<template>
  <div
    class="fixed bottom-0 left-0 right-0 z-10 opacity-1 w-full p-4 bg-white border-t-2 border-gray-300 sm:hidden"
  >
    <ul class="w-full flex justify-center gap-16">
      <router-link :to="{ name: 'home' }">
        <fa class="text-xl text-green-800" :icon="['fas', 'lines-leaning']"></fa>
      </router-link>
      <router-link v-if="user" :to="{ name: 'myEvents' }">
        <fa class="text-lg text-green-800" :icon="['fas', 'calendar']"></fa>
      </router-link>
      <router-link v-if="user" :to="{ name: 'createEvent' }">
        <fa class="text-lg text-green-800" :icon="['fas', 'circle-plus']"></fa>
      </router-link>
      <router-link v-if="user" :to="{ name: 'profile' }">
        <fa class="text-lg text-green-800" :icon="['fas', 'user']"></fa>
      </router-link>
      <router-link v-if="!user" :to="{ name: 'signup' }">
        <fa class="text-lg text-green-800" :icon="['fas', 'user-plus']"></fa>
      </router-link>
      <router-link v-if="!user" :to="{ name: 'login' }">
        <fa class="text-lg text-green-800" :icon="['fas', 'right-to-bracket']"></fa>
      </router-link>
      <li v-if="user" @click="logout" class="cursor-pointer">
        <fa class="text-lg" :icon="['fas', 'right-from-bracket']"></fa>
      </li>
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
