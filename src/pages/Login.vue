<script>
  import ImageComponent from '../components/ImageComponent.vue';
  import LoginComponent from '../components/LoginComponent.vue';
  import ButtonMain from '../components/ButtonMain.vue';
  import RegisterComponent from '../components/RegisterComponent.vue';
  export default {
    data(){
      return {
        src: '../../public/login-background.webp',
        alt: 'App task',
        classImage: 'object-cover w-full h-screen'
      }
    },
    components: {
      ImageComponent,
      LoginComponent,
      ButtonMain,
      RegisterComponent
    },
    methods: {
      showRegister(){
        this.removeClass(this.$refs.containerImage, [ 'animateMoveLeft', 'containerImageLeft']);
        this.addClass(this.$refs.containerImage,['animateMoveRight'] );
        this.addClass(this.$refs.containerRegister, ['await', 'containerFormShow']);
        this.removeClass(this.$refs.containerRegister, ['containerFormHidden']);
        this.removeClass(this.$refs.containerLogin,['containerFormShow']);
        this.addClass(this.$refs.containerLogin,['containerFormHidden'] );
      },

      showLogin(){
        this.removeClass(this.$refs.containerImage, ['animateMoveRight' ]);
        this.addClass(this.$refs.containerImage, ['animateMoveLeft']);
        this.addClass(this.$refs.containerLogin, ['await', 'containerFormShow']);
        this.removeClass(this.$refs.containerLogin, ['containerFormHidden']);
        this.removeClass(this.$refs.containerRegister, ['containerFormShow']);
        this.addClass(this.$refs.containerRegister, ['containerFormHidden']);
      },
      removeClass({ classList }, nameClass){
        for(let classRemove of nameClass){
          classList.remove(classRemove);
        }
      },
      addClass({ classList }, nameClass) {
        for (let classAdd of nameClass) {
          classList.add(classAdd);
        }
      }
    }
  }
</script>

<template>
  <div class="w-full h-screen grid grid-cols-1  xl:grid-cols-2 place-items-center">
    <!-- Form Login -->
    <div 
      ref="containerLogin"
      class="containerFormShow">
      <LoginComponent
      >
        <div class="text-center lg:text-left flex flex-col w-full justify-between items-center">
          <ButtonMain :textButton="'Login'" />
          <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
          Don't have an account?
            <button
              @click="showRegister()"
              class="textDegrant text-lg transition duration-200 ease-in-out  active:text-fun-blue-600 hover:underline
              hover:underline-offset-4 hover:decoration-fun-blue-400"
            >
              Register
            </button>
          </p>
        </div>
      </LoginComponent>
    </div>
    <picture 
      ref="containerImage"
      class="hidden blur md:blur-none -z-10 md:z-50 absolute xl:block  right-0">
      <ImageComponent
        :src="src"
        :alt="alt"
        :classTailwind="classImage"
      />
    </picture>
    <!-- Form Register -->
    <div 
      ref="containerRegister"
      class="containerFormHidden xl:absolute xl:top-0 xl:right-0 xl:w-1/2">
      <RegisterComponent>
        <div class="text-center lg:text-left flex flex-col w-full justify-between items-center">
          <ButtonMain :textButton="'Register'" />
          <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
          Don't have an account?
            <button
              @click="showLogin()"
              class="textDegrant text-lg transition duration-200 ease-in-out  active:text-fun-blue-600 hover:underline
              hover:underline-offset-4 hover:decoration-fun-blue-400"
            >
              Login
            </button>
          </p>
        </div>
      </RegisterComponent>
    </div>
  </div>
</template>

<style>
  .animateMoveRight{
    animation: moveRight 1s ease forwards;
  }

  @keyframes moveRight {
    to {
      transform: translateX(-100%);
    }
  }

  .animateMoveLeft{
    animation: moveLeft 1s ease forwards;
  }
  @keyframes moveLeft {
    from{
      transform: translateX(-100%);
    }
    to {
      transform: translateX(-20%);
    }
  }

  
  .await {
    animation: wait 1.2s ease forwards;
  }

  @keyframes wait {
    0% {
      z-index: -2;
    }
    1% {
      z-index: -1; 
    }
    100% {
      z-index: 0; 
    }
  }
</style>
  