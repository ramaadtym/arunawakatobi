<template>
  <vx-container title="Dashboard" dateComponent>
    <div class="container-fluid ks-rows-section">
      <div class="row">
        <div class="col-md-3 col-6">
          <info-box-count
            icon="la la-th-list"
            :count-properties="summaryTotalNelayan" />
        </div>
        <div class="col-md-3 col-6">
          <info-box-count
            icon="la la-th-list"
            :count-properties="summaryTotalUPI" />
        </div>
        <div class="col-md-3 col-6">
          <info-box-count
            icon="la la-th-list"
            :count-properties="summaryTotalTPI" />
        </div>
        <div class="col-md-3 col-6">
          <info-box-count
            icon="la la-th-list"
            :count-properties="summaryTotalBudidaya" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 mb-3">
          <CardChartProduksi/>
        </div>
        <div class="col-lg-6">
          <vx-card class="table-dashboard">
            <h5 slot="header" class="my-0">
              SUMMARY
            </h5>
            <div v-if="summaryUsers" style="padding: 30px ">
              <PieChartUsers :users="summaryUsers"/>
            </div>
          </vx-card>
        </div>
        <div class="col-lg-12">
          <vx-card class="mt-3">
            <div slot="header" class="row w-100 justify-content-between">
              <div class="col-lg-6">
                <h5 class="my-0" style="line-height: 38px">Peta Persebaran ({{ value === '' ? 'lembaga' : value }})</h5>
              </div>
              <div class="col-lg-3">
                <el-select class="float-right" v-model="value" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <!-- vue google maps -->
            <!--map lembaga-->
            <div v-if="value === 'lembaga' || value === ''">
              <gmap-map
                :center="center"
                :zoom="zoom"
                :draggable="false"
                :map-type-id="mapType"
                class="map-panel"
                style="width: 100%; height: 400px; border: 1px solid #c4cbe1"
              >
                <gmap-cluster :grid-size="gridSize" v-if="clustering">
                  <gmap-marker
                    v-for="(m,i) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="false"
                    :icon="m.icon"
                    @click="center=m.position"
                    @mousedown="toogleInfoWindow(m,i)">
                  </gmap-marker>
                  <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" :content="infoContent" @closeclick="infoWinOpen=false"></gmap-info-window>
                </gmap-cluster>
              </gmap-map>
            </div>
            <!--map pengguna-->
            <div v-if="value === 'pengguna'">
              <gmap-map
                :center="center"
                :zoom="zoom"
                :draggable="false"
                :map-type-id="mapType"
                class="map-panel"
                style="width: 100%; height: 400px; border: 1px solid #c4cbe1"
              >
                <gmap-cluster :grid-size="gridSize" v-if="clustering">
                  <gmap-marker
                    v-for="(m,i) in userMarkers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="false"
                    :icon="m.icon"
                    @click="center=m.position"
                    @mousedown="toogleInfoUserWindow(m,i)">
                  </gmap-marker>
                  <gmap-info-window :options="infoUserOptions" :position="infoWindowUserPos" :opened="infoWinUserOpen" :content="infoUserContent" @closeclick="infoWinUserOpen=false"></gmap-info-window>
                </gmap-cluster>
              </gmap-map>
            </div>
            <!--map produksi-->
            <div v-if="value === 'produksi'">
              <gmap-map
                :center="center"
                :zoom="zoom"
                :draggable="false"
                :map-type-id="mapType"
                class="map-panel"
                style="width: 100%; height: 400px; border: 1px solid #c4cbe1"
              >
                <gmap-cluster :grid-size="gridSize" v-if="clustering">
                  <gmap-marker
                    v-for="(m,i) in productionMarkers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="false"
                    :icon="m.icon"
                    @click="center=m.position"
                    @mousedown="toogleInfoProductionWindow(m,i)">
                  </gmap-marker>
                  <gmap-info-window :options="infoProdOptions" :position="infoWindowProdPos" :opened="infoWinProdOpen" :content="infoProdContent" @closeclick="infoWinProdOpen=false"></gmap-info-window>
                </gmap-cluster>
              </gmap-map>
            </div>

            <div v-if="value === 'analisis-produksi'">
              <MapPersebaranProduksi ref="mapPersebaranProduksi"/>
            </div>
          </vx-card>
        </div>
      </div>
    </div>
  </vx-container>
