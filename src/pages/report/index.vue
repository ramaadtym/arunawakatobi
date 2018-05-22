<template>
  <vx-container title="Laporan">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">
      <div class="table-page">
        <div class="ks-tables">
          <div class="row">
            <div class="col-md-3 col-12">
              <div class="form-group">
                <div class="ks-search input-icon icon-right icon icon-lg">
                  <input id="input-group-icon-text" v-model="table.query" type="text" class="form-control" placeholder="Cari">
                  <span class="icon-addon"><span class="la la-search"></span></span>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-12">
              <div class="form-group">
                <div class="ks-search input-icon icon-right icon icon-lg">
                  <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    range-separator=" to "
                    start-placeholder="Start date"
                    end-placeholder="End date">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="col-md-3">
            </div>
            <div class="col-md-3 text-right">
              <div class="ks-filters">
                <div class="btn-group">
                  <button class="btn btn-primary" @click="downloadExcel" block>
                    <i class="icon la la-download"></i>
                    &nbsp;
                    Export to Excel
                  </button>
                </div>
                <div class="btn-group">
                  <vx-table-columns :columns="table.fields"></vx-table-columns>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <div class="ks-content ks-compact">
            <vx-table ref="table" class="table ks-text-light ks-table-header" :items-provider="renderData" :config="table">
              <template slot="date" scope="item">
                <span v-if="item.item.production_date">{{ $moment(item.item.production_date).format('DD/MM/YYYY') }}</span>
              </template>
              <template slot="member_name" scope="item">
                <span v-if="item.item.fisher_member_data">{{ item.item.fisher_member_data.full_name }}</span>
              </template>
              <template slot="uptd_name" scope="item">
                <span v-if="item.item.entity">{{ item.item.entity }}</span>
              </template>
              <template slot="production_type" scope="item">
                <span v-if="item.item.production_type">{{ item.item.production_type }}</span>
              </template>
              <template slot="count_production" scope="item">
                <span v-if="item.item.quantity" class="pull-right">{{ item.item.quantity }}</span>
              </template>
            </vx-table>
            <div style="padding: 20px 20px;">
              <vx-pagination :config="table" v-model="table.currentPage" extended></vx-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vx-container>
</template>
<script>
  import vAvatar from 'vue-avatar/src/Avatar.vue'
  import table from 'vx/src/mixins/table'
  import spreadsheet from '../../utils/spreadsheet'
  import reportService from '../../vuxs/services/report'
  import FileSaver from 'file-saver'
  import moment from 'moment'

  export default {
    mixins: [table],
    data () {
      return {
        dateRange: [],
        table: {
          fields: {
            date: {
              label: 'Tanggal',
              alias: 'production.date',
              width: 60,
              sortable: true,
              visible: true
            },
            member_name: {
              label: 'Nama Anggota',
              alias: 'user.full_name',
              sortable: false,
              visible: true
            },
            uptd_name: {
              label: 'Nama UPTD',
              alias: 'uptd.name',
              sortable: true,
              visible: true
            },
            production_type: {
              label: 'Jenis Produksi',
              alias: 'production.type',
              sortable: true,
              width: 200,
              visible: true
            },
            count_production: {
              label: 'Jumlah Produksi (kg)',
              alias: 'production.count',
              sortable: true,
              width: 200,
              visible: true
            }
          },
          searchKey: ['comodity_name.icontains']
        },
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Laporan',
          link: ''
        }],
        titleHead: 'Laporan'
      }
    },
    components: {
      vAvatar
    },
    head: {
      // To use "this" in the component, it is necessary to return the object through a function
      title: function () {
        return {
          inner: this.titleHead
        }
      }
    },
    watch: {
      dateRange () {
        this.renderData(this.$refs.table)
      }
    },
    computed: {
      params () {
        if (!this.dateRange[0] || !this.dateRange[1]) {
          return this.apiParam
        }

        const date = (d) => moment(d).format('YYYY-MM-DD')
        const dateRange = date(this.dateRange[0]) + ',' + date(this.dateRange[1])

        const conditions = this.apiParam.conditions ? [this.apiParam.conditions, 'Or.gte.production_date:' + dateRange] : 'gte.production_date:' + dateRange

        return {...this.apiParam, conditions}
      }
    },
    methods: {
      details (item) {
        alert(JSON.stringify(item))
      },
      renderData (tbl) {
        let that = this
        reportService.getReportTransaction(this.params).then(payload => {
          that.table.total = (payload.data) ? payload.total : 0
          tbl.items = (payload.data.transaction_data) ? payload.data.transaction_data : []
        })
      },
      downloadExcel () {
        const excel = spreadsheet.generateFromItems([
          {
            label: 'Tanggal',
            resolve: (val, item) => moment(item.production_date).format('DD/MM/YYYY')
          },
          {
            label: 'Nama Anggota',
            resolve: (val, item) => item.fisher_member_data.full_name
          },
          {
            label: 'Nama UPTD',
            resolve: (val, item) => item.entity
          },
          {
            label: 'Jenis Produksi',
            resolve: (val, item) => item.production_type
          },
          {
            label: 'Jumlah Produksi',
            alias: 'production.count',
            resolve: (val, item) => item.quantity
          }
        ], this.$refs.table.items)

        FileSaver.saveAs(excel, 'report.xlsx')
      }
    }
  }
</script>

