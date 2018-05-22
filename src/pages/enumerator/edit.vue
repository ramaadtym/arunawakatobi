<template>
  <vx-container title="Tambah Enumerator">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">

      <div class="row justify-content-md-center">
        <div class="col-lg-10">
          <vx-card>
            <h5 slot="header" class="my-0">Form Enumerator</h5>
            <div class="ks-items-block">
              <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="2">
                <vx-form-item label="Nama Lembaga" prop="entity" :error="errors.entityid">
                  <select name="entity" v-model="form.data.entity" id="entity" class="form-control white-bg" @change="onChange">
                    <option v-for="entities in checkEntities" :value="entities">{{entities.entity_name}}
                    </option>
                  </select>
                </vx-form-item>
                <vx-form-item label="Tipe Enumerator" prop="user_group" :error="errors.user_group">
                  <select name="user_group" v-model="form.data.user_group" class="form-control white-bg">
                    <option value="131072" v-show="form.data.entity.entity_app === 'sipi' || form.data.entity.entity_app === 'e-tpi' || form.data.entity.entity_app === 'fishlog'">
                      Admin
                    </option>
                    <option value="196608" v-show="form.data.entity.entity_app === 'fishlog'">User</option>
                  </select>
                </vx-form-item>
                <vx-form-item label="Deskripsi" prop="description" :error="errors.description">
                  <vx-input type="textarea" name="description" v-model="form.data.description" id="description"></vx-input>
                </vx-form-item>
                <vx-form-item label="Nama Enumerator" prop="full_name" :error="errors.full_name">
                  <vx-input name="full_name" v-model="form.data.full_name" id="full_name"></vx-input>
                </vx-form-item>
                <vx-form-item label="Kota/Kabupaten" prop="regency" :error="errors.regency">
                  <el-select name="regency" id="regency" v-model="form.data.regency" filterable remote @change="selectRegion(form.data.regency)" class="w-100" placeholder="Please enter a keyword" :remote-method="remoteMethod" :loading="loading">
                    <el-option v-for="item in options4" :key="item.id" :label="item.name" :value="item"></el-option>
                  </el-select>
                </vx-form-item>
                <div class="form-group row">
                  <label for="provinsi" class="col-2 col-form-label">Provinsi</label>
                  <div class="col-10" v-if="form.data.regency === ''">
                    <span class="form-control" id="provinsi"></span>
                  </div>
                  <div class="col-10" v-else v-for="m in markers">
                    <span class="form-control" id="profinsi">{{m.address_components[1].long_name}} {{m.address_components[2].long_name}}</span>
                  </div>
                </div>
                <vx-form-item label="&nbsp;">
                  <gmap-map id="gmap" :center="center" :zoom="zoom" :map-type-id="mapType" class="map-panel" @zoom_changed="update('zoom', $event)" @center_changed="update('reportedCenter', $event)" @bounds_changed="update('bounds', $event)" style="width: 100%; height: 400px; border: 1px solid #c4cbe1">
                    <gmap-cluster :grid-size="gridSize" v-if="clustering">
                      <gmap-marker v-if="m.enabled" :icon="m.icon" :position="m.position" :opacity="m.opacity" :draggable="m.draggable" @dragend="" @position_changed="updateChild(m, 'position', $event)" v-for="m in activeMarkers" :key="m.id">
                        <gmap-info-window :opened="m.ifw" :content="m.ifw2text" :closeclick="false"></gmap-info-window>
                      </gmap-marker>
                    </gmap-cluster>
                    <div v-if="!clustering">
                      <gmap-marker v-if="m.enabled" :icon="m.icon" :position="m.position" :opacity="m.opacity" :draggable="m.draggable" @dragend="m.dragended++" @position_changed="updateChild(m, 'position', $event)" v-for="m in activeMarkers"
                                   :key="m.id">
                        <gmap-info-window :opened="m.ifw" :content="m.ifw2text"></gmap-info-window>
                      </gmap-marker>
                    </div>
                  </gmap-map>
                </vx-form-item>
                <vx-form-item label="Alamat" prop="address" :error="errors.address">
                  <vx-input type="textarea" name="address" v-model="form.data.address" id="address"></vx-input>
                </vx-form-item>
                <vx-form-item label="Email" prop="email" :error="errors.email">
                  <vx-input name="email" v-model="form.data.email" id="email"></vx-input>
                </vx-form-item>
                <vx-form-item label="Nomor Handphone" prop="phone" :error="errors.phone">
                  <vx-input type="number" name="phone" v-model="form.data.phone" id="phone"></vx-input>
                </vx-form-item>
                <vx-form-item label="Username" prop="username" :error="errors.username">
                  <vx-input name="username" v-model="form.data.username" id="username"></vx-input>
                </vx-form-item>
                <vx-form-item label="Password" prop="password" :error="errors.password">
                  <vx-input type="password" name="password" v-model="form.data.password" id="password"></vx-input>
                </vx-form-item>
                <template slot="action">
                  <vx-button variant="primary" outline light class="mr-2" to="/enumerator">Batal</vx-button>
                  <vx-button type="submit" variant="primary" @click="onSubmit">Simpan</vx-button>
                </template>
              </vx-form>
            </div>
          </vx-card>
        </div>
      </div>
    </div>
  </vx-container>
