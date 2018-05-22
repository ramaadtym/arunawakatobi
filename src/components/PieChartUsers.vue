<template>
  <canvas class="pie-chart-users"></canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'pie-chart-users',
  props: {
    label: {
      type: String,
      default: 'Jumlah User'
    },
    users: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.updateChart()
  },
  updated () {
    this.updateChart()
  },
  computed: {
    chartLabels () {
      return this.users.map(user => user.label)
    },
    chartColors () {
      const defaultColors = [
        '#3F51B5',
        '#FF9800',
        '#00C853',
        '#673AB7',
        '#F44336',
        '#2196F3',
        '#FF5722'
      ]

      return this.users.map((user, i) => user.color || defaultColors[i])
    },
    chartData () {
      return this.users.map(user => user.count)
    }
  },
  methods: {
    updateChart () {
      var config = {
        type: 'pie',
        data: {
          datasets: [{
            data: this.chartData,
            backgroundColor: this.chartColors,
            label: this.label
          }],
          labels: this.chartLabels
        },
        options: {
          responsive: true
        }
      }

      this.chart = new Chart(this.$el.getContext('2d'), config)
    }
  }
}
</script>
