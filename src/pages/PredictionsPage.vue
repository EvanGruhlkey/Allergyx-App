<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Location Selection -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="col-12 col-md-6">
                <q-input
                  v-model="location"
                  label="Enter your location"
                  filled
                  clearable
                  :loading="locationLoading"
                >
                  <template v-slot:append>
                    <q-btn round flat icon="my_location" @click="getCurrentLocation" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6 q-mt-sm-md">
                <q-btn
                  color="primary"
                  icon="search"
                  label="Get Predictions"
                  @click="fetchPredictions"
                  :loading="loading"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Predictions Display -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Allergy Predictions</div>
            <div class="text-subtitle2 text-grey-7">Next 5 days forecast</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div v-if="loading" class="text-center q-pa-md">
              <q-spinner color="primary" size="3em" />
              <div class="q-mt-sm">Loading predictions...</div>
            </div>

            <div v-else class="row q-col-gutter-md">
              <div v-for="(day, index) in predictions" :key="index" class="col-12 col-sm-6 col-md">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-subtitle1 text-weight-bold">{{ day.date }}</div>
                    <div class="row items-center q-mt-sm">
                      <q-chip
                        :color="getRiskColor(day.riskLevel)"
                        text-color="white"
                        class="q-mr-sm"
                      >
                        {{ day.riskLevel }}
                      </q-chip>
                      <q-tooltip>{{ day.description }}</q-tooltip>
                    </div>
                    <div class="q-mt-md">
                      <div class="text-caption text-grey-7">Common Triggers:</div>
                      <div class="row q-gutter-xs q-mt-xs">
                        <q-chip
                          v-for="trigger in day.triggers"
                          :key="trigger"
                          dense
                          outline
                          color="primary"
                        >
                          {{ trigger }}
                        </q-chip>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Tips Section -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Recommended Actions</div>
            <div class="row q-col-gutter-md q-mt-sm">
              <div v-for="(tip, index) in tips" :key="index" class="col-12 col-md-4">
                <q-item>
                  <q-item-section avatar>
                    <q-icon :name="tip.icon" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ tip.title }}</q-item-label>
                    <q-item-label caption>{{ tip.description }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PredictionsPage',

  setup() {
    const $q = useQuasar()
    const location = ref('')
    const loading = ref(false)
    const locationLoading = ref(false)

    const predictions = ref([
      {
        date: 'Today',
        riskLevel: 'High',
        description: 'High pollen count expected',
        triggers: ['Pollen', 'Grass']
      },
      {
        date: 'Tomorrow',
        riskLevel: 'Moderate',
        description: 'Moderate allergen levels',
        triggers: ['Dust', 'Pollen']
      },
      {
        date: 'Wednesday',
        riskLevel: 'Low',
        description: 'Good air quality',
        triggers: ['Dust']
      },
      {
        date: 'Thursday',
        riskLevel: 'Moderate',
        description: 'Increasing pollen levels',
        triggers: ['Pollen', 'Mold']
      },
      {
        date: 'Friday',
        riskLevel: 'High',
        description: 'Peak pollen season',
        triggers: ['Pollen', 'Grass', 'Mold']
      }
    ])

    const tips = ref([
      {
        icon: 'home',
        title: 'Stay Indoors',
        description: 'Keep windows closed during high pollen times'
      },
      {
        icon: 'mask',
        title: 'Wear Protection',
        description: 'Use a mask when outdoors'
      },
      {
        icon: 'air',
        title: 'Use Air Purifier',
        description: 'Keep indoor air clean'
      }
    ])

    const getRiskColor = (risk) => {
      const colors = {
        Low: 'green',
        Moderate: 'orange',
        High: 'red'
      }
      return colors[risk] || 'grey'
    }

    const getCurrentLocation = () => {
      locationLoading.value = true
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Here you would typically reverse geocode the coordinates
            location.value = 'Current Location'
            locationLoading.value = false
          },
          (error) => {
            $q.notify({
              color: 'negative',
              message: 'Unable to get location',
              icon: 'error'
            })
            locationLoading.value = false
          }
        )
      }
    }

    const fetchPredictions = async () => {
      if (!location.value) {
        $q.notify({
          color: 'warning',
          message: 'Please enter a location',
          icon: 'warning'
        })
        return
      }

      loading.value = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        $q.notify({
          color: 'positive',
          message: 'Predictions updated!',
          icon: 'check'
        })
      } catch (error) {
        $q.notify({
          color: 'negative',
          message: 'Failed to fetch predictions',
          icon: 'error'
        })
      } finally {
        loading.value = false
      }
    }

    return {
      location,
      loading,
      locationLoading,
      predictions,
      tips,
      getRiskColor,
      getCurrentLocation,
      fetchPredictions
    }
  }
})
</script>