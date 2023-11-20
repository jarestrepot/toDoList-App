<script>
import InputSearch from './InputSearch.vue'
import ProfileIcon from './icons/ProfileIcon.vue'
import HamburgerIcon from './icons/HamburgerIcon.vue'

  export default {
    components: {
      InputSearch,
      ProfileIcon,
      HamburgerIcon
    }
  }
</script>

<template>
  <nav class="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
    <div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
      <div class="capitalize">
        <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">Dashboard</h6>
      </div>
      <div class="flex items-center">
        <InputSearch />
        <button class="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
          <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <HamburgerIcon />
          </span>
        </button>

          <p class="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex" type="button">
            <ProfileIcon className="w-5 h-5"/>
            Valentina Alzate
          </p>
          <p class="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
            <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <ProfileIcon />
            </span>
          </p>
      </div>
    </div>
  </nav>
</template>

<style>
  
</style>