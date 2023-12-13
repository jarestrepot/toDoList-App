<script lang="js">
  import { ImageComponent, ChangeLanguage } from '../../shared';
  import { LoginComponent, RegisterComponent } from '../components';

  export default {
    emits: ['registerClicked'],
    data() {
      return {
        src: '../assets/images/login-background.webp',
        alt: 'App task',
        classImage: 'object-cover w-full h-screen',
      }
    },
    components: {
      LoginComponent,
      ChangeLanguage,
      ImageComponent,
      RegisterComponent,
    },
    mounted() {
      console.log(this.src)
    },
    methods: {
      showRegister() {
        this.$refs.loginComponent.resetForm()
        this.removeClass(this.$refs.containerImage, ['animateMoveLeft', 'containerImageLeft']);
        this.addClass(this.$refs.containerImage, ['animateMoveRight']);
        this.addClass(this.$refs.containerRegister, ['await', 'containerFormShow']);
        this.removeClass(this.$refs.containerRegister, ['containerFormHidden']);
        this.removeClass(this.$refs.containerLogin, ['containerFormShow']);
        this.addClass(this.$refs.containerLogin, ['containerFormHidden']);
      },

      showLogin() {
        this.$refs.registerComponent.resetForm()
        this.removeClass(this.$refs.containerImage, ['animateMoveRight']);
        this.addClass(this.$refs.containerImage, ['animateMoveLeft']);
        this.addClass(this.$refs.containerLogin, ['await', 'containerFormShow']);
        this.removeClass(this.$refs.containerLogin, ['containerFormHidden']);
        this.removeClass(this.$refs.containerRegister, ['containerFormShow']);
        this.addClass(this.$refs.containerRegister, ['containerFormHidden']);
      },
      removeClass({ classList }, nameClass) {
        for (let classRemove of nameClass) {
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
  <div class="w-full h-screen grid grid-cols-1 xl:grid-cols-2 items-center">
    <!-- Form Login -->
    <div 
      ref="containerLogin" 
      class="containerFormShow">
      <LoginComponent ref="loginComponent">
        <p class="mb-0 mt-2 pt-1 text-sm font-semibold dark:text-slate-300 flex flex-col lg:flex-row lg:gap-3 items-center">
          {{ $t('messageAccountLogin') }}
          <router-link 
            :to="{ name: 'register' }" 
            @click="showRegister()" 
            class="textDegrant text-lg transition duration-200 ease-in-out active:text-fun-blue-600 hover:underline hover:underline-offset-4 hover:decoration-fun-blue-400">
            {{ $t('register') }}
          </router-link>
          <ChangeLanguage />
        </p>
      </LoginComponent>
    </div>

    <picture 
      ref="containerImage" 
      class="hidden blur md:blur-none -z-10 md:z-50 absolute xl:block right-0 w-[50vw]">
      <ImageComponent 
        :src="src" 
        :alt="alt" 
        :classTailwind="classImage" />
    </picture>

    <!-- Form Register -->
    <div 
      ref="containerRegister" 
      class="containerFormHidden xl:absolute xl:top-0 xl:right-0 xl:w-1/2 h-full">
      <RegisterComponent ref="registerComponent" @emitLogin="showLogin()">
        <div class="text-center lg:text-left flex flex-col w-full justify-between items-center">
          <p class="mb-0 mt-2 pt-1 text-sm font-semibold dark:text-slate-300 flex min-w-full flex-col lg:flex-row lg:gap-3 items-center justify-center">
            {{ $t('messageAccountRegister') }}
            <router-link 
              :to="{ name: 'login' }" 
              @click="showLogin()" 
              class="textDegrant text-lg transition duration-200 ease-in-out active:text-fun-blue-600 hover:underline hover:underline-offset-4 hover:decoration-fun-blue-400">
              {{ $t('login') }}
            </router-link>
            <ChangeLanguage />
          </p>
        </div>
      </RegisterComponent>
    </div>
  </div>
</template>

<style>
.animateMoveRight {
  animation: moveRight 1s ease forwards;
}

@keyframes moveRight {
  to {
    transform: translateX(-50vw);
  }
}

.animateMoveLeft {
  animation: moveLeft 1s ease forwards;
}

@keyframes moveLeft {
  from {
    transform: translateX(-50vw);
  }

  to {
    transform: translateX(0%);
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
  