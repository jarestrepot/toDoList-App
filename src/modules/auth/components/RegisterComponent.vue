<script>
import HelpBar from '../../shared/components/HelpBar.vue';
import TodoIcon from '../../todos/components/icons/TodoIcon.vue';
import ButtonMain from '../../shared/components/ButtonMain.vue';
import { startRegister } from '../../../helpers/authFetch';
import LabelForms from '../../shared/components/LabelForms.vue';

export default {
  components: {
    HelpBar,
    TodoIcon,
    ButtonMain,
    LabelForms
},
  data() {
    return {
      messageServerError: {
        status: false,
        message: ''
      },
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      regexNameAndLastName: /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{3,}( [a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{3,})?$/,
      clase: 'focus:ring-0 peer h-9 2xl:h-11 w-full rounded-[7px] border border-slate-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-slate-500 placeholder-shown:border-t-slate-500 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0'
    }
  },
  computed: {
    isValidEmail() {
      return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
    },
    isValidPassword() {
      return /^(?=.*\d)(?=.*[A-Za-z]).{8,}$/.test(this.password);
    },
    isValidName() {
      return this.regexNameAndLastName.test(this.name);
    },
    isValidLastname() {
      return this.regexNameAndLastName.test(this.lastName);
    },
    isValidConfirmPassword() {
      return this.password === this.confirmPassword;
    },
    validFields() {
      return this.isValidEmail && this.isValidPassword && this.isValidName && this.isValidLastname && this.isValidConfirmPassword;
    }
  },
  methods: {
    async registerUser() {
      const paramsForm = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        location: null
      }
      const response = startRegister(paramsForm);
      if (response) {
        this.$emit('emitLogin', true)
        this.name = this.lastName = this.email = this.password = this.confirmPassword = ''
      } else {
        this.name  = this.lastName = this.email = this.password = this.confirmPassword = ''
        this.messageServerError.status = true;
        this.messageServerError.message = response.Error
      }

    }
  }
}
</script>

<template>
  <div class="w-8/12 p-2 2xl:w-3/5 overflow-x-auto md:p-3 grid z-10 bg-white rounded-md md:bg-transparent">
    <div class="flex flex-row items-center justify-center">
      <h1 class="text-center p-3 text-3xl md:text-6xl font-bold textDegrant">Register</h1>
    </div>

    <HelpBar>
      <TodoIcon :color="'#000'" />
    </HelpBar>

    <form @submit.prevent="showLogin">

      <div class="relative w-full min-w-[200px] mb-4">
        <input 
          type="text" 
          v-model="name"
          :class="clase"
          placeholder=" " />
        <LabelForms textDisplay="Your name" />
        <div v-if="!isValidName && name.length > 0" class="mt-1 text-red-600 text-sm 2xl:text-lg">
          <span>Name incorrect!</span>
        </div>
      </div>

      <div class="relative w-full min-w-[200px] mb-4">
        <input 
          type="text" 
          v-model="lastName"
          :class="clase"
          placeholder=" " />
        <LabelForms textDisplay="Last name" />
        <div v-if="!isValidLastname && lastName.length > 0" class="mt-1 text-red-600 text-sm 2xl:text-lg">
          <span>Last name incorrect!</span>
        </div>
      </div>

      <div class="relative w-full min-w-[200px] mb-4">
        <input 
          type="email" 
          v-model="email"
          :class="clase"
          placeholder=" " />
        <LabelForms textDisplay="Email address" />
        <div v-if="!isValidEmail && email.length > 0" class="mt-1 text-red-600 text-sm 2xl:text-lg">
          <span>Email address incorrect!</span>
        </div>
      </div>

      <div class="relative w-full min-w-[200px] mb-4">
        <input 
          type="password" 
          v-model="password"
          :class="clase"
          placeholder=" " />
        <LabelForms textDisplay="Password" />
        <div v-if="!isValidPassword && password.length > 0" class="mt-1 text-red-600 text-sm 2xl:text-lg">
          <span>Password incorrect!</span>
        </div>
      </div>

      <div class="relative w-full min-w-[200px] 2xl:mb-4">
        <input 
          type="password" 
          v-model="confirmPassword"
          :class="clase"
          placeholder=" " />
        <LabelForms textDisplay="Confirm password" />
        <div v-if="!isValidConfirmPassword && confirmPassword.length > 0" class="mt-1 text-red-600 text-sm 2xl:text-lg">
          <span>Password does not match!</span>
        </div>
      </div>

      <div class="text-center lg:text-left flex flex-col w-full justify-between items-center">
        <ButtonMain :class="!validFields ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'"
          :textButton="'Register'" :disabledButton="!validFields" @submitEmit="registerUser()" />
        <slot />
      </div>
    </form>
  </div>
</template>
