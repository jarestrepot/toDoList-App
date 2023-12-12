<script>
  import { userAuthStore } from '../../../store';
  import { CONSTANTS } from '../../../helpers';
  import { TodoIcon } from '../../todos/components/icons';
  import { ButtonMain, HelpBar, LabelForms, Loading } from '../../shared';

  export default {
    beforeCreate() {
      if(localStorage.getItem('tokenUser')){
        this.$router.push('/dashboard');
      }
    },
    components: {
      ButtonMain,
      HelpBar,
      LabelForms,
      TodoIcon,
      Loading,
    },
    data(){
      return {
        email: '', 
        password: '',
        startValidation: false,
        messageServerError: {
          status:false,
          message: ''
        },
        storeAuth: userAuthStore(),
        isLoading: false
      }
    },
    computed:{
      isValidEmail(){
        return CONSTANTS.VALIDEMAIL.test(this.email);
      },
      isValidPassword(){
        return CONSTANTS.VALIDPASSWORD.test(this.password);
      },
      validFields(){
        return this.isValidEmail && this.isValidPassword
      }
    }, 
    methods: {
      checkingCredencials(){
        if(this.validFields){
          this.loginUser()
        }
      },
      async loginUser(){
        try {
          this.startValidation = this.isLoading = true;
          await this.storeAuth.fetchLoginUser(this.email, this.password)
          const { token, hasError } = this.storeAuth

          if(token){
            localStorage.setItem('tokenUser', token)
            this.$router.push('/dashboard')
          }else{
            this.errorMessage(hasError);
            this.resetForm()
          }
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          this.errorMessage(error);
        }
      },
      errorMessage(message){
        this.messageServerError = {
          status: true,
          message: message
        } 
      },
      resetForm(){
        this.email = this.password = ''
      }
    },
  }
</script>

<template>
  <div class="w-8/12 p-2 2xl:w-3/5 md:p-3 grid gap-4 z-10 bg-white rounded-md md:bg-transparent dark:bg-slate-900">
    <div class="flex flex-row items-center justify-center">
      <h1 class="text-center text-3xl p-3 md:text-6xl font-bold textDegrant">{{ $t('welcome') }}</h1>
    </div>

    <HelpBar>
      <TodoIcon stroke="stroke-black dark:stroke-slate-100" fill="fill-black dark:fill-slate-100" />
    </HelpBar>

    <form 
      ref="formLogin"
      @submit.prevent="showRegister">

      <div class="relative w-full min-w-[200px] mb-8">
        <input 
          type="text"
          v-model="email"
          class="inputForm peer"
          placeholder=" " />
        <LabelForms :textDisplay="$t('email')"/>
        <div 
          v-if="!isValidEmail && email.length > 0"
          class="mt-2 text-red-600 text-sm 2xl:text-lg">
          <span>{{ $t('invalidEmail') }}</span>
        </div>
      </div>

      <div class="relative w-full min-w-[200px] mb-4">
        <input
          type="password"
          v-model="password"
          class="inputForm peer"
          @keyup.enter="checkingCredencials()"
          placeholder=" " />
        <LabelForms :textDisplay="$t('password')"/>
      </div>
      <div class="text-center lg:text-left flex flex-col w-full justify-between items-center">
        <ButtonMain
          :class="!validFields ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'"
          @submitEmit="loginUser()"
          :textButton="$t('login')" 
          :disabledButton="!validFields" />
        <slot />
      </div>
    </form>
    <!-- Loading -->
    <Loading v-if="isLoading"/>
    <div
      v-if="messageServerError.status"
      class="text-lg p-2 text-red-700 text-center">
      <span>{{ messageServerError.message }}</span>
    </div>
  </div>
  
</template>