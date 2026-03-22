// ============================================================
// DSM Markdown Editor — Vue Router
// ============================================================

import { createRouter, createWebHashHistory } from 'vue-router'
import EditorView from '@/views/EditorView.vue'

const router = createRouter({
  // Hash history: works without a server (important for DSM static file hosting)
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'editor',
      component: EditorView,
    },
    {
      // Catch-all: redirect to editor
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router