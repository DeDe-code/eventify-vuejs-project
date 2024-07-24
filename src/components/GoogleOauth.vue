<template>
  <div>
    <button class="w-full" @click="signInWithGoogle"><slot></slot></button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const errorMsg = ref(null)

    const signInWithGoogle = async () => {
      try {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
        if (error) throw error
        router.push({ name: 'home' })
        console.log("i'm in")
      } catch (error) {
        errorMsg.value = error.message
      }
    }
    return { signInWithGoogle }
  }
}
</script>

<style lang="scss" scoped></style>
