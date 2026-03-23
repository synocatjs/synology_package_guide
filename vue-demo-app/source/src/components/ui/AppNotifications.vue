
<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-vue-next'

const editorStore = useEditorStore()

const iconMap = { success: CheckCircle, info: Info, warning: AlertTriangle, error: XCircle }
const colorMap = {
  success: 'var(--status-green)',
  info:    'var(--accent)',
  warning: 'var(--status-yellow)',
  error:   'var(--status-red)',
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-8 right-5 z-[200] flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="notif" tag="div" class="flex flex-col gap-2">
        <div
          v-for="n in editorStore.notifications"
          :key="n.id"
          class="pointer-events-auto flex items-start gap-3 rounded-lg px-4 py-3 shadow-[var(--shadow-modal)]"
          style="
            background: var(--bg-elevated);
            border: 1px solid var(--border-light);
            min-width: 240px;
            max-width: 340px;
          "
        >
          <component
            :is="iconMap[n.type]"
            :size="16"
            :style="{ color: colorMap[n.type], flexShrink: 0, marginTop: '1px' }"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold font-display" style="color: var(--text-primary)">{{ n.title }}</p>
            <p v-if="n.message" class="text-xs mt-0.5 truncate" style="color: var(--text-secondary)">{{ n.message }}</p>
          </div>
          <button
            class="icon-btn flex-shrink-0"
            style="width:18px; height:18px"
            @click="editorStore.dismissNotification(n.id)"
          >
            <X :size="12" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.notif-enter-active { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); }
.notif-leave-active { transition: all 0.2s ease; }
.notif-enter-from   { opacity: 0; transform: translateX(24px); }
.notif-leave-to     { opacity: 0; transform: translateX(24px); }
.notif-move         { transition: transform 0.2s; }
</style>