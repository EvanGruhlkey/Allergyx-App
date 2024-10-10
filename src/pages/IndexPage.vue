<template>
  <q-page class="bg-grey-2">
    <!-- Header -->
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

        <q-toolbar-title class="text-primary text-weight-bold">
          AllergyX
        </q-toolbar-title>

        <q-space />

        <div class="row items-center q-gutter-sm">
          <span class="text-grey-8">Welcome, {{ username }}</span>
          <q-btn flat round dense icon="settings">
            <q-tooltip>Settings</q-tooltip>
          </q-btn>
          <q-btn-dropdown flat dense label="Menu">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Preferences</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Main Content -->
    <div class="q-pa-md q-mt-lg max-w-7xl mx-auto">
      <!-- Risk Assessment Card -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">Today's Allergy Risk</div>
          <div class="row items-center justify-between">
            <div class="row items-center">
              <q-circular-progress
                :value="riskLevel * 10"
                size="80px"
                :color="getRiskColor"
                show-value
                class="text-weight-bold"
                :thickness="0.2"
              >
                {{ riskLevel }}
              </q-circular-progress>
              <div class="q-ml-md">
                <div class="text-subtitle1 text-weight-medium">{{ riskMessage }}</div>
                <div class="text-caption text-grey-7">Based on current conditions</div>
              </div>
            </div>
            <q-btn color="primary" outline label="View Details" />
          </div>
        </q-card-section>
      </q-card>

      <!-- Metrics Grid -->
      <div class="row q-col-gutter-md q-mb-md">
        <div v-for="metric in metrics" :key="metric.name" class="col-12 col-md-4">
          <q-card>
            <q-card-section>
              <div class="text-subtitle1 text-weight-medium">{{ metric.name }}</div>
              <div class="row items-end justify-between q-mt-sm">
                <div>
                  <div class="text-h4 text-weight-bold">{{ metric.value }}</div>
                  <div class="text-caption text-grey-7">{{ metric.unit }}</div>
                </div>
                <q-chip
                  :color="metric.trending === 'up' ? 'negative' : 'positive'"
                  text-color="white"
                  size="sm"
                >
                  {{ metric.change }}
                </q-chip>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Forecast Section -->
      <q-card>
        <q-card-section>
          <div class="text-h6 q-mb-md">7-Day Forecast</div>
          <div class="row q-col-gutter-sm justify-between">
            <div v-for="day in forecast" :key="day.date" class="text-center">
              <div class="text-caption text-weight-medium">{{ day.name }}</div>
              <q-avatar
                :color="day.riskClass"
                size="2.5rem"
                class="q-my-sm shadow-1"
              />
              <div class="text-caption">{{ day.risk }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      username: 'Sarah',
      riskLevel: 7,
      riskMessage: 'High pollen levels expected',
      metrics: [
        {
          name: 'Pollen Count',
          value: '284',
          unit: 'grains/m³',
          change: '+12%',
          trending: 'up'
        },
        {
          name: 'Humidity',
          value: '65%',
          unit: 'relative',
          change: '-5%',
          trending: 'down'
        },
        {
          name: 'Air Quality',
          value: '42',
          unit: 'AQI',
          change: 'Good',
          trending: 'down'
        }
      ],
      forecast: [
        { name: 'Mon', risk: 'High', riskClass: 'negative' },
        { name: 'Tue', risk: 'Med', riskClass: 'warning' },
        { name: 'Wed', risk: 'Low', riskClass: 'positive' },
        { name: 'Thu', risk: 'Low', riskClass: 'positive' },
        { name: 'Fri', risk: 'Med', riskClass: 'warning' },
        { name: 'Sat', risk: 'High', riskClass: 'negative' },
        { name: 'Sun', risk: 'High', riskClass: 'negative' }
      ]
    }
  },
  computed: {
    getRiskColor () {
      if (this.riskLevel >= 7) return 'negative'
      if (this.riskLevel >= 4) return 'warning'
      return 'positive'
    }
  }
}

</script>