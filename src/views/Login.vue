<script setup></script>

<template>
  <div>
    <div class="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto background">
      <div class="w-full rounded-lg border md:mt-0 md:max-w-md xl:p-0 forma">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="text-center w-full">
            <img
              class="w-20 h-20 mx-auto mb-5"
              src="https://static.tuit.uz/uploads/1/W73eM8T-hn5cLRoa_rQWKshn3eUutXvm.png"
              alt="logo"
            />
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-gray-900">
              Tizimga kirish
            </h1>
          </div>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Login</label>
              <input
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 placeholder-gray-400"
                placeholder="login"
                required=""
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                >Parol</label
              >
              <input
                type="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 placeholder-gray-400"
                required=""
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
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500">Eslab qolish</label>
                </div>
              </div>
              <a href="#" class="text-sm font-medium text-gray-900 hover:underline"
                >Parolni unutdingizmi?</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
  background-color: #8bc6ec;
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
  background-image: url('https://assets-global.website-files.com/614716f50b4f49202fdd0087/616949393cf90643c1403605_6423.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.forma {
  background: rgba(242, 237, 237, 0.35);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(61, 61, 61);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
</style>
