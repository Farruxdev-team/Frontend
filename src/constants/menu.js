export const menu = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'bx bxs-dashboard',
    role: ['ADMIN', 'TEACHER', 'STUDENT']
  },
  {
    name: "O'qituvchi qo'shish",
    path: '/add-teacher',
    icon: 'bx bxs-graduation',
    role: ['ADMIN']
  },
  {
    name: "O'quvchi qo'shish",
    path: '/add-student',
    icon: 'bx bxs-user-plus',
    role: ['ADMIN', 'TEACHER']
  },
  {
    name: 'Fanlar',
    path: '/subjects',
    icon: 'bx bxs-book-bookmark',
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
  }
]
