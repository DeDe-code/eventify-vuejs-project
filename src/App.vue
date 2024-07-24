<template>
  <div v-if="appReady">
    <TheNavigation />
    <Suspense>
      <router-view :key="$route.path"></router-view>
    </Suspense>
  </div>
</template>
<script>
import { ref } from 'vue'
import { supabase } from './supabase/init'
import store from '@/store/index'
import TheNavigation from '@/components/TheNavigation.vue'
export default {
  components: { TheNavigation },
  setup() {
    const appReady = ref(null)

    // check to see if user is already logged in
    const user = supabase.auth.getUser()

    // if user doesn't exist, need to make app ready
    if (!user) {
      appReady.value = true
    }

    // runs when there ia a auth state change
    // if user is logged in, this will fire
    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session)
      appReady.value = true
    })
    return { appReady }
  }
}
</script>

<style lang="scss" scoped></style>
