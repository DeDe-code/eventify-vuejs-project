<template>
  <div class="flex flex-col gap-y-3 mt-4">
    <div class="flex flex-col">
      <label for="event-start" class="mb-1 text-sm text-colors-beige-light">Start</label>
      <input
        type="datetime-local"
        required
        id="event-start"
        class="p-1 text-gray-500 focus:outline-none"
        v-model="eventStart"
      />
    </div>
    <div class="flex flex-col">
      <label for="event-end" class="mb-1 text-sm text-colors-beige-light">End</label>
      <input
        type="datetime-local"
        required
        id="event-end"
        class="p-1 text-gray-500 focus:outline-none"
        v-model="eventEnd"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
export default {
  setup() {
    const eventStart = ref('')
    const eventEnd = ref('')
    const eventTimeInfo = ref([])

    const getEventTimeInfo = () => {
      eventTimeInfo.value.push({
        eventStart: eventStart.value,
        eventEnd: eventEnd.value
      })
      console.log(eventTimeInfo)
    }

    return { eventStart, eventEnd, getEventTimeInfo }
  }
}
</script>

<style lang="scss" scoped></style>
