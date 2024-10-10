<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-h6">
          Allergyx
        </q-toolbar-title>

        <q-btn flat round dense icon="notifications">
          <q-badge color="red" floating>2</q-badge>
        </q-btn>
        <q-btn flat round dense icon="settings" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu
        </q-item-label>

        <q-item
          v-for="link in links"
          :key="link.title"
          :to="link.link"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            {{ link.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      links: [
        { title: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
        { title: 'Track Symptoms', icon: 'add_circle', link: '/track' },
        { title: 'History', icon: 'history', link: '/history' },
        { title: 'Predictions', icon: 'trending_up', link: '/predictions' },
        { title: 'Settings', icon: 'settings', link: '/settings' }
      ]
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
}
</script>