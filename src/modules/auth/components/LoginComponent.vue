<script>
  import HelpBar from '../../shared/components/HelpBar.vue';
  import ButtonMain from '../../shared/components/ButtonMain.vue';
  import TodoIcon from '../../todos/components/icons/TodoIcon.vue';

  export default {
    components: {
      HelpBar,
      TodoIcon,
      ButtonMain
    },
    data(){
      return {
        email: '', 
        password: '',
        startValidation: false
      }
    },
    computed:{
      isValidEmail(){
        return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
      },
      isValidPassword(){
        return /^(?=.*\d)(?=.*[A-Za-z]).{8,}$/.test(this.password);
      },
      validFields(){
        if(this.isValidEmail && this.isValidPassword ){
          return false;
        } 
        return true;
      }
    },
    methods: {
      async loginUser(){
        try {
          this.startValidation = true
          const getTest = await fetch('https://server-todo-list-app.cleverapps.io/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.email, password: this.password})
          });
          const response = await getTest.json();
          console.log(response)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
</script>

<template>
  <form  @submit.prevent="loginUser()" class="w-8/12 p-2 2xl:w-2/5  md:p-3 grid gap-4 z-10 bg-white rounded-md md:bg-transparent">
    <!--Sign in section-->
    <div class="flex flex-row items-center justify-center">
      <h1 class="text-center text-4xl p-3 md:text-6xl font-bold textDegrant my-2">Welcome</h1>
    </div>

    <HelpBar>
      <TodoIcon :color="'#000'" />
    </HelpBar>

    <!-- Email input -->
    <div class="relative mb-6" data-te-input-wrapper-init>
      <input type="text"
        v-model="email"
        class="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        placeholder="Email address" />
      <label for=""
        class="pointer-events-none absolute text-lg left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[1] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-focus:bg-transparent peer-focus:bg-white ">Email
        address
      </label>
      <div 
        v-if="!isValidEmail && email.length > 0"
        class="mt-2 text-red-600 text-lg">
        <span>Email incorrect!</span>
      </div>
    </div>

    <!-- Password input -->
    <div class="relative mb-6" data-te-input-wrapper-init>
      <input type="password"
        v-model="password"
        class="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "
        placeholder="Password" />
      <label for=""
        class="pointer-events-none absolute text-lg left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[1] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-focus:bg-white">Password
      </label>
      <div
        v-if="!isValidPassword && password.length > 0"
        class="mt-2 text-red-600 text-lg">
        <span>Password incorrect!</span>
      </div>
    </div>
    <div class="text-center lg:text-left flex flex-col w-full justify-between items-center">
      <ButtonMain
        @submitEmit="loginUser()"
        :textButton="'Login'" 
        :disabledButton="validFields"
      />
      <slot />
    </div>
  </form>
</template>