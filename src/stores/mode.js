import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModeStore = defineStore('mode', () => {
  const isDark = ref(JSON.parse(localStorage.getItem('mode')))

  const writeMode = () => {
    if (
      isDark.value ||
      (!('mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const changeMode = () => {
    isDark.value = !isDark.value
    localStorage.setItem('mode', isDark.value)
    writeMode()
  }

  const MODE = computed(() => isDark)

  return { writeMode, isDark, MODE, changeMode }
})
