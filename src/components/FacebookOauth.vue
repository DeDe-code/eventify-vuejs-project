<template>
  <div>
    <button @click="signInWithFacebook"><slot></slot></button>
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

    const signInWithFacebook = async () => {
      try {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'facebook' })
        if (error) throw error
        router.push({ name: 'home' })
      } catch (error) {
        errorMsg.value = error.message
      }
    }
    return { signInWithFacebook }
  }
}
</script>

<style lang="scss" scoped></style>
