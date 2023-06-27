import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/Home.vue')
        },
        {
          path: '/add-teacher',
          name: 'add-teacher',
          component: () => import('@/views/AddTeacher.vue')
        },
        {
          path: '/add-student',
          name: 'add-student',
          component: () => import('@/views/AddStudent.vue')
        },
        {
          path: '/subjects',
          name: 'subjects',
          component: () => import('@/views/Subjects.vue')
        },
        {
          path: '/tests',
          name: 'tests',
          component: () => import('@/views/Tests.vue')
        },
        {
          path: '/tests/:id',
          name: 'test',
          component: () => import('@/views/Test.vue')
        },
        {
          path: '/results',
          name: 'results',
          component: () => import('@/views/Results.vue')
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/views/Settings.vue')
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'Error',
          component: () => import('@/views/Error.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    }
  ]
})

export default router
