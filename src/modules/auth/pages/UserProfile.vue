<script>
import ProfileIcon from '../../ui/components/icons/ProfileIcon.vue';
import EmailIcon from '../components/icons/EmailIcon.vue';
import UserInfoIcon from '../components/icons/UserInfoIcon.vue';
import PasswordIcon from '../components/icons/PasswordIcon.vue';
import RefreshIcon from '../components/icons/RefreshIcon.vue';
import TrashIcon from '../components/icons/TrashIcon.vue';

export default {
  components: {
    ProfileIcon,
    EmailIcon,
    UserInfoIcon,
    PasswordIcon,
    RefreshIcon,
    TrashIcon
  }
}
</script>
<template>
  <section class="flex flex-col gap-4 justify-around items-center lg:flex-row lg:items-start">
    <div>
      <h2 class="text-4xl mb-4 xl:my-6 text-center lg:text-start">Profile</h2>
      <span>Add information about yourself</span>
    </div>
    <div class="container max-w-2xl md:w-3/4 shadow-md rounded-md overflow-hidden">

      <div class="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-persian-green-400 rounded-t">
        <div class="max-w-sm mx-auto md:w-full md:mx-0">
          <div class="inline-flex items-center space-x-4">
            <ProfileIcon className="w-12 h-12" />
            <h1 class="text-gray-600">Valentina Alzate</h1>
          </div>
        </div>
      </div>

      <div class="bg-white space-y-6">
        <div class="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
          <h2 class="md:w-1/3 max-w-sm mx-auto">Account</h2>

          <div class="md:w-2/3 max-w-sm mx-auto">
            <label class="text-sm text-gray-400">Email</label>
            <div class="w-full inline-flex rounded-md overflow-hidden">
              <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50 rounded-s-md">
                <EmailIcon />
              </div>
              <input name="email" type="email" class="rounded-e-md border-slate-300 w-11/12 focus:outline-none focus:text-gray-600 p-2"
                placeholder="email@example.com" />
            </div>
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
                <input name="name" type="text" class="rounded-e-md border-slate-300 w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="Your name" />
              </div>
            </div>

            <div>
              <label class="text-sm text-gray-400">Last name</label>
              <div class="w-full inline-flex rounded-md overflow-hidden">
                <div class="pt-2 w-1/12 bg-gray-100 rounded-s-md">
                  <UserInfoIcon />
                </div>
                <input name="lastName" type="text" class="rounded-e-md border-slate-300 w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="Your last name" />
              </div>
            </div>

          </div>
        </div>

        <hr />

        <div class="md:inline-flex space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
          <h2 class="md:w-1/3 mx-auto max-w-sm">Change password</h2>

          <div class="md:w-2/3 mx-auto max-w-sm space-y-5">

            <div>
              <label class="text-sm text-gray-400">Password</label>
              <div class="w-full inline-flex rounded-md overflow-hidden">
                <div class="w-1/12 pt-2 bg-gray-100 rounded-s-md">
                  <PasswordIcon />
                </div>
                <input name="password" type="password" class="rounded-e-md border-slate-300 w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="Your current password" />
              </div>
            </div>

            <div>
              <label class="text-sm text-gray-400">New password</label>
              <div class="w-full inline-flex rounded-md overflow-hidden">
                <div class="pt-2 w-1/12 bg-gray-100 rounded-s-md">
                  <PasswordIcon />
                </div>
                <input name="newPassword" type="password" class="rounded-e-md border-slate-300 w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="Your new password" />
              </div>
            </div>

          </div>
        </div>

        <hr />

        <div class="w-full p-4 text-gray-500 flex items-center justify-end gap-4">
          <!-- !! Peticioón de actualizar usuario -->
          <button
            class="text-white w-full max-w-fit rounded-md text-center title-page py-2 px-4 inline-flex items-center focus:outline-none hover:bg-gradient-to-b">
            <RefreshIcon />
            Update
          </button>
          <!-- !! Petición de eliminar usuario -->
          <button class="inline-flex items-center focus:outline-none mr-4">
            <TrashIcon />
            Delete account
          </button>
        </div>
      </div>
    </div>
  </section>
</template>