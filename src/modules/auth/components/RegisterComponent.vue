<script>
  import HelpBar from '../../shared/components/HelpBar.vue';
  import TodoIcon from '../../todos/components/icons/TodoIcon.vue';
  import ButtonMain from '../../shared/components/ButtonMain.vue';
  import { startRegister } from '../../../helpers/authFetch';
  export default {
    components: {
      HelpBar,
      TodoIcon,
      ButtonMain
    },
    data(){
      return {
        messageServerError: {
          status: false,
          message: ''
        },
        name:'',
        lastName:'',
        email: '',
        password: '',
        confirmPassword:'',
        regexNameAndLastName: /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{3,}( [a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{3,})?$/
      }
    },
    computed: {
      isValidEmail() {
        return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
      },
      isValidPassword() {
        return /^(?=.*\d)(?=.*[A-Za-z]).{8,}$/.test(this.password);
      },
      isValidName(){
        return this.regexNameAndLastName.test(this.name);
      },
      isValidLastname(){
        return this.regexNameAndLastName.test(this.lastName);
      },
      isValidConfirmPassword(){
        return this.password === this.confirmPassword;
      },
      validFields() {
        return this.isValidEmail && this.isValidPassword && this.isValidName && this.isValidLastname && this.isValidConfirmPassword;
      }
    },
    methods: {
      async registerUser(){ 
        const paramsForm = {
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          location: null
        }
        const response = startRegister(paramsForm);
        if(response){
          this.$emit('emitLogin', true)
        }else{
          // !! TODO: Clear form
          this.messageServerError.status = true;
          this.messageServerError.message = response.Error
        }

      }
    }
  }
</script>

<template>
  <form @submit.prevent="showLogin"
    class="w-8/12 p-2 2xl:w-2/5 overflow-x-auto md:p-3 grid  z-10 bg-white rounded-md md:bg-transparent">
    <!--Sign in section-->
    <div class="flex flex-row items-center justify-center ">
      <h1 class="text-center p-3 text-4xl md:text-6xl font-bold textDegrant my-2">Register</h1>
    </div>
    <HelpBar>
      <TodoIcon :color="'#000'" />
    </HelpBar>

    <!-- Name input -->
    <div class="relative mb-6" data-te-input-wrapper-init>
      <input type="text"
        v-model="name"
        class="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        placeholder="Your Name" />
      <label for=""
        class="pointer-events-none absolute text-lg left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[1] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-focus:bg-transparent peer-focus:bg-white ">
        Your Name
      </label>
      <div
        v-if="!isValidName && name.length > 0"
        class="mt-2 text-red-600 text-lg">
        <span>Name incorrect!</span>
      </div>
    </div>

    <!-- LastName input -->
    <div class="relative mb-6" data-te-input-wrapper-init>
      <input type="text"
        v-model="lastName"
        class="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        placeholder="Last Name" />
      <label for=""
        class="pointer-events-none absolute text-lg left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[1] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-focus:bg-transparent peer-focus:bg-white ">
        Last Name
      </label>
      <div
        v-if="!isValidLastname && lastName.length > 0"
        class="mt-2 text-red-600 text-lg">
        <span>Last Name incorrect!</span>
      </div>
    </div>

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

    <div class="relative mb-6" data-te-input-wrapper-init>
      <input type="password"
        v-model="confirmPassword"
        class="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "
        placeholder="Confirm password" />
      <label for=""
        class="pointer-events-none absolute text-lg left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.7rem] peer-focus:scale-[1] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary peer-focus:bg-white">Confirm password
      </label>
      <div
        v-if="!isValidConfirmPassword && confirmPassword.length > 0"
        class="mt-2 text-red-600 text-lg">
        <span>Passwords do not match!</span>
      </div>
    </div>
    <div class="text-center lg:text-left flex flex-col w-full justify-between items-center">
      <ButtonMain
        :class="!validFields ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'" :textButton="'Register'" :disabledButton="!validFields" 
        @submitEmit="registerUser()"
      />
      <slot />
    </div>
  </form>
</template>

<style></style>