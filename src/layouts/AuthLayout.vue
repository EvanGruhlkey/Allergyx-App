<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn
            flat
            no-caps
            no-wrap
            class="q-ml-xs"
            to="/"
          >
            <q-avatar size="28px">
              <img src="~assets/allergyx-logo.png" alt="Allergyx Logo">
            </q-avatar>
            <q-toolbar-title class="text-primary text-weight-bold">
              Allergyx
            </q-toolbar-title>
          </q-btn>
        </q-toolbar-title>

        <q-space />

        <!-- Navigation buttons -->
        <q-btn
          flat
          no-caps
          to="/auth/login"
          :class="{ 'text-primary': $route.path === '/auth/login' }"
          label="Login"
        />
        <q-btn
          flat
          no-caps
          to="/auth/register"
          :class="{ 'text-primary': $route.path === '/auth/register' }"
          label="Register"
        />
      </q-toolbar>
    </q-header>

    <q-page-container class="auth-container">
      <!-- Background design -->
      <div class="auth-background">
        <div class="left-pattern"></div>
        <div class="right-pattern"></div>
      </div>

      <!-- Main content area -->
      <div class="auth-content">
        <div class="auth-card-wrapper">
          <q-card flat bordered class="auth-card">
            <router-view />
          </q-card>
        </div>

        <!-- Footer -->
        <div class="auth-footer q-pa-md text-center text-grey-7">
          <div class="row q-col-gutter-sm justify-center">
            <div class="col-auto">
              <a href="#" class="text-grey-7">Privacy Policy</a>
            </div>
            <div class="col-auto">
              <a href="#" class="text-grey-7">Terms of Service</a>
            </div>
            <div class="col-auto">
              <a href="#" class="text-grey-7">Contact Support</a>
            </div>
          </div>
          <div class="q-mt-sm">
            &copy; {{ currentYear }} Allergyx. All rights reserved.
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AuthLayout',

  setup () {
    const currentYear = computed(() => new Date().getFullYear())

    return {
      currentYear
    }
  }
})
</script>

<style lang="scss">
.auth-container {
  min-height: 100vh;
  position: relative;
  background-color: #f5f7fa;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;

  .left-pattern,
  .right-pattern {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    opacity: 0.1;
  }

  .left-pattern {
    background: linear-gradient(45deg, $primary, $secondary);
    top: -100px;
    left: -100px;
  }

  .right-pattern {
    background: linear-gradient(135deg, $secondary, $primary);
    bottom: -100px;
    right: -100px;
  }
}

.auth-content {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.auth-card-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 599px) {
    margin: 1rem;
  }
}

.auth-footer {
  a {
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: $primary;
    }
  }
}

// Additional responsive styles
@media (max-width: 599px) {
  .auth-background {
    .left-pattern,
    .right-pattern {
      width: 300px;
      height: 300px;
    }
  }
}
</style>