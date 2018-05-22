<template>
  <vx-container title="Detail Lembaga">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">
      <div class="row justify-content-md-center">
        <div class="col-lg-12">
          <vx-tabs small position="left" ref="tabs" v-model="tabIndex">
            <vx-tab title="Info Lembaga">
              <vx-card>
                <h5 slot="header" class="my-0">
                  Info Lembaga
                </h5>
                <template slot="link">
                  <vx-button class="btn btn-primary-outline ks-light ks-no-text" @click="disabledInfo = !disabledInfo" v-if="disabledInfo"><span class="la la-pencil ks-icon"></span></vx-button>
                </template>
                <div class="ks-items-block">
                  <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="2">
                    <vx-form-item label="Pilih Aplikasi" prop="entity_app" :error="errors.entity_app">
                      <select name="application" v-model="form.data.entity_app" id="entity_app" class="form-control" :disabled="disabledInfo">
                        <option value="e-tpi">e-tpi</option>
                        <option value="sipi">sipi</option>
                        <option value="fishlog">fishlog</option>
                      </select>
                    </vx-form-item>
                    <vx-form-item label="Nama Lembaga" prop="entity_name" :error="errors.entity_name">
                      <vx-input name="name" v-model="form.data.entity_name" id="entity_name" disabled></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Alamat" prop="address" :error="errors.address">
                      <vx-input type="textarea" name="address" v-model="form.data.address" id="address" :disabled="disabledInfo"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Deskripsi" prop="description" :error="errors.description">
                      <vx-input type="textarea" name="description" v-model="form.data.description" id="description" :disabled="disabledInfo"></vx-input>
                    </vx-form-item>
                    <template slot="action" v-if="!disabledInfo">
                      <button type="button" class="btn btn-primary-outline ks-light" @click="disabledInfo = !disabledInfo">Batal</button>
                      <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted" @click="onSubmit">Simpan</button>
                    </template>
                  </vx-form>
                </div>
              </vx-card>
              <vx-card>
                <h5 slot="header" class="my-0">
                  Info Kontak
                </h5>
                <template slot="link">
                  <vx-button @click="disabledContact = !disabledContact" v-if="disabledContact" class="btn btn-primary-outline ks-light ks-no-text"><span class="la la-pencil ks-icon"></span></vx-button>
                </template>
                <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="2">
                  <vx-form-item label="Handphone" prop="mobile" :error="errors.mobile">
                    <vx-input name="mobile" v-model="form.data.mobile" id="mobile" :disabled="disabledContact"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Nomor Telepon" prop="phone" :error="errors.phone">
                    <vx-input type="number" name="phone" v-model="form.data.phone" id="phone" :disabled="disabledContact"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="email" prop="email" :error="errors.email">
                    <vx-input name="email" v-model="form.data.email" id="email" :disabled="disabledContact"></vx-input>
                  </vx-form-item>
                  <template slot="action" v-if="!disabledContact">
                    <button class="btn btn-primary-outline ks-light" @click="disabledContact = !disabledContact">Batal</button>
                    <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted" @click="onSubmit">Simpan</button>
                  </template>
                </vx-form>
              </vx-card>
            </vx-tab>
            <vx-tab title="Info Social Media">
              <vx-card>
                <h5 slot="header" class="my-0">
                  Info Social Media
                </h5>
                <template slot="link">
                  <vx-button @click="disabledSocial = !disabledSocial" v-if="disabledSocial" class="btn btn-primary-outline ks-light ks-no-text"><span class="la la-pencil ks-icon"></span></vx-button>
                </template>
                <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="2">
                  <vx-form-item label="Website" prop="website" :error="errors.website">
                    <vx-input name="website" v-model="form.data.website" id="website" :disabled="disabledSocial"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Instagram" prop="instagram" :error="errors.instagram">
                    <vx-input name="instagram" v-model="form.data.instagram" id="instagram" :disabled="disabledSocial"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Twitter" prop="twitter" :error="errors.twitter">
                    <vx-input name="twitter" v-model="form.data.twitter" id="twitter" :disabled="disabledSocial"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Facebook" prop="facebook" :error="errors.facebook">
                    <vx-input name="facebook" v-model="form.data.facebook" id="facebook" :disabled="disabledSocial"></vx-input>
                  </vx-form-item>
                  <template slot="action" v-if="!disabledSocial">
                    <button class="btn btn-primary-outline ks-light" @click="disabledSocial = !disabledSocial">Batal</button>
                    <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted" @click="onSubmit">Simpan</button>
                  </template>
                </vx-form>
              </vx-card>
            </vx-tab>
          </vx-tabs>
        </div>
      </div>
    </div>
  </vx-container>
</template>
<script>
  import {mapState} from 'vuex'
  import EntityService from '../../vuxs/services/entity'
  export default {
    data () {
      return {
        disabledInfo: true,
        disabledContact: true,
        disabledSocial: true,
        tabIndex: null,
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Daftar Lembaga',
          link: '/entity'
        }, {
          text: 'Detail Lembaga',
          link: ''
        }],
        titleHead: 'Detail Lembaga',
        form: {
          rules: {
            entity_app: [
              {required: true, message: 'Please select the application you use', trigger: 'blur'}
            ],
            entity_type: [
              {required: true, message: 'Please select the entity type first', trigger: 'blur'}
            ],
            entity_name: [
              {required: true, message: 'Please input Activity name', trigger: 'blur'}
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
              {type: 'email', message: 'Please input a valid email', trigger: 'blur'}
            ]
          },
          data: {
            email: '',
            phone: null,
            entity_logo: ''
          }
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
            this.$store.dispatch('entity/update', [this.$route.params.id, this.form.data])
            this.disabledInfo = true
            this.disabledContact = true
            this.disabledSocial = true
          }
        })
      }
    },
    created () {
      let that = this
      EntityService.getEntityDetail(this.$route.params.id).then(res => {
        that.form.data = res
      })
    },
    computed: mapState({
      errors: state => state.Form.errors,
      submitted: state => state.Form.submitted
    })
  }
</script>
