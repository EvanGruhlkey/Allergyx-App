<template>
  <q-layout view="hHh lpR fFf">
    <!-- Desktop Sidebar -->
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :width="280"
      :breakpoint="400"
      class="drawer-bg"
      :class="{'gt-sm': true}"
    >
      <div class="column full-height">
        <!-- Logo and Brand -->
        <div class="q-pa-md q-pb-lg text-center">
          <div class="company-logo q-mb-sm">
            <q-icon name="medical_services" size="40px" color="primary" />
          </div>
          <div class="text-h4 text-weight-bold text-primary">Allerlyze</div>
          <div class="text-subtitle2 q-mt-sm text-grey-6">Smart Allergy Management</div>
        </div>

        <!-- Navigation -->
        <q-scroll-area class="col" style="height: 100%">
          <q-list padding>
            <q-item
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              clickable
              v-ripple
              exact
              class="nav-item q-my-sm"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon" size="md" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">{{ link.label }}</q-item-label>
                <q-item-label caption>{{ link.caption }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <!-- User Profile & Logout -->
        <div class="q-pa-md">
          <q-card bordered class="user-card">
            <q-item>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ userInitials }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">{{ userName }}</q-item-label>
                <q-item-label caption>My Profile</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  round
                  icon="logout"
                  size="sm"
                  color="grey-7"
                  @click="logout"
                >
                  <q-tooltip>Logout</q-tooltip>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
    </q-drawer>

    <!-- Mobile Bottom Navigation -->
    <q-footer bordered class="bg-white lt-md" style="height: 60px">
      <q-tabs
        v-model="currentRoute"
        class="text-primary"
        indicator-color="transparent"
        active-color="primary"
        no-caps
        align="justify"
        narrow-indicator
      >
        <q-route-tab
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :name="link.to"
          :icon="link.icon"
          :label="link.label"
          class="mobile-tab"
        />
      </q-tabs>
    </q-footer>

    <q-page-container :class="{ 'q-pb-xl': $q.screen.lt.md }">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const router = useRouter()
    const route = useRoute()
    const $q = useQuasar()
    const leftDrawerOpen = ref($q.screen.gt.sm)
    const userName = ref($q.localStorage.getItem('userName') || 'User')
    const currentRoute = ref(route.path)

    const userInitials = computed(() => {
      return userName.value
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    })

    const navLinks = [
      {
        label: 'Dashboard',
        caption: 'Health Overview',
        icon: 'dashboard',
        to: '/dashboard'
      },
      {
        label: 'Track',
        caption: 'Daily Health Log',
        icon: 'healing',
        to: '/dashboard/track'
      },
      {
        label: 'Forecast',
        caption: 'Allergy Forecast',
        icon: 'air',
        to: '/dashboard/predictions'
      },
      {
        label: 'History',
        caption: 'Health Timeline',
        icon: 'timeline',
        to: '/dashboard/history'
      }
    ]

    watch(
      () => route.path,
      (newPath) => {
        currentRoute.value = newPath
      }
    )

    onMounted(() => {
      const isLoggedIn = $q.localStorage.getItem('isLoggedIn')
      if (!isLoggedIn) {
        router.push('/auth/login')
      }
    })

    const logout = () => {
      $q.localStorage.remove('isLoggedIn')
      router.push('/auth/login')
    }

    return {
      leftDrawerOpen,
      userName,
      userInitials,
      navLinks,
      logout,
      currentRoute
    }
  }
})
</script>

<style lang="scss">
// Keep existing styles and add:

// Mobile bottom navigation
.mobile-tab {
  padding: 6px 0;
  min-height: 60px;
  transition: all 0.3s ease;

  .q-tab__icon {
    font-size: 24px;
    margin-bottom: 4px;
  }

  .q-tab__label {
    font-size: 12px;
    line-height: 1;
  }

  &.q-tab--active {
    .q-tab__icon {
      transform: translateY(-2px);
    }
  }
}

// Footer styles
.q-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: env(safe-area-inset-bottom);
}

// Page container padding for mobile
.q-page-container {
  &.q-pb-xl {
    padding-bottom: calc(60px + env(safe-area-inset-bottom)) !important;
  }
}

// Make sure the layout takes full height
.q-layout {
  min-height: 100vh;
}
</style>