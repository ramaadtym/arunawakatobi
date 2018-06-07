<template>
  <vx-container title="Tambah Komoditas">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">
      <div class="row justify-content-md-center">
        <div class="col-lg-8">
          <vx-tabs small position="left" ref="tabs" v-model="tabIndex">
            <vx-tab title="Info Komoditas">
              <div class="ks-items-block">
                <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="2">
                  <vx-card>
                    <h5 slot="header" class="my-0">
                      Info Komoditas
                    </h5>
                    <vx-form-item label="Nama Komoditas" prop="commodity_name" :error="errors.commodity_name">
                      <vx-input name="commodity_name" v-model="form.data.commodity_name" id="commodity_name"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Deskripsi" prop="description">
                      <vx-input type="textarea" name="description" v-model="form.data.description"
                                id="description"></vx-input>
                    </vx-form-item>
                  </vx-card>
                  <vx-card>
                    <h5 slot="header" class="my-0">
                      Nama Alias
                    </h5>
                    <div v-if="!form.data.commodity_alias.length" class="text-center p-3">
                      Tidak ada nama alias
                      <br>
                      <br>
                      <button type="submit" class="btn btn-primary btn-sm" :loading="form.submitted" @click="addAlias">
                        Tambah Alias
                      </button>
                    </div>
                    <table class="table table-bordered mb-0" v-if="form.data.commodity_alias.length">
                      <thead>
                        <tr>
                          <th width="200">Alias</th>
                          <th>Deskripsi</th>
                          <th width="50">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(alias, index) in form.data.commodity_alias" :key="index">
                          <td>
                            <vx-input name="alias_name" v-model="alias.alias_name" id="alias_name"></vx-input>
                          </td>
                          <td>
                            <vx-input name="description" v-model="alias.description" id="description"></vx-input>
                          </td>
                          <td>
                            <button type="submit" class="btn btn-danger" :loading="form.submitted" @click="removeAlias(index, $event)">
                              <i class="la la-times"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <template slot="footer" v-if="form.data.commodity_alias.length">
                      <button type="submit" class="btn btn-primary" :loading="form.submitted" @click="addAlias">
                        Tambah Alias
                      </button>
                    </template>
                  </vx-card>
                  <vx-card>
                      <h5 slot="header" class="my-0">
                       Tambah Gambar
                      </h5>
                      <div class="text-center p-3">
                        <div id="imageName"></div>
                       <label class="btn btn-primary btn-sm">
                            <input type="file" @change="onFileSelected" accept="image/*" name="com_img" style="display:none;"> Tambah Gambar
                        </label>
                      </div>
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
  import cloudinaryService from '../../vuxs/services/cloudinary'
  import comodityService from '../../vuxs/services/comodity'
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
          text: 'Daftar Komoditas',
          link: '/commodity'
        }, {
          text: 'Tambah Komoditas',
          link: ''
        }],
        titleHead: 'Tambah Komoditas',
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
                if (res.status === 'success') {
                  self.$router.push('/comodity')
                } else {
                  cloudinaryService.destroy(res.public_id).then(function(res) {
                    alert('Upload Gagal')
                  })
                }
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

