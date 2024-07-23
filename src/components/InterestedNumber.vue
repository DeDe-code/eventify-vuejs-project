<template>
  <div>
    <label for="interested-check">
      <input @click="handleInterestedNumber" type="checkbox" v-model="interestedStatus" />
      {{ interestedNumber }}
      {{ interestedStatus }}
    </label>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
export default {
  setup() {
    const interestedNumber = ref(0)
    const interestedStatus = ref(false)
    const finalInterestedNumber = ref([])

    const handleInterestedNumber = () => {
      if (!interestedStatus.value) {
        interestedNumber.value += 1
        finalInterestedNumber.value.push(interestedNumber.value)
        console.log(finalInterestedNumber.value.length)
        return
      }
      if (interestedStatus.value) {
        interestedNumber.value -= 1
        finalInterestedNumber.value.pop()
        console.log(finalInterestedNumber.value.length)
        return
      }
    }

    return { interestedNumber, interestedStatus, handleInterestedNumber }
  }
}
</script>

<style lang="css" scoped></style>
