<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="login-card q-pa-lg" style="width: 400px">
      <q-card-section class="text-center">
        <div class="text-h5 text-primary text-weight-bold q-mb-md">Welcome to AllergyX</div>
        <q-avatar size="80px" class="q-mb-md">
          <img src="/api/placeholder/80/80" alt="AllergyX Logo">
        </q-avatar>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="email"
            type="email"
            label="Email"
            filled
            :rules="[val => !!val || 'Email is required']"
          />

          <q-input
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="Password"
            filled
            :rules="[val => !!val || 'Password is required']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="flex justify-between items-center">
            <q-checkbox v-model="rememberMe" label="Remember me" />
            <q-btn flat color="primary" label="Forgot Password?" size="sm" />
          </div>

          <q-btn
            type="submit"
            color="primary"
            size="lg"
            class="full-width"
            label="Sign In"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-7">
          Don't have an account?
          <router-link to="/register" class="text-primary">Sign up</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',
      isPwd: true,
      rememberMe: false
    }
  },
  methods: {
    onSubmit () {
      // Handle login logic here
      this.$router.push('/') // Navigate to dashboard after login
    }
  }
}
</script>