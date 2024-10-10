<template>
  <div class="trend-chart">
    <apexchart
      type="line"
      height="300"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'TrendChart',
  components: {
    apexchart: VueApexCharts
  },
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  computed: {
    series () {
      return [
        {
          name: 'Risk Level',
          data: this.chartData.map(item => item.risk)
        },
        {
          name: 'Pollen Count',
          data: this.chartData.map(item => item.pollen)
        }
      ]
    },
    chartOptions () {
      return {
        chart: {
          type: 'line',
          toolbar: {
            show: false
          }
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: this.chartData.map(item => item.day)
        },
        yaxis: [
          {
            title: {
              text: 'Risk Level'
            }
          },
          {
            opposite: true,
            title: {
              text: 'Pollen Count'
            }
          }
        ],
        colors: ['#1976D2', '#4CAF50']
      }
    }
  }
}
</script>