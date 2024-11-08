<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Filters -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row items-center q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-select
                  v-model="timeRange"
                  :options="timeRangeOptions"
                  label="Time Range"
                  filled
                  emit-value
                  map-options
                />
              </div>
              <div class="col-12 col-md-4">
                <q-select
                  v-model="selectedSymptoms"
                  :options="symptomOptions"
                  label="Symptoms"
                  filled
                  multiple
                  use-chips
                />
              </div>
              <div class="col-12 col-md-4">
                <q-btn
                  color="primary"
                  icon="filter_list"
                  label="Apply Filters"
                  @click="applyFilters"
                  :loading="loading"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- History Chart -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Symptom History</div>
            <div class="text-subtitle2 text-grey-7">Tracking your progress over time</div>
          </q-card-section>

          <q-separator />

          <q-card-section class="chart-container">
            <!-- Placeholder for chart -->
            <div class="text-center text-grey-7">
              Chart visualization will be implemented here
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- History List -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Detailed History</div>
          </q-card-section>

          <q-separator />

          <q-table
            :rows="historyData"
            :columns="columns"
            row-key="id"
            :loading="loading"
            :v-model:propName="pagination"
          >
            <template v-slot:body-cell-severity="props">
              <q-td :props="props">
                <q-chip
                  :color="getSeverityColor(props.value)"
                  text-color="white"
                  size="sm"
                >
                  {{ props.value }}/5
                </q-chip>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn
                  flat
                  round
                  size="sm"
                  icon="visibility"
                  @click="viewDetails(props.row)"
                >
                  <q-tooltip>View Details</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'HistoryPage',

  setup() {
    const $q = useQuasar()
    const loading = ref(false)
    const timeRange = ref('week')
    const selectedSymptoms = ref([])

    const timeRangeOptions = [
      { label: 'Last Week', value: 'week' },
      { label: 'Last Month', value: 'month' },
      { label: 'Last 3 Months', value: 'quarter' },
      { label: 'Last Year', value: 'year' }
    ]

    const symptomOptions = [
      'Sneezing',
      'Runny Nose',
      'Itchy Eyes',
      'Coughing',
      'Wheezing',
      'Skin Rash'
    ]

    const columns = [
      {
        name: 'date',
        required: true,
        label: 'Date',
        align: 'left',
        field: row => row.date,
        format: val => val,
        sortable: true
      },
      {
        name: 'symptoms',
        required: true,
        label: 'Symptoms',
        align: 'left',
        field: row => row.symptoms.join(', ')
      },
      {
        name: 'severity',
        required: true,
        label: 'Severity',
        align: 'center',
        field: row => row.severity,
        sortable: true
      },
      {
        name: 'actions',
        required: true,
        label: 'Actions',
        align: 'center'
      }
    ]

    const historyData = ref([
      {
        id: 1,
        date: '2024-03-15',
        symptoms: ['Sneezing', 'Runny Nose'],
        severity: 3,
        notes: 'High pollen day'
      },
      {
        id: 2,
        date: '2024-03-14',
        symptoms: ['Itchy Eyes'],
        severity: 2,
        notes: 'Mild symptoms'
      }
    ])

    const pagination = ref({
      sortBy: 'date',
      descending: true,
      page: 1,
      rowsPerPage: 10
    })

    const getSeverityColor = (severity) => {
      if (severity <= 2) return 'green'
      if (severity <= 4) return 'orange'
      return 'red'
    }

    const applyFilters = async () => {
      loading.value = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        $q.notify({
          color: 'positive',
          message: 'History updated!',
          icon: 'check'
        })
      } catch (error) {
        $q.notify({
          color: 'negative',
          message: 'Failed to update history',
          icon: 'error'
        })
      } finally {
        loading.value = false
      }
    }

    const viewDetails = (row) => {
      $q.dialog({
        title: `Symptom Details - ${row.date}`,
        message: `Symptoms: ${row.symptoms.join(', ')}\nSeverity: ${row.severity}/5\nNotes: ${row.notes}`,
        ok: true
      })
    }

    return {
      loading,
      timeRange,
      timeRangeOptions,
      selectedSymptoms,
      symptomOptions,
      columns,
      historyData,
      pagination,
      getSeverityColor,
      applyFilters,
      viewDetails
    }
  }
})
</script>

<style lang="scss" scoped>
.chart-container {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>