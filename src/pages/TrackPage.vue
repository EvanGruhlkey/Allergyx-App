<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="text-h6">Track Your Symptoms</div>
            <div class="text-subtitle2 text-grey-7">Record how you're feeling today</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <!-- Symptom Selection -->
              <div>
                <div class="text-subtitle2 q-mb-sm">Select Symptoms</div>
                <div class="row q-col-gutter-sm">
                  <div v-for="symptom in symptoms" :key="symptom.id" class="col-6 col-sm-4">
                    <q-checkbox
                      v-model="selectedSymptoms"
                      :val="symptom.id"
                      :label="symptom.label"
                    />
                  </div>
                </div>
              </div>

              <!-- Severity Slider -->
              <div>
                <div class="text-subtitle2 q-mb-sm">Severity Level</div>
                <q-slider
                  v-model="severity"
                  :min="1"
                  :max="5"
                  :step="1"
                  label
                  label-always
                  markers
                  snap
                  class="q-mt-lg"
                />
                <div class="row justify-between text-caption text-grey-7">
                  <span>Mild</span>
                  <span>Severe</span>
                </div>
              </div>

              <!-- Notes -->
              <div>
                <div class="text-subtitle2 q-mb-sm">Additional Notes</div>
                <q-input
                  v-model="notes"
                  type="textarea"
                  filled
                  autogrow
                />
              </div>

              <q-btn
                type="submit"
                color="primary"
                label="Save Symptoms"
                class="q-mt-lg"
                :loading="loading"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Recent Entries</div>
          </q-card-section>

          <q-separator />

          <q-list>
            <q-item v-for="entry in recentEntries" :key="entry.id">
              <q-item-section>
                <q-item-label>{{ entry.date }}</q-item-label>
                <q-item-label caption>
                  Severity: {{ entry.severity }}/5
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn flat round icon="visibility" @click="viewEntry(entry)" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'TrackPage',

  setup() {
    const $q = useQuasar()
    const loading = ref(false)
    const selectedSymptoms = ref([])
    const severity = ref(1)
    const notes = ref('')

    const symptoms = ref([
      { id: 1, label: 'Sneezing' },
      { id: 2, label: 'Runny Nose' },
      { id: 3, label: 'Itchy Eyes' },
      { id: 4, label: 'Coughing' },
      { id: 5, label: 'Wheezing' },
      { id: 6, label: 'Skin Rash' }
    ])

    const recentEntries = ref([
      { id: 1, date: 'Today', severity: 3 },
      { id: 2, date: 'Yesterday', severity: 2 }
    ])

    const onSubmit = async () => {
      loading.value = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        $q.notify({
          color: 'positive',
          message: 'Symptoms tracked successfully!',
          icon: 'check'
        })
        
        // Reset form
        selectedSymptoms.value = []
        severity.value = 1
        notes.value = ''
      } catch (error) {
        $q.notify({
          color: 'negative',
          message: 'Failed to track symptoms. Please try again.',
          icon: 'error'
        })
      } finally {
        loading.value = false
      }
    }

    const viewEntry = (entry) => {
      $q.dialog({
        title: `Symptoms - ${entry.date}`,
        message: `Severity Level: ${entry.severity}/5`,
        ok: true
      })
    }

    return {
      loading,
      symptoms,
      selectedSymptoms,
      severity,
      notes,
      recentEntries,
      onSubmit,
      viewEntry
    }
  }
})
</script>