<template>
  <div>
    <h1>Home</h1>
    <p v-for="event in data" :key="event.id">
      {{ event.event[0].eventAddress }}
      {{ event.event[0].imageUrl.slice(5) }}
    </p>
    <img v-for="event in data" :key="event.id" :src="event.event[0].imageUrl.slice(5)" alt="" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '@/supabase/init'
export default {
  setup() {
    const data = ref([])
    const dataLoaded = ref(null)

    // Get data from supabase
    const getData = async () => {
      try {
        const { data: events, error } = await supabase.from('events').select('*')
        if (error) throw error
        data.value = events
        dataLoaded.value = true
        console.log(data.value)
      } catch (error) {
        console.warn(error.message)
      }
    }
    // Run getData Function
    getData()
    return { data }
  }
}
</script>

<style lang="scss" scoped></style>
