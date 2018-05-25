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
                    <vx-form-item label="Nama User" prop="user_name" :error="errors.user_name">
                      <vx-input name="user_name" v-model="form.data.user_name" id="user_name"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Tgl Registrasi">
                    	<input type="date" class="form-control" name="reg_date" id="reg_date">
                    </vx-form-item>
                     <vx-form-item label="Status">
                    	<select class="form-control" id="sel1">
                    	    <option value="0">- Pilih Status -</option>
                    	    <option value="aktif">Aktif</option>
                    	    <option value="tidak aktif">Tidak Aktif</option>
                    	  </select>
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
  import Vue from 'vue'
  import vAvatar from 'vue-avatar/src/Avatar.vue'
  import { mapState } from 'vuex'
  import axios from 'axios'
  // import cloudinary from 'cloudinary'
  import comodityService from '../../vuxs/services/comodity'
  // cloudinary.config({
  //   cloud_name: 'dk2mkgzg3',
  //   api_key: '865121419938338',
  //   api_secret: 'r_m3k8qmc5VOGxrdIQTNfq3Q-Lk'
  // })

var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dk2mkgzg3/image/upload'
var CLOUDINARY_UPLOAD_PRESET = 'wbwuqzlz'
var file = null

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
            comodity_name: [
              {
                required: true,
                message: 'Harap masukkan nama komoditas terlebih dahulu',
                trigger: 'blur'
              }
            ]
          },
          data: {
            commodity_name: '',
            commodity_size: '',
            size_type: '',
            image: '',
            description: '',
            commodity_alias: [
              // {alias_name: '', description: ''}
            ]
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
          this.form.data.commodity_size = parseFloat(this.form.data.commodity_size)
          if (valid) {
            var self = this
            // File Upload using Cloudinary API
            var formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            axios({
              url: CLOUDINARY_URL,
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: formData
            }).then(function(res) {
              self.form.data.image = res.data.secure_url
              comodityService.createComodity(self.form.data).then(function(res) {
                self.$router.push('/comodity')
              })
              // this.getRespon()
            // refresh abis ini
            }).catch(function(err) {
              return err
            })
          }
        })
      },
      async getRespon () {
        let response
        try {
          response = await Vue.http.get('https://api.cloudinary.com/v1_1/dk2mkgzg3/image/upload')
        } catch (ex) {
          // Handle error
          return
        }
        // Handle success
        response.body
      },
      addAlias (e) {
        e.preventDefault()
        this.form.data.commodity_alias.push({alias_name: '', description: ''})
      },
      removeAlias (index) {
        this.form.data.commodity_alias.splice(index, 1)
      },
      onFileSelected(event) {
        file = event.target.files[0]
        document.getElementById('imageName').innerHTML = 'File : ' + file.name
      }
    },
    computed: mapState({
      errors: state => state.Form.errors,
      submitted: state => state.Form.submitted
    })
  }
</script>
<style>
  .input-group-addon {
    padding: 0px;
    border: none;
  }
</style>
