<script>
  import { startRegister } from '../../../helpers/authFetch';
  import ButtonMain from '../../shared/components/ButtonMain.vue';
  import CONSTANTS from '../../../helpers/constants';
  import HelpBar from '../../shared/components/HelpBar.vue';
  import LabelForms from '../../shared/components/LabelForms.vue';
  import TodoIcon from '../../todos/components/icons/TodoIcon.vue';
  import ChangeLanguage from '../../shared/components/ChangeLanguage.vue'

  export default {
    components: {
      HelpBar,
      TodoIcon,
      ButtonMain,
      LabelForms,
      ChangeLanguage
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
      }
    },
    computed: {
      isValidEmail() {
        return CONSTANTS.VALIDEMAIL.test(this.email);
      },
      isValidPassword() {
        return CONSTANTS.VALIDPASSWORD.test(this.password);
      },
      isValidName() {
        return CONSTANTS.VALIDINPUT.test(this.name);
      },
      isValidLastname() {
        return CONSTANTS.VALIDINPUT.test(this.lastName);
      },
      isValidConfirmPassword() {
        return this.password === this.confirmPassword;
      },
      validFields() {
        return this.isValidEmail 
          && this.isValidPassword 
          && this.isValidName 
          && this.isValidLastname 
          && this.isValidConfirmPassword;
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
          this.resetForm();
        } else {
          this.resetForm();
          this.messageServerError = {
            status: false,
            message: response.Error
          }
        }
      },
      resetForm() {
        this.name = this.lastName = this.email = this.password = this.confirmPassword = ''
      }
    },


  }
</script>

<template>
  <div class="w-8/12 p-2 2xl:w-3/5 overflow-x-auto md:p-3 grid z-10 bg-white rounded-md md:bg-transparent">
    <ChangeLanguage classDiv="w-full flex justify-end" />
    <div class="flex flex-row items-center justify-center">
      <h1 class="text-center p-3 text-3xl md:text-6xl font-bold textDegrant">{{ $t('register') }}</h1>
    </div>

    <HelpBar>
      <TodoIcon color="#000" />
    </HelpBar>

    <form @submit.prevent="showLogin">

      <div class="relative w-full min-w-[200px] mb-4">
        <input 
          type="text" 
          v-model="name"
          class="inputForm peer"
          placeholder=" " />
        <LabelForms :textDisplay="$t('yourName')" />
        <div 
          v-if="!isValidName && name.length > 0" 
          class="mt-1 text-red-600 text-sm 2xl:text-lg">
          <span>{{ $t('invalidName') }}</span>
        </div>
      </div>

      <div class="relative w-full min-w-[200px] mb-4">
        <input 
          type="text" 
          v-model="lastName"
          class="inputForm peer"
          placeholder=" " />
        <LabelForms :textDisplay="$t('lastname')" />
        <div 
          v-if="!isValidLastname && lastName.length > 0" 
          class="mt-1 text-red-600 text-sm 2xl:text-lg">
          <span>{{ $t('invalidLastName') }}</span>
        </div>
      </div>

      <div class="relative w-full min-w-[200px] mb-4">
        <input 
          type="email" 
          v-model="email"
          class="inputForm peer"
          placeholder=" " />
        <LabelForms :textDisplay="$t('email')" />
        <div 
          v-if="!isValidEmail && email.length > 0" 
          class="mt-1 text-red-600 text-sm 2xl:text-lg">
          <span>{{ $t('invalidEmail') }}</span>
        </div>
      </div>

      <div class="relative w-full min-w-[200px] mb-4">
        <input 
          type="password" 
          v-model="password"
          class="inputForm peer"
          placeholder=" " />
        <LabelForms :textDisplay="$t('password')" />
        <div 
          v-if="!isValidPassword && password.length > 0" 
          class="mt-1 text-red-600 text-sm 2xl:text-lg">
          <span>{{ $t('invalidPassword') }}</span>
        </div>
      </div>

      <div class="relative w-full min-w-[200px] 2xl:mb-4">
        <input 
          type="password" 
          v-model="confirmPassword"
          class="inputForm peer"
          placeholder=" " />
        <LabelForms :textDisplay="$t('confirmPassword')" />
        <div 
          v-if="!isValidConfirmPassword && confirmPassword.length > 0" 
          class="mt-1 text-red-600 text-sm 2xl:text-lg">
          <span>{{ $t('invalidConfirmPassword') }}</span>
        </div>
      </div>

      <div class="text-center lg:text-left flex flex-col w-full justify-between items-center">
        <ButtonMain 
          :class="!validFields ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'"
          :textButton="$t('register')" 
          :disabledButton="!validFields" 
          @submitEmit="registerUser()" />
        <slot />
      </div>
    </form>
  </div>
</template>
