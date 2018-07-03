<template>
  <vx-container title="Tambah Nelayan">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">

      <div class="row justify-content-md-center">
        <div class="col-lg-10">
          <vx-card>
            <h5 slot="header" class="my-0">Form Nelayan</h5>
            <div class="ks-items-block">
              <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="2">
                <vx-form-item label="Jenis Nelayan" prop="fisherman_type" :error="errors.fisherman_typeid">
                  <select name="fisherman_type" v-model="form.data.fisherman_type" id="fisherman_type" class="form-control white-bg">
                    <option value="">- Pilih Jenis Nelayan -</option>
                    <option v-for="type in typeOptions" :value="type.value">{{ type.label }}</option>
                  </select>
                </vx-form-item>
                <div v-if="form.data.fisherman_type === 'tangkap'">
                  <vx-form-item label="Nama Nelayan" prop="full_name" :error="errors.full_name">
                    <vx-input name="full_name" v-model="form.data.full_name" id="full_name"></vx-input>
                    <!-- <input type="hidden" name="user_id" id="user_id" :value="this.$route.params.id" class="form-control form-control-danger"> -->
                  </vx-form-item>
                  <vx-form-item label="No. Telp" prop="phone" :error="errors.phone">
                    <vx-input name="phone" v-model="form.data.phone" id="phone"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Nama Kapal" prop="ship_name" :error="errors.ship_name">
                    <vx-input name="ship_name" v-model="form.data.ship_name" id="ship_name"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Jenis Perahu" prop="ship_type" :error="errors.ship_type">
                    <select name="ship_type" v-model="form.data.ship_type" id="ship_type" class="form-control white-bg">
                      <option value="">- Pilih Jenis Perahu -</option>
                      <option v-for="type in shipTypeOptions" :value="type.value">{{ type.label }}</option>
                    </select>
                  </vx-form-item>
                  <vx-form-item label="Enumerator" prop="enum">
                    <select name="entity" v-model="form.data.entity" id="entity" class="form-control white-bg">
                      <option value="">- Pilih Enumerator -</option>
                      <option v-for="user in users" :value="user.id">{{ user.full_name }}</option>
                    </select>
                  </vx-form-item>
                </div>
                <div v-if="form.data.fisherman_type === 'budidaya'">
                  <vx-form-item label="Jenis Budidaya" prop="jenis_budidaya" :error="errors.jenis_budidayaid">
                    <select name="jenis_budidaya" v-model="form.data.jenis_budidaya" id="jenis_budidaya" class="form-control white-bg">
                      <option value="">- Pilih Jenis Budidaya -</option>
                      <option value="Rumput Laut">Rumput Laut</option>
                      <option value="Karamba">Karamba</option>
                    </select>
                  </vx-form-item>
                  <vx-form-item label="Nama Rumah Tangga Perikanan Budidaya Pembesaran" prop="full_name" :error="errors.full_name">
                    <vx-input name="full_name" v-model="form.data.full_name" id="full_name"></vx-input>
                  </vx-form-item>
                  <div v-if="form.data.jenis_budidaya == 'Rumput Laut'">

                  </div>
                  <div v-if="form.data.jenis_budidaya == 'Karamba'">

                  </div>
                </div>
                <div v-if="form.data.fisherman_type === 'upi'">

                </div>
                <!-- <vx-form-item label="Username" prop="username" :error="errors.username">
                  <vx-input name="username" v-model="form.data.username" id="username"></vx-input>
                </vx-form-item>
                <vx-form-item label="Password" prop="password" :error="errors.password">
                  <vx-input type="password" name="password" v-model="form.data.password" id="password"></vx-input>
                </vx-form-item> -->
                <template slot="action">
                  <vx-button variant="primary" outline light class="mr-2" to="/uptd">Batal</vx-button>
                  <!-- <vx-button type="submit" variant="primary" @click="onSubmit">Simpan</vx-button> -->
                   <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted" @click="onSubmit">
                        Simpan
                   </button>
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
  // import EntityService from '../../vuxs/services/entity'
  import RegencyService from '../../vuxs/services/regency'
  import uptdService from '../../vuxs/services/uptd_create'
  import userService from '../../vuxs/services/user'
  // import GeoLocation from '../../services/geocoder'
  export default {
    data () {
      return {
        place: '',
        latLng: {},
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Daftar UPTD',
          link: '/uptd'
        }, {
          text: 'Tambah Nelayan',
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
        titleHead: 'Tambah Nelayan',
        options4: [],
        list: [],
        loading: false,
        states: [],
        entities: [],
        users: [],
        formatted_address: '',
        typeOptions: [
          {
            value: 'tangkap',
            label: 'Tangkap'
          },
          {
            value: 'budidaya',
            label: 'Budidaya'
          },
          {
            value: 'upi',
            label: 'UPI'
          }
        ],
        shipTypeOptions: [
          {
            value: 'sampan',
            label: 'Sampan'
          },
          {
            value: 'Tanpa Motor',
            label: 'Tanpa Motor'
          },
          {
            value: 'Tanpa Perahu',
            label: 'Tanpa Perahu'
          }
        ],
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
              {required: true, message: 'Harap masukkan nomor telepon telebih dahulu', trigger: 'blur'},
              {min: 11, max: 14, message: 'Panjang harus 11 sampai 14 angka', trigger: 'blur'}
            ],
            username: [
              {required: true, message: 'Harap masukkan username terlebih dahulu', trigger: 'blur'}
            ],
            password: [
              {required: true, message: 'Harap mengisi password Anda terlebih dahulu', trigger: 'blur'}
            ]
          },
          data: {
            full_name: '',
            ship_name: '',
            ship_type: '',
            user_id: this.$route.params.id
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
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            var self = this
            this.$store.dispatch('user/create', this.form.input)
            uptdService.createUPTDUsers(self.form.data).then(function(res) {
              if (res.status === 'success') {
                self.$router.push('../detail/' + self.$route.params.id)
                console.log(res)
              }
            })
            console.log(self.form.data)
          }
        })
      },
      onChange (event) {
        this.form.data.user_group = (event.srcElement.value)
      },
      updateMapCenter(which, value) { // eslint-disable-line no-unused-vars
        this.center = _.clone(this.reportedCenter)
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
      // updateChild(object, field, event) {
      //   // ini ditrigger saat marker moved
      //   if (field === 'position') {
      //     object.position = {
      //       lat: event.lat(),
      //       lng: event.lng()
      //     }
          // get address formated from lang lat, don't delete in case we need this function
          // used reverse geocoder method by google maps
//          var address = GeoLocation.getAddress(object.position.lng, object.position.lat)
//          let that = this
//          if (address) {
//            address.then(function (data) {
//              that.formatted_address = data.formatted_address
//            })
//          }
      //   }
      // },
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
      userService.getAll().then(res => {
        that.users = res.data
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
