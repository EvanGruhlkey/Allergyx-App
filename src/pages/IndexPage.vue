<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Welcome Section -->
      <div class="col-12">
        <q-card class="welcome-card">
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="column">
                <div class="text-h5 text-weight-bold text-primary q-mb-sm">
                  Welcome back, {{ userName }}
                </div>
                <div class="text-subtitle1 text-grey-7">{{ currentDate }}</div>
              </div>
              <div>
                <q-btn-dropdown
                  color="primary"
                  label="Quick Actions"
                  class="q-px-md"
                  unelevated
                >
                  <q-list>
                    <q-item clickable v-close-popup @click="navigateTo('track')">
                      <q-item-section avatar>
                        <q-icon name="healing" color="primary" />
                      </q-item-section>
                      <q-item-section>Track Symptoms</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="navigateTo('predictions')">
                      <q-item-section avatar>
                        <q-icon name="air" color="primary" />
                      </q-item-section>
                      <q-item-section>View Forecast</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
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
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { date } from 'quasar'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const userName = ref($q.localStorage.getItem('userName') || 'User')
    
    const currentDate = date.formatDate(new Date(), 'dddd, MMMM D')

    const navigateTo = (route) => {
      router.push(`/dashboard/${route}`)
    }

    return {
      userName,
      currentDate,
      navigateTo
    }
  }
})
</script>

<style lang="scss" scoped>
.welcome-card {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .text-h5 {
    font-size: 1.5rem;
    line-height: 1.2;
  }

  .text-subtitle1 {
    font-size: 1rem;
    opacity: 0.8;
  }

  .q-btn-dropdown {
    border-radius: 8px;
  }
}

// Responsive adjustments
@media (max-width: 599px) {
  .welcome-card {
    .row {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .q-btn-dropdown {
      width: 100%;
    }
  }
}
</style>