<script setup lang="ts">
defineProps<{
  text: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}>()
</script>

<template>
  <div class="relative inline-flex group">
    <slot />
    <div
      class="
        pointer-events-none absolute z-50 whitespace-nowrap rounded px-2 py-1
        text-[11px] font-medium opacity-0 transition-all duration-150
        group-hover:opacity-100
      "
      :class="{
        'bottom-full left-1/2 -translate-x-1/2 mb-1.5 group-hover:mb-2': side !== 'bottom' && side !== 'left' && side !== 'right',
        'top-full left-1/2 -translate-x-1/2 mt-1.5 group-hover:mt-2': side === 'bottom',
        'right-full top-1/2 -translate-y-1/2 mr-1.5': side === 'left',
        'left-full top-1/2 -translate-y-1/2 ml-1.5': side === 'right',
      }"
      style="background: var(--bg-active); color: var(--text-primary); border: 1px solid var(--border-light)"
    >
      {{ text }}
    </div>
  </div>
</template>