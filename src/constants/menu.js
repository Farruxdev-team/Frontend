export const menu = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'bx bxs-dashboard',
    role: ['ADMIN', 'TEACHER', 'STUDENT']
  },
  {
    name: "O'qituvchi qo'shish",
    path: '/teachers',
    icon: 'bx bxs-graduation',
    role: ['ADMIN']
  },
  {
    name: "O'quvchi qo'shish",
    path: '/students',
    icon: 'bx bx-user-plus',
    role: ['ADMIN', 'TEACHER']
  },
  {
    name: 'Guruhlar',
    path: '/groups',
    icon: 'bx bx-group',
    role: ['ADMIN', 'TEACHER']
  },
  {
    name: 'Fanlar',
    path: '/subjects',
    icon: 'bx bx-book-bookmark',
    role: ['ADMIN', 'TEACHER']
  },
  {
    name: 'Testlar',
    path: '/tests',
    icon: 'bx bx-test-tube',
    role: ['ADMIN', 'TEACHER']
  },
  {
    name: 'Testni boshlash',
    path: '/start',
    icon: 'bx bxs-hourglass',
    role: ['STUDENT']
  },
  {
    name: 'Natijalar',
    path: '/results',
    icon: 'bx bx-pie-chart',
    role: ['ADMIN', 'TEACHER', 'STUDENT']
  },
  {
    name: 'Sozlamalar',
    path: '/settings',
    icon: 'bx bx-cog',
    role: ['ADMIN', 'TEACHER', 'STUDENT']
  }
]
