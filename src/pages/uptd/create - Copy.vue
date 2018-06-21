<template>
  <vx-container title="Tambah User UPTD">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">
      <div class="row justify-content-md-center">
        <div class="col-lg-8">
          <vx-tabs small position="left" ref="tabs" v-model="tabIndex">
            <vx-tab title="Tambah User">
              <div class="ks-items-block">
                <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="2">
                  <vx-card>
                    <h5 slot="header" class="my-0">
                      Info User 
                    </h5>
                    <vx-form-item label="Nama User" prop="full_name" :error="errors.full_name">
                      <vx-input name="fullr_name" v-model="form.data.full_name" id="full_name"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="No. Telp" prop="phone" :error="errors.phone">
                      <vx-input name="phone" v-model="form.data.phone" id="phone"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Tempat Lahir" prop="birth_place" :error="errors.birth_place">
                      <vx-input name="birth_place" v-model="form.data.birth_place" id="birth_place"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Tanggal Lahir" prop="birth_date" :error="errors.birth_date">
                      <input type="date" name="birth_date" class="form-control" v-model="form.data.birth_date" id="birth_date">
                    </vx-form-item>
                    <vx-form-item label="Alamat" prop="address" :error="errors.address">
                      <textarea name="address" class="form-control" v-model="form.data.address" id="address"></textarea>
                    </vx-form-item>
                  </vx-card>
                  <vx-card>
                    <h5 slot="header" class="my-0">
                      Data Kelautan
                    </h5>
                    <vx-form-item label="Jenis Nelayan" prop="no_sipi" :error="errors.fisherman_type">
                      <vx-input name="fisherman_type" v-model="form.data.fisherman_type" id="fisherman_type"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="No.SIPI" prop="no_sipi" :error="errors.no_sipi">
                      <vx-input name="no_sipi" v-model="form.data.no_sipi" id="sipi"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="No.SIUP" prop="no_siup" :error="errors.no_siup">
                      <vx-input name="no_siup" v-model="form.data.no_siup" id="siup"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Jenis Kapal" prop="ship_type" :error="errors.ship_type">
                      <vx-input name="ship_type" v-model="form.data.ship_type" id="ship_type"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Alat Tangkap" prop="ship_type" :error="errors.tools">
                      <vx-input name="tools" v-model="form.data.tools" id="tools"></vx-input>
                    </vx-form-item>
                    <template slot="footer">
                      <vx-button variant="primary" light solid outline to="/commodity">Batal</vx-button>
                      <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted" @click="submitForm">
                        Simpan
                      </button>
                    </template>
                  </vx-card>
                </vx-form>
              </div>
            </vx-tab>
          </vx-tabs>
        </div>
      </div>
    </div>
  </vx-container>
</template>
<script>
  import vAvatar from 'vue-avatar/src/Avatar.vue'
  import { mapState } from 'vuex'
  // import axios from 'axios'
  import uptdService from '../../vuxs/services/uptd_create'
  export default {
    data() {
      return {
        tabIndex: null,
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Daftar UPTD',
          link: '/uptd'
        }, {
          text: 'Tambah User UPTD',
          link: ''
        }],
        titleHead: 'Tambah User UPTD',
        form: {
          submitted: false,
          rules: {
            full_name: [
              {
                required: true,
                message: 'Harap masukkan nama pengguna terlebih dahulu',
                trigger: 'blur'
              }
            ]
          },
          data: {
            full_name: '',
            phone: '',
            birth_place: '',
            birth_date: ''
          }
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
      submitForm () {
        this.$refs.ruleForm.validate((valid) => {
          // console.log(this.form.data)
          if (valid) {
            var self = this
            uptdService.createUPTDUsers(self.form.data).then(function(res) {
              if (res.status === 'success') {
                self.$router.push('/uptd')
              }
            })
          }
        })
      }
    },
    computed: mapState({
      errors: state => state.Form.errors,
      submitted: state => state.Form.submitted
    }),
    fetchUPTD () {
      return this.uptd
    }
  }
</script>
<style>
  .input-group-addon {
    padding: 0px;
    border: none;
  }
</style>
