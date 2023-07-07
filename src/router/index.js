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
          path: '/teachers',
          name: 'Teachers',
          component: () => import('@/views/Teachers.vue')
        },
        {
          path: '/teachers/:id',
          name: 'Teacher_id',
          component: () => import('@/views/Teacher.vue')
        },
        {
          path: '/students',
          name: 'Student',
          component: () => import('@/views/Students.vue')
        },
        {
          path: '/students/:id',
          name: 'Student_id',
          component: () => import('@/views/Student.vue')
        },
        {
          path: '/groups',
          name: 'Groups',
          component: () => import('@/views/Groups.vue')
        },
        {
          path: '/groups/:id',
          name: 'GroupId',
          component: () => import('@/views/Group.vue')
        },
        {
          path: '/subjects',
          name: 'Subjects',
          component: () => import('@/views/Subjects.vue')
        },
        {
          path: '/subjects/:id',
          name: 'Subject_id',
          component: () => import('@/views/Subject.vue')
        },
        {
          path: '/tests',
          name: 'Tests',
          component: () => import('@/views/Tests.vue')
        },
        {
          path: '/tests/:id',
          name: 'Test',
          component: () => import('@/views/Test.vue')
        },
        {
          path: '/tests/:id/:question',
          name: 'Question',
          component: () => import('@/views/Question.vue')
        },
        {
          path: '/results',
          name: 'Results',
          component: () => import('@/views/Results.vue')
        },
        {
          path: '/results/:id',
          name: 'ResultsId',
          component: () => import('@/views/ResultsTest.vue')
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
