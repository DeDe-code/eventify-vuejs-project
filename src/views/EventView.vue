<template>
  <div>
    <h1>hello from event view</h1>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { supabase } from '@/supabase/init'
import { useRoute } from 'vue-router'
import store from '@/store/index'
export default {
  setup() {
    const data = ref(null)
    const dataLoaded = ref(null)
    const errorMsg = ref(null)
    const statusMsg = ref(null)
    const route = useRoute()
    const user = computed(() => store.state.user)

    const currentId = route.params.eventId

    const getEventData = async () => {
      try {
        const { data: events, error } = await supabase
          .from('events')
          .select('*')
          .eg('id', currentId)
        if (error) throw error
        if (data.value) {
          data.value = events
          dataLoaded.value = true
        }
      } catch (error) {
        setTimeout(() => {
          errorMsg.value = error.message
        }, 5000)
      }
    }
    getEventData()

    // Edit Event
    const edit = ref(null)

    return { statusMsg, errorMsg }
  }
}
</script>

<style lang="scss" scoped></style>
