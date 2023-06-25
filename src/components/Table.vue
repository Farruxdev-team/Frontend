<script setup>
const cutText = (str, len) => {
  return str.slice(0, len) + '...'
}
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400 border-b-2 border-gray-300 dark:border-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Test Fani</th>
          <th scope="col" class="px-6 py-3">Savol matni</th>
          <!-- <th scope="col" class="px-6 py-3">A variant</th>
          <th scope="col" class="px-6 py-3">B variant</th>
          <th scope="col" class="px-6 py-3">C variant</th> -->
          <th scope="col" class="px-6 py-3 sr-only">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="el in 5"
          class="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            Apple
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{
              cutText(
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni natus recusandae corporis sint, dignissimos expedita ab eaque molestiae, quod odit repellendus sed quo sequi labore? Cupiditate sit aperiam quaerat nihil temporibus, debitis dolorem numquam esse totam dolor velit quos dolores sed sunt nesciunt nisi dignissimos! Quia recusandae dignissimos perspiciatis eveniet?',
                50
              )
            }}
          </th>

          <td class="px-6 py-4 text-right">
            <button
              type="button"
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Green
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped></style>
