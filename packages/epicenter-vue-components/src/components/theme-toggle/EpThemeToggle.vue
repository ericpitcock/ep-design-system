<template>
  <EpButton
    :icon-left="{ name: buttonIcon }"
    title="Toggle theme"
    @click="toggleTheme"
  />
</template>

<script setup>
  import { computed } from 'vue'

  import EpButton from '../button/EpButton.vue'

  defineOptions({
    name: 'EpThemeToggle'
  })

  const props = defineProps({
    currentTheme: {
      type: String,
      required: true
    }
  })

  const buttonIcon = computed(() => props.currentTheme === 'dark' ? 'light-mode' : 'dark-mode')

  const emit = defineEmits(['toggle-theme'])

  const toggleTheme = () => {
    emit('toggle-theme')
  }
</script>
