<script>
  import { startDeleteUser, startEditUser } from '../../../helpers/authFetch';
  import { userAuthStore } from '../../../store/auth/authUser';
  import ActionConfirm from '../../todos/components/ActionConfirm.vue';
  import CONSTANTS from '../../../helpers/constants';
  import EmailIcon from '../components/icons/EmailIcon.vue';
  import ModalTodos from '../../todos/components/ModalTodos.vue';
  import PasswordIcon from '../components/icons/PasswordIcon.vue';
  import ProfileIcon from '../../ui/components/icons/ProfileIcon.vue';
  import RefreshIcon from '../components/icons/RefreshIcon.vue';
  import TrashIcon from '../components/icons/TrashIcon.vue';
  import UserInfoIcon from '../components/icons/UserInfoIcon.vue';
  import { startVerifyPassword } from '../../../helpers/authFetch'

  export default {
    data () {
      return {
        name:'',
        lastName: '',
        email: '',
        userId: '',
        password: '',
        newPassword: '',
        move: false,
        storeAuth: userAuthStore(),
        responseMessage: {
          status: false,
          message:''
        },
        openModal: false,
        rolPassword: false,
        messgeModal: ''
      }
    },
    async mounted() {
      const { user } = this.storeAuth;
      this.name = user?.name ?? 'name';
      this.lastName = user?.lastName ?? 'last name';
      this.email = user?.email ?? 'email';
      this.userId = user?.user_id;
    },
    components: {
      ActionConfirm,
      EmailIcon,
      ModalTodos,
      PasswordIcon,
      ProfileIcon,
      RefreshIcon,
      TrashIcon,
      UserInfoIcon,
    },
    computed: {
      isValidName() {
        return CONSTANTS.VALIDINPUT.test(this.name)
      },
      isValidLastName() {
        return CONSTANTS.VALIDINPUT.test(this.lastName)
      },
      isValidEmail() {
        return CONSTANTS.VALIDEMAIL.test(this.email)
      },
      isValidPassWord(){
        return CONSTANTS.VALIDPASSWORD.test(this.password)
      },
      isValidNewPassword() {
        return CONSTANTS.VALIDPASSWORD.test(this.newPassword)
      },
      isValidFields() {
        return this.isValidName && this.isValidLastName && this.isValidEmail && this.password
      }
    },
    methods: {
      cancelModal(){
        this.openModal = this.move = false
      },
      async deleteAccount(){
        const response = await startDeleteUser(this.userId)
        if(response.Error){
          this.responseMessage = {
            message: response.Error
          }
        }else{
          const { logoutUser } = this.storeAuth;
          logoutUser();
          this.$router.push('/');
        }
      },
      async updateAccont(){

        const user = { 
          name: this.name.toLowerCase(), 
          lastName:this.lastName.toLowerCase(),
          email: this.email.toLowerCase(),
          password: this.password,
          newPassword: this.newPassword === '' ? this.password : this.newPassword,
          userId:this.userId
        }

        const response = await startEditUser(user);

        if(response.Error){
          this.move = false;
          this.password = null;
          this.responseMessage = {
            message: response.Error.Error
          }
        }else{
          const { updateUser } = this.storeAuth;
          updateUser(response);
          this.move = false;
          this.password = null;
          this.responseMessage = {
            status: true,
            message: 'User updated successfully'
          }
        }
      },
      async veryfyPasswordToDeleteAccount(){
        const { user } = this.storeAuth;
        const { found } = await startVerifyPassword(user.user_id,this.password);
        this.openModal = true;
        if(found){
          this.rolPassword = true;
          this.messgeModal = this.$t('confirmDeleteAccount')
        }else {
          this.rolPassword = this.move = false;
          this.messgeModal = this.$t('rolIncorrect')
        }
      }
    }
  }
