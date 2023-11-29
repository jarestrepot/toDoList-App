<script>
import ProfileIcon from '../../ui/components/icons/ProfileIcon.vue';
import EmailIcon from '../components/icons/EmailIcon.vue';
import UserInfoIcon from '../components/icons/UserInfoIcon.vue';
import PasswordIcon from '../components/icons/PasswordIcon.vue';
import RefreshIcon from '../components/icons/RefreshIcon.vue';
import TrashIcon from '../components/icons/TrashIcon.vue';
import { userAuthStore } from '../../../store/auth/authUser';
import { startDeleteUser, startEditUser } from '../../../helpers/authFetch';
import CONSTANTS from '../../../helpers/constants';

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
      store: userAuthStore(),
      responseMessage: {
        status: false,
        message:''
      },
    }
  },
  async mounted() {
    const { user } = this.store;
    this.name = user?.name ?? 'name';
    this.lastName = user?.lastName ?? 'last name';
    this.email = user?.email ?? 'email';
    this.userId = user?.user_id;
  },
  components: {
    ProfileIcon,
    EmailIcon,
    UserInfoIcon,
    PasswordIcon,
    RefreshIcon,
    TrashIcon
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
    isValidNewPassword() {
      return CONSTANTS.VALIDPASSWORD.test(this.newPassword)
    },
    isValidFields() {
      return this.isValidName && this.isValidLastName && this.isValidEmail && this.password
    }
  },
  methods: {
    async deleteAccount(){
      const response = await startDeleteUser(this.userId)
      if(response.Error){
        this.responseMessage = {
          message: response.Error
        }
      }else{
        const { logoutUser } = this.store;
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
        const { updateUser } = this.store;
        updateUser(response);
        this.move = false;
        this.password = null;
        this.responseMessage = {
          status: true,
          message: 'User updated successfully'
        }
      }
    }
  }
}
</script>
<template>
  <section class="flex flex-col gap-4 justify-around items-center lg:flex-row lg:items-start">
    <div>
      <h2 class="textDegrant text-4xl mb-4 xl:my-6 text-center lg:text-start font-semibold">Profile</h2>
      <span>Add information about yourself</span>
    </div>
    <div class="container max-w-2xl md:w-3/4 shadow-md rounded-md overflow-hidden">

      <div class="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-persian-green-400 rounded-t w-full">
        <div class="mx-auto md:w-full md:mx-0 flex flex-col md:flex-row justify-center items-center">
          <div class="inline-flex items-center space-x-4 w-full text-center">
            <ProfileIcon className="w-12 h-12" />
            <h1 class="text-gray-600 uppercase font-semibold">{{ `${name} ${lastName}` }}</h1>
          </div>
          <div class="w-full flex justify-end p-1 text-end">
            <span v-if="responseMessage.status" class="text-green-500"> {{ responseMessage.message }}</span>
          </div>
        </div>
      </div>
      <form @submit.prevent="move = true">
        <div class="bg-white space-y-6">
          <div class="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 class="md:w-1/3 max-w-sm mx-auto">Account</h2>

            <div class="md:w-2/3 max-w-sm mx-auto">
              <label class="text-sm text-gray-400">Email</label>
              <div class="w-full inline-flex rounded-md overflow-hidden">
                <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50 rounded-s-md">
                  <EmailIcon />
                </div>
                <input 
                  v-model="email"
                  type="email" 
                  class="rounded-e-md border-slate-300 w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="Your email" 
                  required />
                </div>
                <span class="text-red-500 ms-4" v-if="!isValidEmail && email.length > 0" >
                  Incorrect or empty email
                </span>
            </div>
          </div>

          <hr />

          <div class="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 class="md:w-1/3 mx-auto max-w-sm">Personal info</h2>

            <div class="md:w-2/3 mx-auto max-w-sm space-y-5">

              <div>
                <label class="text-sm text-gray-400">Name</label>
                <div class="w-full inline-flex rounded-md overflow-hidden">
                  <div class="w-1/12 pt-2 bg-gray-100 rounded-s-md">
                    <UserInfoIcon />
                  </div>
                  <input 
                    v-model="name" 
                    type="text" 
                    class="rounded-e-md border-slate-300 w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Your name" 
                    required />
                  </div>
                  <span class="text-red-500 ms-4" v-if="!isValidName && name.length > 0" >
                    Incorrect or empty name
                  </span>
              </div>

              <div>
                <label class="text-sm text-gray-400">Last name</label>
                <div class="w-full inline-flex rounded-md overflow-hidden">
                  <div class="pt-2 w-1/12 bg-gray-100 rounded-s-md">
                    <UserInfoIcon />
                  </div>
                  <input 
                    v-model="lastName" 
                    type="text" 
                    class="rounded-e-md border-slate-300 w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Your last name"
                    required />
                  </div>
                  <span class="text-red-500 ms-4" v-if="!isValidLastName && email.length > 0" >
                    Incorrect or empty last name
                  </span>
              </div>

            </div>
          </div>

          <hr />

          <div class="md:inline-flex space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 class="md:w-1/3 mx-auto max-w-sm">Change password</h2>

            <div class="md:w-2/3 mx-auto max-w-sm space-y-5">
              <span>The current password is required to make any data changes to your account.</span>
              <div>
                <label class="text-sm text-gray-400">Password</label>
                <div class="w-full inline-flex rounded-md overflow-hidden">
                  <div class="w-1/12 pt-2 bg-gray-100 rounded-s-md">
                    <PasswordIcon />
                  </div>
                  <input 
                    v-model="password" 
                    type="password" 
                    class="rounded-e-md border-slate-300 w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Your current password"
                    required />
                </div>
                <span :class="{'hidden': password !== ''}" class="text-slate-400 ms-4">
                  Password is required
                </span>
              </div>

              <div>
                <label class="text-sm text-gray-400">New password</label>
                <div class="w-full inline-flex rounded-md overflow-hidden">
                  <div class="pt-2 w-1/12 bg-gray-100 rounded-s-md">
                    <PasswordIcon />
                  </div>
                  <input 
                    v-model="newPassword" 
                    type="password" 
                    class="rounded-e-md border-slate-300 w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Your new password" />
                  </div>
                  <div class="ms-4">
                    <span class="text-red-500" v-if="!isValidNewPassword && newPassword !== ''">
                      The password must contain 8 characters including a number.
                    </span>
                  </div>
              </div>

            </div>
          </div>

          <hr />

          <div class="w-full p-4 text-gray-500 flex items-center justify-end gap-4">
            <span class="text-red-600" v-if="!responseMessage.status"> {{ responseMessage.message }}</span>
            <button
              @click="updateAccont()"
              :class="isValidFields ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
              class="text-white w-full max-w-fit rounded-md text-center title-page py-2 px-4 inline-flex items-center focus:outline-none hover:bg-gradient-to-b">
              <RefreshIcon :className="{'motion-reduce:hidden animate-spin': move}"/>
              Update
            </button>
            <button 
              @click="deleteAccount()"
              class="inline-flex items-center focus:outline-none mr-4 hover:text-red-500 duration-200">
              <TrashIcon />
              Delete account
            </button>
        </div>
      </div>
    </form>
  </div>
</section>
</template>