<template>
  <q-page class="flex flex-center">
    <q-card class="register-card" style="width: 400px">
      <q-card-section class="text-center">
        <div class="text-h5 text-primary text-weight-bold q-mb-md">Create Account</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="formData.firstName"
                label="First Name"
                filled
                :rules="[val => !!val || 'First name is required']"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="formData.lastName"
                label="Last Name"
                filled
                :rules="[val => !!val || 'Last name is required']"
              />
            </div>
          </div>

          <q-input
            v-model="formData.email"
            label="Email"
            type="email"
            filled
            :rules="[
              val => !!val || 'Email is required',
              val => isValidEmail(val) || 'Please enter a valid email'
            ]"
          />

          <q-input
            v-model="formData.password"
            label="Password"
            :type="isPwd ? 'password' : 'text'"
            filled
            :rules="[
              val => !!val || 'Password is required',
              val => val.length >= 8 || 'Password must be at least 8 characters'
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-input
            v-model="formData.confirmPassword"
            label="Confirm Password"
            :type="isPwd ? 'password' : 'text'"
            filled
            :rules="[
              val => !!val || 'Please confirm your password',
              val => val === formData.password || 'Passwords do not match'
            ]"
          />

          <q-checkbox
            v-model="acceptTerms"
            label="I agree to the Terms and Privacy Policy"
            :rules="[val => val || 'You must agree to the terms']"
          />

          <q-btn
            type="submit"
            color="primary"
            class="full-width q-mt-lg"
            label="Create Account"
            :loading="loading"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <p class="text-grey-7">
          Already have an account?
          <router-link to="/auth/login" class="text-primary">Sign in</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'RegisterPage',

  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const loading = ref(false)
    const isPwd = ref(true)
    const acceptTerms = ref(false)
    const formData = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    const isValidEmail = (val) => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      return emailPattern.test(val)
    }

    const onSubmit = async () => {
      loading.value = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        $q.localStorage.set('isLoggedIn', true)
        $q.localStorage.set('userName', `${formData.value.firstName} ${formData.value.lastName}`)
        
        router.push('/dashboard')
        
        $q.notify({
          color: 'positive',
          message: 'Registration successful!',
          icon: 'check'
        })
      } catch (error) {
        $q.notify({
          color: 'negative',
          message: 'Registration failed. Please try again.',
          icon: 'error'
        })
      } finally {
        loading.value = false
      }
    }

    return {
      formData,
      isPwd,
      acceptTerms,
      loading,
      isValidEmail,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.register-card {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>