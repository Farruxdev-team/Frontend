<script setup>
import { reactive } from 'vue'
import { userStore } from '@/stores/user/userStore'

const store = userStore()

const user = reactive({
  login: '',
  password: ''
})

const login_user = () => {
  try {
    console.log(user)
    store.LOGIN_USER(user)
  } catch (error) {}
}
</script>

<template>
  <div>
    <div class="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto background">
      <div
        class="w-full rounded-lg border md:mt-0 md:max-w-md xl:p-0 forma border-gray-700 bg-white/20 bg-gradient-to-t from-black/80"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="text-center w-full">
            <img
              class="w-32 h-32 mx-auto mb-5"
              src="https://static.tuit.uz/uploads/1/W73eM8T-hn5cLRoa_rQWKshn3eUutXvm.png"
              alt="logo"
            />
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-gray-300">
              Tizimga kirish
            </h1>
          </div>
          <form @submit.prevent="login_user" class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Login</label>
              <input
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-300 block w-full p-2.5 placeholder-gray-400"
                placeholder="login"
                required=""
                v-model="user.login"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-300">
                Parol
              </label>
              <input
                type="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-300 block w-full p-2.5 placeholder-gray-400"
                required=""
                v-model="user.password"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300 ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-300">Eslab qolish</label>
                </div>
              </div>
              <a href="#" class="text-sm font-medium text-gray-300 hover:underline">
                Parolni unutdingizmi?
              </a>
            </div>
            <button
              type="submit"
              class="w-full text-white border border-gray-700 bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300"
            >
              Kirish
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-color: gray;
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
  background-image: url('https://wallpapercave.com/wp/wp7335889.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.forma {
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
</style>
