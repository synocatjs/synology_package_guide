<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useFilesStore } from '@/stores/files'
import { useEditorStore } from '@/stores/editor'

const filesStore  = useFilesStore()
const editorStore = useEditorStore()

onMounted(() => {
  // Initialize stores from localStorage (DSM package data persistence)
  editorStore.init()
  filesStore.init()
})
</script>

<template>
  <RouterView />
</template>