</script>
<template>
  <section class="flex flex-col gap-4 justify-around items-center lg:flex-row lg:items-start">
    <div>
      <h2 class="textDegrant text-4xl mb-4 xl:my-6 text-center lg:text-start font-semibold">{{ $t('profile') }}</h2>
      <span class="dark:text-slate-300">{{ $t('addInformationYouSelft') }}</span>
    </div>
    <div class="container max-w-2xl md:w-3/4 shadow-md rounded-md overflow-hidden">

      <div class="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-persian-green-400 rounded-t w-full">
        <div class="mx-auto md:w-full md:mx-0 flex flex-col md:flex-row justify-center items-center">
          <div class="inline-flex items-center space-x-4 w-full text-center">
            <ProfileIcon className="w-12 h-12 fill-slate-500 dark:fill-slate-300" />
            <h1 class="text-slate-600 uppercase font-semibold dark:text-slate-300">{{ `${name} ${lastName}` }}</h1>
          </div>
          <div class="w-full flex justify-end p-1 text-end">
            <span 
              v-if="responseMessage.status" 
              class="text-green-500"> 
              {{ responseMessage.message }}
            </span>
          </div>
        </div>
      </div>
      
      <form @submit.prevent="move = true">
        <div class="bg-white space-y-6 dark:bg-slate-800">
          <div class="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 class="md:w-1/3 max-w-sm mx-auto dark:text-slate-200">{{ $t('account') }}</h2>

            <div class="md:w-2/3 max-w-sm mx-auto">
              <label class="text-sm text-gray-400 dark:text-slate-300">{{ $t('email') }}</label>
              <div class="w-full inline-flex rounded-md overflow-hidden">
                <div class="pt-2 w-1/12 bg-gray-100 dark:bg-gray-600 rounded-s-md">
                  <EmailIcon />
                </div>
                <input 
                  v-model="email"
                  type="email" 
                  class="rounded-e-md border-slate-300 w-11/12 focus:ring-persian-green-500 focus:border-persian-green-500 dark:focus:border-persian-green-500 focus:outline-none focus:text-gray-600 p-2 dark:bg-slate-700 dark:text-white dark:border-slate-500 dark:placeholder-slate-400"
                  :placeholder="$t('yourEmail')" 
                  required />
                </div>
                <span 
                  class="text-red-500 ms-4" 
                  v-if="!isValidEmail && email.length > 0" >
                  {{ $t('incorrectOrEmptyEmail') }}
                </span>
            </div>
          </div>

          <hr class="dark:border-slate-500"/>

          <div class="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 class="md:w-1/3 mx-auto max-w-sm dark:text-slate-200">{{ $t('personalInfo') }}</h2>

            <div class="md:w-2/3 mx-auto max-w-sm space-y-5">

              <div>
                <label class="text-sm text-gray-400 dark:text-slate-300">{{ $t('name') }}</label>
                <div class="w-full inline-flex rounded-md overflow-hidden">
                  <div class="w-1/12 pt-2 bg-gray-100 dark:bg-gray-600 rounded-s-md">
                    <UserInfoIcon />
                  </div>
                  <input 
                    v-model="name" 
                    type="text" 
                    class="rounded-e-md border-slate-300 w-11/12 focus:ring-persian-green-500 focus:border-persian-green-500 dark:focus:border-persian-green-500 focus:outline-none focus:text-gray-600 p-2 dark:bg-slate-700 dark:text-white dark:border-slate-500 dark:placeholder-slate-400"
                    :placeholder="$t('yourName')" 
                    required />
                  </div>
                  <span 
                    class="text-red-500 ms-4" 
                    v-if="!isValidName && name.length > 0" >
                    {{ $t('incorrectNameOrEmpty') }}
                  </span>
              </div>

              <div>
                <label class="text-sm text-gray-400 dark:text-slate-300">{{ $t('lastname') }}</label>
                <div class="w-full inline-flex rounded-md overflow-hidden">
                  <div class="pt-2 w-1/12 bg-gray-100 dark:bg-gray-600 rounded-s-md">
                    <UserInfoIcon />
                  </div>
                  <input 
                    v-model="lastName" 
                    type="text" 
                    class="rounded-e-md border-slate-300 w-11/12 focus:ring-persian-green-500 focus:border-persian-green-500 dark:focus:border-persian-green-500 focus:outline-none focus:text-gray-600 p-2 dark:bg-slate-700 dark:text-white dark:border-slate-500 dark:placeholder-slate-400"
                    :placeholder="$t('yourLastName')"
                    required />
                  </div>
                  <span 
                    class="text-red-500 ms-4" 
                    v-if="!isValidLastName && email.length > 0" >
                    {{ $t('incorrectLastNameOrEmpty') }}
                  </span>
              </div>
            </div>
          </div>

          <hr class="dark:border-slate-500"/>

          <div class="md:inline-flex space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 class="md:w-1/3 mx-auto max-w-sm dark:text-slate-200">{{ $t('changePassword') }}</h2>

            <div class="md:w-2/3 mx-auto max-w-sm space-y-5">
              <span class="dark:text-slate-400">{{ $t('passwordIsRequiredMessage') }}</span>
              <div>
                <label class="text-sm text-gray-400 dark:text-slate-300">{{ $t('password') }}</label>
                <div class="w-full inline-flex rounded-md overflow-hidden">
                  <div class="w-1/12 pt-2 bg-gray-100 dark:bg-gray-600 rounded-s-md">
                    <PasswordIcon />
                  </div>
                  <input 
                    v-model="password" 
                    type="password" 
                    class="rounded-e-md border-slate-300 w-11/12 focus:ring-persian-green-500 focus:border-persian-green-500 dark:focus:border-persian-green-500 focus:outline-none focus:text-gray-600 p-2 dark:bg-slate-700 dark:text-white dark:border-slate-500 dark:placeholder-slate-400"
                    :placeholder="$t('currentPassword')"
                    required />
                </div>
                <span 
                  :class="{'hidden': password !== ''}" 
                  class="text-slate-400 ms-4">
                  {{ $t('passwordRequired') }}
                </span>
              </div>

              <div>
                <label class="text-sm text-gray-400 dark:text-slate-300">{{ $t('newPassword') }}</label>
                <div class="w-full inline-flex rounded-md overflow-hidden">
                  <div class="pt-2 w-1/12 bg-gray-100 dark:bg-gray-600 rounded-s-md">
                    <PasswordIcon />
                  </div>
                  <input 
                    v-model="newPassword" 
                    type="password" 
                    class="rounded-e-md border-slate-300 w-11/12 focus:ring-persian-green-500 focus:border-persian-green-500 dark:focus:border-persian-green-500 focus:outline-none focus:text-gray-600 p-2 dark:bg-slate-700 dark:text-white dark:border-slate-500 dark:placeholder-slate-400"
                    :placeholder="$t('yourNewPassword')" />
                  </div>
                  <div class="ms-4">
                    <span 
                      class="text-red-500" 
                      v-if="!isValidNewPassword && newPassword !== ''">
                      {{ $t('requiredNewpasswordMessage') }}
                    </span>
                  </div>
              </div>

            </div>
          </div>

          <hr class="dark:border-slate-500"/>

          <div class="w-full p-4 text-gray-500 flex items-center justify-end gap-2 flex-col md:flex-row">
            <h2 class="md:w-1/2 max-w-sm mx-auto dark:text-slate-200 text-left">{{ $t('actions') }}</h2>
            <span 
              class="text-red-600" 
              v-if="!responseMessage.status"> 
              {{ responseMessage.message }}
            </span>
            <button
              @click="updateAccont()"
              :class="isValidFields ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
              class="text-white w-full max-w-fit rounded-md text-center title-page py-2 px-4 inline-flex items-center focus:outline-none hover:bg-gradient-to-b">
              <RefreshIcon :className="{ 'motion-reduce:hidden animate-spin': move }"/>
              {{ $t('update') }}
            </button>
            <button 
              :class="isValidPassWord  ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
              :disabled="!isValidPassWord"
              @click="veryfyPasswordToDeleteAccount"
              class="inline-flex text-slate-600 group items-center focus:outline-none lg:mr-4 hover:text-red-500 dark:text-slate-200 dark:hover:text-red-500 duration-200">
              <TrashIcon className="w-4 stroke-slate-600 group-hover:stroke-red-500 dark:stroke-slate-200"/>
              {{ $t('deleteAccount') }}
            </button>
        </div>
      </div>
    </form>
    <!-- MODAL -->
    <ModalTodos :action="openModal">
      <ActionConfirm 
        @closeModal="cancelModal()" 
        @deleteAccount="deleteAccount()" 
        :confimrRol="rolPassword"
        :textModal="messgeModal" />
    </ModalTodos>
  </div>
</section>
</template>