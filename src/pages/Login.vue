<script>
  import ButtonMain from '../components/ButtonMain.vue';
  import HelpBar from '../components/HelpBar.vue';
  import TodoIcon from '../components/icons/TodoIcon.vue'
  export default {
    data(){
      return {
        msg: 'data'
      }
    },
    components: {
      ButtonMain,
      HelpBar,
      TodoIcon
    }
  }
</script>

<template>
  <div class="w-full h-screen grid grid-cols-1 md:grid-cols-2 place-items-center ">
      <form class="w-2/3 2xl:w-2/5 p-3 grid gap-4 z-10 bg-white rounded-md md:bg-transparent">
        <!--Sign in section-->
        <div
          class="flex flex-row items-center justify-center">
          <h1 class="text-center text-4xl md:text-6xl font-bold textDegrant my-2">Welcome</h1>
        </div>
        <HelpBar>
          <TodoIcon :color="'#000'"/>
        </HelpBar>

        <!-- Email input -->
        <div class="relative mb-6" data-te-input-wrapper-init>
          <input
            type="text"
            class="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id=""
            placeholder="Email address" />
          <label
            for=""
            class="pointer-events-none absolute text-lg left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[1] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-focus:bg-transparent peer-focus:bg-white "
            >Email address
          </label>
        </div>

        <!-- Password input -->
        <div class="relative mb-6" data-te-input-wrapper-init>
          <input
            type="password"
            class="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "
            id=""
            placeholder="Password" />
          <label
            for=""
            class="pointer-events-none absolute text-lg left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[1] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-focus:bg-white"
            >Password
          </label>
        </div>
      <ButtonMain :textButton="'Login'" :textAlter="'Register'" />
    </form>
    <picture class="absolute blur md:blur-none md:grid md:relative place-items-center w-full -z-10">
      <img 
        src="../../public/login-background.webp" 
        alt="App task"
        class="object-cover w-full h-screen"
      >
    </picture>
  </div>
</template>

<style>
  .card {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(17, 25, 40, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
  }
</style>
  