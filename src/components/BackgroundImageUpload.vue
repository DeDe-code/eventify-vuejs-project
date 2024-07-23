<template>
  <div class="mt-4">
    <label for="background-upload"></label>
    <input type="file" id="background-upload" @change="handleFileInputChange" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
export default {
  setup() {
    const fileInput = ref(null)
    const imageUrl = ref(null)

    const handleFileInputChange = async (event) => {
      const file = event.target.files[0]
      if (!file) return

      const { error } = await supabase.storage
        .from('event-background')
        .upload(`event-background_${Date.now()}.png`, file)
      if (error) {
        console.log(error.message)
        return
      }
      imageUrl.value = URL.createObjectURL(file)
    }

    return {
      fileInput,
      imageUrl,
      handleFileInputChange
    }
  }
}
</script>

<style lang="scss" scoped></style>