</template>
<script>
  import InfoBoxCount from '../components/InfoBoxCount'
  import TableOverview from '../components/TableOverview'
  import CardChartProduksi from '../components/CardChartProduksi'
  import PieChartUsers from '../components/PieChartUsers'
  import MapPersebaranProduksi from '../components/MapPersebaranProduksi'
  import EntityService from '../vuxs/services/entity'
  import summaryService from '../vuxs/services/summary'
  import reportService from '../vuxs/services/report'
  import session from '../services/session'

  export default {
    components: {
      MapPersebaranProduksi,
      CardChartProduksi,
      InfoBoxCount,
      TableOverview,
      PieChartUsers
    },
    data () {
      return {
        summaryNelayan: null,
        summaryUPI: null,
        summaryTPI: null,
        summaryBudidaya: null,
        summaryUsers: null,
        entities: [],
        users: [],
        productions: [],
        chart: [],
        userFishlog: [],
        center: {
          lat: -2.4893,
          lng: 120.9213
        },
        mapBounds: {},
        clustering: true,
        zoom: 5,
        gridSize: 50,
        mapType: 'roadmap',
        markers: [],
        userMarkers: [],
        productionMarkers: [],
        infoContent: '',
        infoWindowPos: {lat: 0, lng: 0},
        infoWinOpen: false,
        currentMidx: null,
        infoOptions: {pixelOffset: {width: 0, height: -35}},
        infoUserContent: '',
        infoWindowUserPos: {lat: 0, lng: 0},
        infoWinUserOpen: false,
        currentUserMidx: null,
        infoUserOptions: {pixelOffset: {width: 0, height: -35}},
        infoProdContent: '',
        infoWindowProdPos: {lat: 0, lng: 0},
        infoWinProdOpen: false,
        currentProdMidx: null,
        infoProdOptions: {pixelOffset: {width: 0, height: -35}},
        titleHead: 'Dashboard',
        search: '',
        options: [
          {
            value: 'analisis-produksi',
            label: 'Analisis Produksi'
          }
        ],
        value: 'analisis-produksi'
      }
    },
    head: {
      // To use "this" in the component, it is necessary to return the object through a function
      title: function () {
        return {
          inner: this.titleHead
        }
      }
    },
    filters: {
      // filter function for count, calculate the length of the value
      count (value) {
        return value.length
      }
    },
    methods: {
      reloadData () {
        var me = session.me()
        if (me.user_group_id === '65536') {
          EntityService.getEntity().then(res => {
            this.entities = res.data
          })
        }

        summaryService.getCountNelayan().then(res => {
          this.summaryNelayan = res
        })

        summaryService.getCountUPI().then(res => {
          this.summaryUPI = res
        })

        summaryService.getCountTPI().then(res => {
          this.summaryTPI = res
        })

        summaryService.getCountBudidaya().then(res => {
          this.summaryBudidaya = res
        })

        reportService.getActiveFishermanType().then(payload => {
          this.summaryUsers = (payload.data || []).map(d => {
            return {
              label: d.production.production_type || 'unknown',
              count: d.total_fisherman
            }
          })
        })
      },

      addMarker: function addMarker () {
        this.lastId++
        this.markers.push({
          id: this.lastId,
          position: {
            lat: 48.8538302,
            lng: 2.2982161
          },
          infoText: '',
          opacity: 1,
          icon: '/static/img/rsz_pin.png',
          draggable: false,
          enabled: true,
          show: false
        })
        return this.markers[this.markers.length - 1]
      },
      addUserMarker: function addUserMarker () {
        this.lastUserId++
        this.userMarkers.push({
          id: this.lastUserId,
          position: {
            lat: 48.8538302,
            lng: 2.2982161
          },
          infoText: '',
          opacity: 1,
          icon: '/static/img/rsz_pin.png',
          draggable: false,
          enabled: true,
          show: false
        })
        return this.userMarkers[this.userMarkers.length - 1]
      },
      addProductionMarker: function addProductionMarker () {
        this.lastProductionId++
        this.productionMarkers.push({
          id: this.lastProductionId,
          position: {
            lat: 48.8538302,
            lng: 2.2982161
          },
          infoText: '',
          opacity: 1,
          icon: '/static/img/rsz_pin.png',
          draggable: false,
          enabled: true,
          show: false
        })
        return this.productionMarkers[this.productionMarkers.length - 1]
      },
      toogleInfoWindow (marker, idx) {
        // set postiion and content from marker
        this.infoWindowPos = marker.position
        this.infoContent = marker.infoText
        // check if its the same marker that was selected if yes toggle
        if (this.currentMidx === idx) {
          this.infoWinOpen = !this.infoWinOpen
        } else {
          this.infoWinOpen = true
          this.currentMidx = idx
        }
      },
      toogleInfoUserWindow (marker, idx) {
        // set postiion and content from marker
        this.infoWindowUserPos = marker.position
        this.infoUserContent = marker.infoText
        // check if its the same marker that was selected if yes toggle
        if (this.currentUserMidx === idx) {
          this.infoWinUserOpen = !this.infoWinUserOpen
        } else {
          this.infoWinUserOpen = true
          this.currentUserMidx = idx
        }
      },
      toogleInfoProductionWindow (marker, idx) {
        // set postiion and content from marker
        this.infoWindowProdPos = marker.position
        this.infoProdContent = marker.infoText
        // check if its the same marker that was selected if yes toggle
        if (this.currentProdMidx === idx) {
          this.infoWinProdOpen = !this.infoWinProdOpen
        } else {
          this.infoWinProdOpen = true
          this.currentProdMidx = idx
        }
      }
    },
    computed: {
      // check if the user logged in is supperadmin or not
      isSuperAdmin() {
        return session.me().user_group_id === '65536'
      },
      // function for counting the total of production based on the database
      countProduction () {
        let total = 0
        if (this.productions !== null) {
          for (let i = 0; i < this.productions.length; i++) {
            total += parseInt(this.productions[i].quantity)
          }
        } else {
          total = 0
        }
        return total.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      },
      summaryTotalNelayan () {
        return [{
          count: this.summaryNelayan ? `${this.summaryNelayan.active} / ${this.summaryNelayan.total}` : '- / -',
          label: 'Summary Nelayan',
          class: 'text-primary'
        }]
      },
      summaryTotalUPI () {
        return [{
          count: this.summaryUPI ? `${this.summaryUPI.active} / ${this.summaryUPI.total}` : '- / -',
          label: 'Summary UPI',
          class: 'text-primary'
        }]
      },
      summaryTotalTPI () {
        return [{
          count: this.summaryTPI ? `${this.summaryTPI.total}` : '-',
          label: 'Summary TPI',
          class: 'text-primary'
        }]
      },
      summaryTotalBudidaya () {
        return [{
          count: this.summaryBudidaya ? `${this.summaryBudidaya.total}` : '-',
          label: 'Summary Budidaya',
          class: 'text-primary'
        }]
      }
    },
    mounted () {
      // Set entity user if sysadmin get entity
      this.reloadData()
    }
  }
</script>
<style>
  .stat-panel .card:nth-child(1) {
    border-bottom: 6px solid #1ba5e3;
  }

  .stat-panel .card:nth-child(2) {
    border-bottom: 6px solid #127ebf;

  }

  .stat-panel .card:nth-child(3) {
    border-bottom: 6px solid #034f8d

  }

  .stat-panel .card:nth-child(4) {
    border-bottom: 6px solid #0a346e;
  }

  .table-dashboard > .card-block {

    padding: 0px;
  }
</style>
