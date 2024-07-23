<template>
  <div class="flex flex-col gap-y-3">
    <div class="flex flex-col mt-4">
      <label for="organizer-phone" class="mb-1 text-sm text-colors-beige-light">Phone</label>
      <input
        type="tel"
        required
        id="organizer-phone"
        class="p-1 text-gray-500 focus:outline-none"
        v-model="organizerPhone"
      />
    </div>

    <div class="flex flex-col mt-4">
      <label for="organizer-email" class="mb-1 text-sm text-colors-beige-light">Email</label>
      <input
        type="email"
        required
        id="organizer-email"
        class="p-1 text-gray-500 focus:outline-none"
        v-model="organizerEmail"
      />
    </div>
  </div>
  <!-- {{ organizerPhoneInfo }} -->
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const organizerPhone = ref('')
    const organizerEmail = ref('')
    return { organizerEmail, organizerPhone }
  }
}
</script>

<style lang="scss" scoped></style>
