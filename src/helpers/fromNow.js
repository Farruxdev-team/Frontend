const format = (one, two, min = '') => {
  const plus = (num) => Math.abs(num).toString().padStart(2, '0')
  return `${min}${plus(one.getDay() - two.getDay())}:${plus(
    one.getHours() - two.getHours()
  )}:${plus(one.getMinutes() - two.getMinutes())}`
}

export const fromNow = (time, space) => {
  space = new Date(space * 60000).getTime()
  const now = new Date()
  const deadline = new Date(time)
  const isAgo = new Date().getTime() < new Date(time).getTime()
  if (!isAgo && new Date().getTime() < new Date(time).getTime() + space) {
    return {
      color: 'dark:text-blue-200 text-blue-800 bg-blue-700/50 cursor-pointer',
      msg: 'BOSHLASH',
      num: 1
    }
  }

  if (isAgo) {
    return {
      color: 'dark:text-green-200 text-green-800 bg-green-700/50',
      msg: format(deadline, now),
      num: 0
    }
  } else {
    return {
      color: 'dark:text-red-200 text-red-800 bg-red-700/50',
      msg: format(now, deadline, '-'),
      num: -1
    }
  }
}
