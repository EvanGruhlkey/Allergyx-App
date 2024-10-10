<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="register-card q-pa-lg" style="width: 400px">
      <q-card-section class="text-center">
        <div class="text-h5 text-primary text-weight-bold">Create Account</div>
        <div class="text-grey-7 q-mt-sm">Join AllergyX to start tracking your triggers</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-input
                v-model="firstName"
                label="First Name"
                filled
                :rules="[val => !!val || 'First name is required']"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="lastName"
                label="Last Name"
                filled
                :rules="[val => !!val || 'Last name is required']"
              />
            </div>
          </div>

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

          <q-select
            v-model="allergyTypes"
            multiple
            filled
            label="Select Your Allergies"
            :options="allergyOptions"
          />

          <q-btn
            type="submit"
            color="primary"
            size="lg"
            class="full-width"
            label="Create Account"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-7">
          Already have an account?
          <router-link to="/login" class="text-primary">Sign in</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'RegisterPage',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isPwd: true,
      allergyTypes: [],
      allergyOptions: [
        'Pollen',
        'Dust',
        'Pet Dander',
        'Mold',
        'Food Allergies',
        'Other'
      ]
    }
  },
  methods: {
    onSubmit () {
      // Handle registration logic here
      this.$router.push('/login')
    }
  }
}
</script>
