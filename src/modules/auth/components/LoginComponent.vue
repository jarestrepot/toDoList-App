<script>
  import HelpBar from '../../shared/components/HelpBar.vue';
  import TodoIcon from '../../todos/components/icons/TodoIcon.vue';
  import ButtonMain from '../../shared/components/ButtonMain.vue';
  import { userAuthStore } from '../../../store/auth/authUser';
  import LabelForms from '../../shared/components/LabelForms.vue';
  import CONSTANTS from '../../../helpers/constants';


  export default {
    beforeCreate() {
      if(localStorage.getItem('tokenUser')){
        this.$router.push('/dashboard');
      }
    },
    components: {
    HelpBar,
    TodoIcon,
    ButtonMain,
    LabelForms,
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
        store: userAuthStore(),
        clase: 'focus:ring-0 peer h-11 w-full rounded-[7px] border border-slate-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-slate-500 placeholder-shown:border-t-slate-500 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0'
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
      async loginUser(){
        try {
          this.startValidation = true;
          await this.store.fetchLoginUser(this.email, this.password)
          const { token, hasError } = this.store

          if(token){
            localStorage.setItem('tokenUser', token)
            this.$router.push('/dashboard')
          }else{
            this.errorMessage(hasError);
            this.email = this.password = ''
          }
        } catch (error) {
          this.errorMessage(error);
        }
      },
      errorMessage(message){
        this.messageServerError = {
          status: true,
          message: message
        } 
      }
    }
  }
</script>

<template>
  <div class="w-8/12 p-2 2xl:w-3/5 md:p-3 grid gap-4 z-10 bg-white rounded-md md:bg-transparent">
    
    <div class="flex flex-row items-center justify-center">
      <h1 class="text-center text-3xl p-3 md:text-6xl font-bold textDegrant">Welcome</h1>
    </div>

    <HelpBar>
      <TodoIcon :color="'#000'" />
    </HelpBar>

    <form 
      ref="formLogin"
      @submit.prevent="showRegister">

      <div class="relative w-full min-w-[200px] mb-8">
        <input 
          type="text"
          v-model="email"
          :class="clase"
          placeholder=" " />
        <LabelForms textDisplay="Email address"/>
        <div 
          v-if="!isValidEmail && email.length > 0"
          class="mt-2 text-red-600 text-sm 2xl:text-lg">
          <span>Email incorrect!</span>
        </div>
      </div>

      <!-- Password input -->
      <div class="relative w-full min-w-[200px] mb-4">
        <input
          type="password"
          v-model="password"
          :class="clase"
          placeholder=" " />
        <LabelForms textDisplay="Password"/>
      </div>
      <div class="text-center lg:text-left flex flex-col w-full justify-between items-center">
        <ButtonMain
          :class="!validFields ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'"
          @submitEmit="loginUser()"
          :textButton="'Login'" 
          :disabledButton="!validFields"
        />
        <slot />
      </div>
    </form>
    <div
      v-if="messageServerError.status"
      class="text-lg p-2 text-red-700 text-center">
      <span>{{ messageServerError.message }}</span>
    </div>
  </div>
  
</template>