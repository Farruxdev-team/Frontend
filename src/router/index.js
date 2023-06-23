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
          path: '/',
          name: 'add-teacher',
          component: () => import('@/views/AddTeacher.vue')
        },
        {
          path: '/',
          name: 'add-student',
          component: () => import('@/views/AddStudent.vue')
        },
        {
          path: '/',
          name: 'subjects',
          component: () => import('@/views/Subjects.vue')
        },
        {
          path: '/test',
          name: 'Test',
          component: () => import('@/views/Test.vue')
        },
        {
          path: '/add-teacher',
          name: 'AddTeacher',
          component: () => import('@/views/AddTeacher.vue')
        },
        {
          path: '/',
          name: 'results',
          component: () => import('@/views/Results.vue')
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
