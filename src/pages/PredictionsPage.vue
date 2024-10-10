<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Predictions Overview -->
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="text-h6">Allergy Predictions</div>
            <div class="text-subtitle2 text-grey-7">Next 7 days forecast</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="row q-col-gutter-md">
              <div v-for="(day, index) in predictions" :key="index" class="col-12">
                <q-item>
                  <q-item-section avatar>
                    <q-avatar :color="day.riskColor" text-color="white">
                      {{ day.riskLevel }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ day.date }}</q-item-label>
                    <q-item-label caption>{{ day.conditions }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-chip :color="day.riskColor" text-color="white">
                      {{ day.riskText }}
                    </q-chip>
                  </q-item-section>
                </q-item>
                <q-separator v-if="index < predictions.length - 1" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Triggers and Recommendations -->
      <div class="col-12 col-md-4">
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Active Triggers</div>
            <q-list>
              <q-item v-for="trigger in activeTriggers" :key="trigger.name">
                <q-item-section avatar>
                  <q-icon :name="trigger.icon" :color="trigger.color" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ trigger.name }}</q-item-label>
                  <q-item-label caption>{{ trigger.level }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-card>
          <q-card-section>
            <div class="text-h6">Recommendations</div>
            <q-list>
              <q-item v-for="(rec, index) in recommendations" :key="index">
                <q-item-section avatar>
                  <q-icon name="check_circle" color="positive" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ rec }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PredictionsPage',
  data () {
    return {
      predictions: [
        {
          date: 'Today',
          conditions: 'High pollen, moderate humidity',
          riskLevel: 'H',
          riskColor: 'negative',
          riskText: 'High Risk'
        },
        // Add more prediction days...
      ],
      activeTriggers: [
        {
          name: 'Tree Pollen',
          level: 'Very High',
          icon: 'forest',
          color: 'negative'
        },
        // Add more triggers...
      ],
      recommendations: [
        'Keep windows closed during peak pollen hours',
        'Use air purifier when indoors',
        'Take preventive medication'
        // Add more recommendations...
      ]
    }
  }
}
</script>