</template>
<script>
  const _ = require('lodash')
  import {mapState} from 'vuex'
  import EntityService from '../../vuxs/services/entity'
  import RegencyService from '../../vuxs/services/regency'
  import GeoLocation from '../../services/geocoder'
  export default {
    data () {
      return {
        place: '',
        latLng: {},
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Daftar Enumerator',
          link: '/enumerator'
        }, {
          text: 'Tambah Enumerator',
          link: ''
        }],
        lastId: 1,
        center: {
          lat: -1,
          lng: 118.9213
        },
        mapBounds: {},
        clustering: true,
        zoom: 5,
        gridSize: 50,
        mapType: 'roadmap',
        markers: [],
        markersEven: false,
        drag: 0,
        mapClickedCount: 0,
        ifw: true,
        ifw2: false,
        ifw2text: 'You can also use the content prop to set your modal',
        titleHead: 'Tambah Enumerator',
        options4: [],
        list: [],
        loading: false,
        states: [],
        entities: [],
        formatted_address: '',
        form: {
          submitted: false,
          rules: {
            entity: [
              {type: 'object', required: true, message: 'Harap pilih Lembaga terlebih dahulu', trigger: 'blur'}
            ],
            user_group: [
              {required: true, message: 'Harap pilih status pengguna terlebih dahulu', trigger: 'blur'}
            ],
            full_name: [
              {required: true, message: 'Masukkan nama pengguna', trigger: 'blur'}
            ],
            regency: [
              {type: 'object', required: true, message: 'Harap pilih provinsi terlebih dahulu', trigger: 'blur'}
            ],
            email: [
              {type: 'email', message: 'masukkan format email yang benar', trigger: 'blur, change'}
            ],
            address: [
              {required: true, message: 'Masukkan alamat pengguna', trigger: 'blur'}
            ],
            phone: [
              {required: true, message: 'Harap masukkan nomor telepon anda telebih dahulu', trigger: 'blur'},
              {min: 11, max: 14, message: 'Panjang harus 11 sampai 14 huruf', trigger: 'blur'}
            ],
            username: [
              {required: true, message: 'Harap masukkan username terlebih dahulu', trigger: 'blur'}
            ],
            password: [
              {required: true, message: 'Harap mengisi password Anda terlebih dahulu', trigger: 'blur'}
            ]
          },
          data: {
            avatar: '',
            is_active: 1,
            address: '',
            entity: {},
            regency: []
          },
          input: {}
        }
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
    methods: {
      onSubmit () {
        // get input data from form.input
        this.form.input.entity = this.form.data.entity.id
        this.form.input.user_group = this.form.data.user_group
        this.form.input.full_name = this.form.data.full_name
        this.form.input.address = this.form.data.address
        this.form.input.regency_id = this.form.data.regency.id
        this.form.input.latlng = this.markers[0].position.lat + ',' + this.markers[0].position.lng
        this.form.input.avatar = this.form.data.avatar
        this.form.input.description = this.form.data.description
        this.form.input.email = this.form.data.email
        this.form.input.is_active = this.form.data.is_active
        this.form.input.password = this.form.data.password
        this.form.input.username = this.form.data.username
        this.form.input.phone = this.form.data.phone
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('user/create', this.form.input)
          }
        })
      },
      onChange (event) {
        this.form.data.user_group = (event.srcElement.value)
      },
      updateMapCenter(which, value) { // eslint-disable-line no-unused-vars
        this.center = _.clone(this.reportedCenter)
      },
      addMarker: function addMarker () {
        this.lastId++
        if (this.lastId === 3) {
          this.markers.splice(this.markers.indexOf(2), 1)
          this.lastId = 2
          this.markers.push({
            id: this.lastId,
            position: {},
            opacity: 1,
            draggable: true,
            icon: '/static/img/rsz_pin.png',
            enabled: true,
            ifw: true,
            dragended: 0,
            address_components: {},
            ifw2text: 'Pilih Pinpoin Alamat'
          })
          return this.markers[this.markers.length - 1]
        } else {
          this.markers.push({
            id: this.lastId,
            position: {},
            opacity: 1,
            draggable: true,
            icon: '/static/img/rsz_pin.png',
            enabled: true,
            ifw: true,
            dragended: 0,
            address_components: {},
            ifw2text: 'Pilih Pinpoin Alamat'
          })
          return this.markers[this.markers.length - 1]
        }
      },
      selectRegion(region) {
        if (typeof region.name !== 'undefined') {
          var locator = GeoLocation.getLangLat(region.name)
          if (locator) {
            let that = this
            locator.then(function (data) {
              var marker = that.addMarker()
              marker.position.lat = data.geometry.location.lat
              marker.position.lng = data.geometry.location.lng
              marker.address_components = data.address_components
              that.center = marker.position
              that.zoom = 15
            })
          }
        }
      },
      update(field, event) {
        if (field === 'reportedCenter') {
          // N.B. It is dangerous to update this.center
          // Because the center reported by Google Maps is not exactly
          // the same as the center you pass it.
          // Instead we update this.center only when the input field is changed.

          this.reportedCenter = {
            lat: event.lat(),
            lng: event.lng()
          }

          // If you wish to test the problem out for yourself, uncomment the following
          // and see how your browser begins to hang:
//          this.center = _.clone(this.reportedCenter)
        } else if (field === 'bounds') {
          this.mapBounds = event
        } else {
          this.$set(this, field, event)
        }
      },
      updateChild(object, field, event) {
        // ini ditrigger saat marker moved
        if (field === 'position') {
          object.position = {
            lat: event.lat(),
            lng: event.lng()
          }
          // get address formated from lang lat, don't delete in case we need this function
          // used reverse geocoder method by google maps
//          var address = GeoLocation.getAddress(object.position.lng, object.position.lat)
//          let that = this
//          if (address) {
//            address.then(function (data) {
//              that.formatted_address = data.formatted_address
//            })
//          }
        }
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.options4 = this.list.filter(item => {
              return item.name.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1
            })
          }, 200)
        } else {
          this.options4 = []
        }
      },
      sync() {
        var n1 = this.formatted_address
        console.log(n1)
        this.form.data.address = n1
      }
    },
    mounted () {
      let that = this
      EntityService.getEntity().then(res => {
        that.entities = res.data
      })
      RegencyService.getRegency().then(res => {
        that.states = res.data
        this.list = that.states.map(item => {
          return item
        })
      })
    },
    computed: mapState({
      errors: state => state.Form.errors,
      submitted: state => state.Form.submitted,
      checkEntities () {
        return this.entities.filter(entitas => {
          if (entitas.is_active === 1) {
            return entitas
          }
        })
      },
      activeMarkers() {
        return this.markers
      }
    })
  }
</script>
<style>

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
</style>
