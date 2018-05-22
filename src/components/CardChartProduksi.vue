<template>
  <vx-card>
    <h5 slot="header" class="my-0">
      Data Produksi
      <!-- Chart Month Filters -->
      <div v-if="chartType == 'month'" class="filter-options">
        <el-select class="select-year"
          v-model="chartOptions.year"
          filterable
          placeholder="Tahun">
          <el-option
            v-for="opt in optionsYear"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value">
          </el-option>
        </el-select>
      </div>
    </h5>

    <div class="chart-wrapper">
      <canvas ref="chartMonth" class="chart chart-month"></canvas>
      <ul class="nav nav-pills text-center">
        <li class="nav-item" v-for="(type, i) in types" :key="i">
          <a class="nav-link" :class="{'active': chartOptions.type === type.value}" href="#" @click="chartOptions.type = type.value">{{ type.label }}</a>
        </li>
      </ul>
    </div>
  </vx-card>
</template>

<script>
import transactionService from '../vuxs/services/transaction'
import Chart from 'chart.js'

export default {
  name: 'card-chart-produksi',
  data () {
    const date = new Date()
    const year = date.getFullYear()

    return {
      types: [
        {value: 'tangkap', label: 'Tangkapan'},
        {value: 'nelayan', label: 'Nelayan'},
        {value: 'upi', label: 'UPI'},
        {value: 'budidaya', label: 'Budidaya'}
      ],
      firstYear: 2015,
      currentYear: year,
      chartType: 'month',
      chartMonth: null,
      chartOptions: {
        year: date.getFullYear(),
        type: ''
      },
      optionsCommodity: [],
      optionsEntity: []
    }
  },
  computed: {
    optionsYear () {
      const options = []
      for (let y = this.firstYear; y <= this.currentYear; y++) {
        options.push({
          label: y, value: y
        })
      }
      return options
    }
  },
  watch: {
    indexOption () {
      this.updateChart()
    },
    chartType (type) {
      this.updateChart()
    },
    chartOptions: {
      deep: true,
      handler () {
        this.updateChart()
      }
    }
  },
  mounted () {
    this.updateChart()
  },
  methods: {
    resetChart () {
      const date = new Date()
      this.chartType = 'month'
      this.chartOptions.year = date.getFullYear()
    },
    updateChart () {
      // Fetch chart data
      switch (this.chartType) {
        case 'month': return this.fetchChartMonth()
        case 'commodity': return this.fetchChartCommodity()
        case 'entity': return this.fetchChartEntity()
      }
    },
    getMonthName (number) {
      return [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Agu',
        'Sep',
        'Okt',
        'Nov',
        'Des'
      ][number - 1]
    },
    fetchChartMonth () {
      // const year = this.chartOptions.year
      // @TODO: change to specific api
      transactionService.getTransactionYearly(this.chartOptions.year, {
        production_type: this.chartOptions.type
      }).then(result => {
        const productions = Array(12).fill(0)
        const items = result.data || []
        items.forEach(item => {
          const monthIndex = parseInt(item.date.timestamp.split('-')[1]) - 1
          productions[monthIndex] = item.total_production
        })

        const data = {
          labels: productions.map((_, i) => this.getMonthName(i + 1)),
          datasets: [{
            label: 'Total',
            xLabel: 'kilogram',
            yLabel: 'kilogram',
            fill: true,
            borderColor: '#284184',
            backgroundColor: '#284184',
            pointBackgroundColor: '#284184',
            data: productions
          }]
        }

        const options = {
          responsive: true,
          maintainAspectRatio: true, // !that.isMobile,
          legend: {
            position: 'bottom',
            display: true
          },
          tooltips: {
            mode: 'label',
            xPadding: 10,
            yPadding: 10,
            bodySpacing: 10
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Kilogram'
              }
            }]
          }
        }

        const ctx = this.$refs.chartMonth
        const config = {
          type: 'bar',
          data: data,
          options: options
        }

        if (!this.chartMonth) {
          this.chartMonth = new Chart(ctx, config)
        } else {
          this.chartMonth.destroy()
          this.chartMonth = new Chart(ctx, config)
        }
      })
    }
  }
}
</script>

<style scoped>

.icon-xl {
  font-size: 124px;
}

.chart-wrapper {
  width: 100%;
  min-height: 300px;
  position: relative;
}

.chart-wrapper .center-message {
  position: absolute;
  width: 100%;
  height: 150px;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: auto;
  text-align: center;
}

.chart {
  width: 100%;
  height: 100%;
}

.filter-options {
  display: inline-block;
  margin-left: 15px;
}
.select-type {
  width: 120px;
}
.select-month {
  width: 160px;
}
.select-year {
  width: 100px;
}
.nav-pills {
  text-align: center !important;
  width: 100%;
  display: inline-block;
  margin-top: 15px;
  margin-bottom: 15px;
}
.nav-pills .nav-item {
  display: inline-block;
  float: none;
}
</style>
