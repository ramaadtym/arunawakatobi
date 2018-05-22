<template>
  <div class="map map-persebaran-produksi">
    <gmap-map
      :center="center"
      :zoom="zoom"
      :draggable="false"
      :map-type-id="mapType"
      class="map-panel"
      style="width: 100%; height: 600px; border: 1px solid #c4cbe1"
    >
      <gmap-cluster :grid-size="gridSize" v-if="clustering">
        <gmap-marker
          v-for="(m,i) in productionMarkers"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          :icon="m.icon"
          @click="center=m.position"
          @mousedown="toogleInfoProductionWindow(m,i)"/>
        <gmap-info-window
          :options="infoProdOptions"
          :position="infoWindowProdPos"
          :opened="infoWinProdOpen"
          :content="infoProdContent"
          @closeclick="infoWinProdOpen=false"/>
      </gmap-cluster>
    </gmap-map>
    <div class="filters">
      <el-select
        v-model="filter.komoditas"
        filterable
        remote
        placeholder="Komoditas"
        :remote-method="fetchOptionsKomoditas"
        :fetchingOptionsKomoditas="fetchingOptionsKomoditas">
        <el-option
          v-for="item in optionsKomoditas"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="filter.bulan" placeholder="Bulan">
        <el-option
          v-for="item in optionsBulan"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select
        v-model="filter.lembaga"
        filterable
        remote
        placeholder="Lembaga"
        :allow-create="true"
        :remote-method="fetchOptionsLembaga"
        :fetchingOptionsLembaga="fetchingOptionsLembaga">
        <el-option
          v-for="item in optionsLembaga"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import summaryService from '../vuxs/services/summary_commodity'
import GeoLocation from '../services/geocoder'
import comodityService from '../vuxs/services/comodity'
import entityService from '../vuxs/services/entity'

export default {
  name: 'map-persebaran-produksi',
  data () {
    return {
      lastProductionId: 0,
      fetchingOptionsKomoditas: false,
      fetchingOptionsLembaga: false,
      optionsKomoditas: [],
      optionsLembaga: [],
      optionsBulan: [
        { value: 1, label: 'Januari' },
        { value: 2, label: 'Februari' },
        { value: 3, label: 'Maret' },
        { value: 4, label: 'April' },
        { value: 5, label: 'Mei' },
        { value: 6, label: 'Juni' },
        { value: 7, label: 'Juli' },
        { value: 8, label: 'Agustus' },
        { value: 9, label: 'September' },
        { value: 10, label: 'Oktober' },
        { value: 11, label: 'November' },
        { value: 12, label: 'Desember' }
      ],
      filter: {
        komoditas: '',
        lembaga: '',
        bulan: ''
      },
      zoom: 5,
      draggable: false,
      mapType: 'roadmap',
      gridSize: 50,
      clustering: true,
      center: {
        lat: -2.4893,
        lng: 120.9213
      },
      productionMarkers: [],
      // info window
      infoProdContent: '',
      infoWindowProdPos: {lat: 0, lng: 0},
      infoWinProdOpen: false,
      infoProdOptions: {pixelOffset: {width: 0, height: -35}},
      currentProdMidx: null
    }
  },
  watch: {
    filter: {
      deep: true,
      handler () {
        this.fetchAndUpdateMarkers()
      }
    }
  },
  methods: {
    addProductionMarker () {
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
    toogleInfoProductionWindow (marker, idx) {
      // set postiion and content from marker
      this.infoWindowProdPos = marker.position
      this.infoProdContent = marker.infoText
      // check if its the same marker this was selected if yes toggle
      if (this.currentProdMidx === idx) {
        this.infoWinProdOpen = !this.infoWinProdOpen
      } else {
        this.infoWinProdOpen = true
        this.currentProdMidx = idx
      }
    },
    fetchOptionsKomoditas (query) {
      if (query !== '') {
        this.fetchingOptionsKomoditas = true
        comodityService.getComodity({conditions: `Or.commodity_name.icontains:${query}`}).then(payload => {
          this.fetchingOptionsKomoditas = true
          this.optionsKomoditas = (payload.data || []).map(comodity => {
            return {
              value: comodity.commodity_name,
              label: comodity.commodity_name
            }
          })
        })
      } else {
        this.optionsKomoditas = []
      }
    },
    fetchOptionsLembaga (query) {
      if (query !== '') {
        this.fetchingOptionsLembaga = true
        entityService.getEntity({
          conditions: `Or.entity_name.icontains:${query}`
        }).then(payload => {
          this.fetchingOptionsLembaga = false
          this.optionsLembaga = (payload.data || []).map(entity => {
            return {
              value: entity.id,
              label: entity.entity_name
            }
          })
        })
      } else {
        this.optionsLembaga = []
      }
    },
    fetchAndUpdateMarkers () {
      var params = {}
      if (this.filter.komoditas !== '') {
        params['commodity'] = this.filter.komoditas
      }
      console.log('fetchAndUpdateMarkers', params)
      summaryService.getAll(params).then((summary) => {
        this.productionMarkers = []

        if (!summary.data) {
          return
        } else if (summary.data instanceof Array === false) {
          console.warn('Summary data is not array. This might be problem on backend.')
        }

        for (var i = 0; i < summary.data.length; i++) {
          if (summary.data[i].fish_data.district !== '' && summary.data[i].fish_data.regency !== '') {
            var locator = GeoLocation.getLangLat(summary.data[i].fish_data.district + ' ' + summary.data[i].fish_data.regency)
            if (locator) {
              let productionMarker = this.addProductionMarker()
              locator.then(function (data) {
                productionMarker.position.lat = data.geometry.location.lat
                productionMarker.position.lng = data.geometry.location.lng
              })
              productionMarker.infoText = summary.data[i].fish_data.commodity_name + `<br />` + summary.data[i].fish_data.district + `<br />` + summary.data[i].fish_data.regency + `<br />` + summary.data[i].total_quantity
            }
          }
        }
      })
    }
  }
}
</script>

<style>
.map-persebaran-produksi {
  position: relative;
}

.map-persebaran-produksi .filters {
  position: absolute;
  bottom: 30px;
  width: 100%;
  text-align: center;
  color: red !important;
}
</style>
