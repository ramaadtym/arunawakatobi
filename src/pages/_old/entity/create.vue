<template>
  <vx-container title="Tambah Lembaga">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">
      <div class="row justify-content-md-center">
        <div class="col-lg-10">
          <vx-card>
            <h5 slot="header" class="my-0">
              Form
            </h5>
            <div class="ks-items-block">
              <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="2">
                <vx-form-item label="Pilih Aplikasi" prop="entity_app">
                  <select name="application" v-model="form.data.entity_app" id="entity_app" class="form-control white-bg">
                    <option value="e-tpi">e-tpi</option>
                    <option value="sipi">sipi</option>
                    <option value="fishlog">fishlog</option>
                  </select>
                </vx-form-item>
                <vx-form-item label="Tipe Lembaga" prop="entity_type" :error="errors.entitytype">
                  <select name="type" v-model="form.data.entity_type" id="entity_type" class="form-control white-bg">
                    <option value="koperasi">Koperasi</option>
                    <option value="perusahaan">Perusahaan</option>
                    <option value="pemilik_kapal">Pemilik Kapal</option>
                    <option value="organisasi">Organisasi</option>
                  </select>
                </vx-form-item>
                <vx-form-item label="Nama Lembaga" prop="entity_name" :error="errors.entity_name">
                  <vx-input name="name" v-model="form.data.entity_name" id="entity_name"></vx-input>
                </vx-form-item>
                <vx-form-item label="Kota/Kabupaten" prop="regency" :error="errors.regency">
                  <el-select name="regency" id="regency" v-model="form.data.regency" filterable remote @change="updatePlace(form.data.regency)" class="w-100" placeholder="Please enter a keyword" :remote-method="remoteMethod" :loading="loading">
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

                  <gmap-map :center="center" :zoom="zoom" :map-type-id="mapType" class="map-panel" @zoom_changed="update('zoom', $event)" @center_changed="update('reportedCenter', $event)"
                            @bounds_changed="update('bounds', $event)" style="width: 100%; height: 400px; border: 1px solid #c4cbe1">
                    <gmap-cluster :grid-size="gridSize" v-if="clustering">
                      <gmap-marker v-if="m.enabled" :icon="m.icon" :position="m.position" :opacity="m.opacity" :draggable="m.draggable" @position_changed="updateChild(m, 'position', $event)" v-for="m in activeMarkers"
                                   :key="m.id">
                        <gmap-info-window :opened="m.ifw" :content="m.ifw2text"></gmap-info-window>
                      </gmap-marker>
                    </gmap-cluster>
                    <div v-if="!clustering">
                      <gmap-marker v-if="m.enabled" :icon="m.icon" :position="m.position" :opacity="m.opacity" :draggable="m.draggable" @position_changed="updateChild(m, 'position', $event)" v-for="m in activeMarkers"
                                   :key="m.id">
                        <gmap-info-window :opened="m.ifw" :content="m.ifw2text"></gmap-info-window>
                      </gmap-marker>
                    </div>
                  </gmap-map>

                </vx-form-item>
                <vx-form-item label="Alamat" prop="address" :error="errors.address">
                  <vx-input type="textarea" name="address" v-model="form.data.address" id="address"></vx-input>
                </vx-form-item>
                <vx-form-item label="Deskripsi" prop="description" :error="errors.description">
                  <vx-input type="textarea" name="description" v-model="form.data.description" id="description"></vx-input>
                </vx-form-item>
                <vx-form-item label="Handphone" prop="mobile" :error="errors.mobile">
                  <vx-input type="number" name="mobile" v-model="form.data.mobile" id="mobile"></vx-input>
                </vx-form-item>
                <vx-form-item label="Nomor Telepon" prop="phone" :error="errors.phone">
                  <vx-input type="number" name="phone" v-model="form.data.phone" id="phone"></vx-input>
                </vx-form-item>
                <vx-form-item label="email" prop="email" :error="errors.email">
                  <vx-input name="email" v-model="form.data.email" id="email"></vx-input>
                </vx-form-item>
                <vx-form-item label="Website" prop="website" :error="errors.website">
                  <vx-input name="website" v-model="form.data.website" id="website"></vx-input>
                </vx-form-item>
                <vx-form-item label="Instagram" prop="instagram" :error="errors.instagram">
                  <vx-input name="instagram" v-model="form.data.instagram" id="instagram"></vx-input>
                </vx-form-item>
                <vx-form-item label="Twitter" prop="twitter" :error="errors.twitter">
                  <vx-input name="twitter" v-model="form.data.twitter" id="twitter"></vx-input>
                </vx-form-item>
                <vx-form-item label="Facebook" prop="facebook" :error="errors.facebook">
                  <vx-input name="facebook" v-model="form.data.facebook" id="facebook"></vx-input>
                </vx-form-item>
                <template slot="action">
                  <vx-button variant="primary" light solid outline to="/entity">Batal</vx-button>
                  <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted" @click="onSubmit">Simpan</button>
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
  import vAvatar from 'vue-avatar/src/Avatar.vue'
  import RegencyService from '../../vuxs/services/regency'
  import GeoLocation from '../../services/geocoder'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
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
        options4: [],
        value9: [],
        list: [],
        loading: false,
        states: [],
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Daftar Lembaga',
          link: '/entity'
        }, {
          text: 'Tambah Lembaga',
          link: ''
        }],
        titleHead: 'Tambah Lembaga',
        form: {
          rules: {
            entity_app: [
              {required: true, message: 'Pilih terlebih dahulu aplikasi yang ingin Anda gunakan', trigger: 'blur'}
            ],
            entity_type: [
              {required: true, message: 'Harap pilih tipe Lembaga terlebih dahulu', trigger: 'blur'}
            ],
            entity_name: [
              {required: true, message: 'Harap masukkan nama Lembaga terlebih dahulu', trigger: 'blur'}
            ],
            regency: [
              {type: 'object', required: true, message: 'Harap pilih provinsi terlebih dahulu', trigger: 'blur'}
            ],
            address: [
              {required: true, message: 'Harap Masukkan Alamat Anda', trigger: 'blur'}
            ],
            mobile: [
              {required: true, message: 'Harap masukkan nomor telepon anda telebih dahulu', trigger: 'blur'},
              {min: 11, max: 14, message: 'Panjang harus 11 sampai 14 huruf', trigger: 'blur'}
            ],
            phone: [
              {min: 9, max: 14, message: 'Panjang harus 11 sampai 14 huruf', trigger: 'blur'}
            ],
            email: [
              {type: 'email', message: 'Harap masukkan alamat email yang valid'}
            ]
          },
          data: {
            email: '',
            phone: null,
            entity_logo: '',
            is_active: 1,
            regency: []
          },
          input: {}
        }
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
    methods: {
      onSubmit () {
        this.form.input.entity_name = this.form.data.entity_name
        this.form.input.entity_type = this.form.data.entity_type
        this.form.input.entity_app = this.form.data.entity_app
        this.form.input.entity_logo = this.form.data.entity_logo
        this.form.input.address = this.form.data.address
        this.form.input.phone = this.form.data.phone
        this.form.input.mobile = this.form.data.mobile
        this.form.input.email = this.form.data.email
        this.form.input.website = this.form.data.website
        this.form.input.facebook = this.form.data.facebook
        this.form.input.twitter = this.form.data.twitter
        this.form.input.instagram = this.form.data.instagram
        this.form.input.description = this.form.data.description
        this.form.input.regency_id = this.form.data.regency.id
        this.form.input.is_active = this.form.data.is_active
        this.form.input.latlng = this.markers[0].position.lat + ',' + this.markers[0].position.lng
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('entity/create', this.form.input)
          }
        })
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

      updateMapCenter(which, value) { // eslint-disable-line no-unused-vars
        this.center = _.clone(this.reportedCenter)
      },
      addMarker: function addMarker () {
        this.lastId++
        if (this.lastId === 3) {
          this.markers.splice(this.markers.indexOf(1), 1)
          this.lastId = 2
          this.markers.push({
            id: this.lastId,
            position: {},
            opacity: 1,
            draggable: true,
            enabled: true,
            ifw: true,
            icon: '/static/img/rsz_pin.png',
            dragended: 0,
            address_components: {},
            ifw2text: 'Pilih Pinpoin Alamat'
          })
        } else {
          this.markers.push({
            id: this.lastId,
            position: {},
            opacity: 1,
            draggable: true,
            enabled: true,
            ifw: true,
            icon: '/static/img/rsz_pin.png',
            dragended: 0,
            address_components: {},
            ifw2text: 'Pilih Pinpoin Alamat'
          })
        }
        return this.markers[0]
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
          // this.center = _.clone(this.reportedCenter)
        } else if (field === 'bounds') {
          this.mapBounds = event
        } else {
          this.$set(this, field, event)
        }
      },
      updateChild(object, field, event) {
        if (field === 'position') {
          object.position = {
            lat: event.lat(),
            lng: event.lng()
          }
        }
      },
      updatePlace(place) {
        if (typeof place.name !== 'undefined') {
          var locator = GeoLocation.getLangLat(place.name)
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
      }
    },
    computed: mapState({
      errors: state => state.Form.errors,
      submitted: state => state.Form.submitted,
      activeMarkers() {
        return this.markers
      }
    }),
    mounted() {
      let that = this
      RegencyService.getRegency().then(res => {
        that.states = res.data
        this.list = that.states.map(item => {
          return item
        })
      })
    }
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
