<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="login-card" style="width: 400px">
      <q-card-section class="text-center">
        <div class="text-h5 text-primary text-weight-bold q-mb-md">Welcome to AllergyX</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            v-model="email"
            label="Email"
            type="email"
            filled
          />

          <q-input
            v-model="password"
            label="Password"
            :type="isPwd ? 'password' : 'text'"
            filled
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-btn
            type="submit"
            color="primary"
            class="full-width"
            label="Sign In"
            :loading="loading"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <p class="text-grey-7">
          Don't have an account?
          <router-link to="/auth/register" class="text-primary">Sign up</router-link>
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
  name: 'LoginPage',

  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const email = ref('')
    const password = ref('')
    const isPwd = ref(true)
    const loading = ref(false)

    const onSubmit = async () => {
      loading.value = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        $q.localStorage.set('isLoggedIn', true)
        $q.localStorage.set('userName', 'John Doe') // Replace with actual user name
        
        router.push('/dashboard')
      } catch (error) {
        $q.notify({
          color: 'negative',
          message: 'Login failed',
          icon: 'error'
        })
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      isPwd,
      loading,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.login-card {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>