import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '../stores/user/userStore'

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
          path: '/add-student/:id',
          name: 'add-student_id',
          component: () => import('@/views/Student.vue')
        },
        {
          path: '/subjects',
          name: 'subjects',
          component: () => import('@/views/AddSubjects.vue')
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
          path: '/start',
          name: 'Start',
          component: () => import('@/views/Start.vue')
        },
        {
          path: '/start/:id',
          name: 'StartTest',
          component: () => import('@/views/StartTest.vue')
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

router.beforeEach((to, from, next) => {
  try {
    userStore().CHECK_USER()
  } catch (error) {
    console.log(error)
    localStorage.clear()
    next('/login')
  }

  if (to.name != 'Login' && !localStorage.getItem('token')) {
    next('/login')
  } else if (to.name == 'Login' && localStorage.getItem('token')) {
    next('/')
  } else {
    next()
  }
})

export default router
