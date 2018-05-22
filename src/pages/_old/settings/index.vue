<template>
  <vx-container title="Pengaturan">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows section">

      <div class="row justify-content-md-center">
        <div class="col-lg-10">
          <vx-tabs small position="left" ref="tabs" v-model="tabIndex">
            <vx-tab title="Info Koperasi">
              <vx-card>
                <h5 slot="header" class="my-0">
                  Info Koperasi
                </h5>
                <template slot="link">
                  <vx-button @click="disabledUser = !disabledUser" v-if="disabledUser" class="btn btn-primary-outline ks-light ks-no-text"><span class="la la-pencil ks-icon"></span></vx-button>
                </template>
                <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="3">
                  <vx-form-item label="Tipe Aplikasi" prop="entity_app" v-if="isSuperAdmin">
                    <p class="form-control">{{form.data.entity_app}}</p>
                  </vx-form-item>
                  <vx-form-item label="Nama" prop="entity_name">
                    <p class="form-control">{{form.data.entity_name}}</p>
                  </vx-form-item>
                  <vx-form-item label="Alamat" prop="address">
                    <vx-input type="textarea" name="address" v-model="form.data.address" id="address" :disabled="disabledUser"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Deskripsi" prop="description">
                    <vx-input type="textarea" name="description" v-model="form.data.description" id="description" :disabled="disabledUser"></vx-input>
                  </vx-form-item>
                  <template slot="action" v-if="!disabledUser">
                    <button type="button" class="btn btn-primary-outline ks-light" @click="disabledUser = !disabledUser">Batal</button>
                    <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted" @click="onSubmit">Simpan</button>
                  </template>
                </vx-form>
              </vx-card>
              <vx-card>
                <h5 slot="header" class="my-0">
                  Info Kontak
                </h5>
                <template slot="link">
                  <vx-button @click="disabledContact = !disabledContact" v-if="disabledContact" class="btn btn-primary-outline ks-light ks-no-text"><span class="la la-pencil ks-icon"></span></vx-button>
                </template>
                <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="3">
                  <vx-form-item label="Nomor Handphone" prop="mobile">
                    <vx-input name="mobile" v-model="form.data.mobile" id="mobile" :disabled="disabledContact"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="email" prop="email">
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
                <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="3">
                  <vx-form-item label="Website" prop="website">
                    <vx-input name="website" v-model="form.data.website" id="website" :disabled="disabledSocial"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Instagram" prop="instagram">
                    <vx-input name="instagram" v-model="form.data.instagram" id="instagram" :disabled="disabledSocial"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Twitter" prop="twitter">
                    <vx-input name="twitter" v-model="form.data.twitter" id="twitter" :disabled="disabledSocial"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Facebook" prop="facebook">
                    <vx-input name="facebook" v-model="form.data.facebook" id="facebook" :disabled="disabledSocial"></vx-input>
                  </vx-form-item>
                  <template slot="action" v-if="!disabledSocial">
                    <button type="button" class="btn btn-primary-outline ks-light" @click="disabledSocial = !disabledSocialUser">Batal</button>
                    <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted" @click="onSubmit">Simpan</button>
                  </template>
                </vx-form>
              </vx-card>
            </vx-tab>
            <vx-tab title="Ganti Kata Sandi">
              <vx-card>
                <h5 slot="header" class="my-0">
                  Ganti Kata Sandi
                </h5>
                <div class="ks-items-block">
                  <vx-form :model="form.dataForm" :rules="form.formRules" ref="ruleForm2" type="vertical" label-size="2">
                    <vx-form-item label="Kata Sandi Baru" prop="password">
                      <vx-input type="password" name="newpass" v-model="form.dataForm.password" id="password"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Konfirmasi Kata Sandi" prop="checkPass">
                      <vx-input type="password" name="confirmation" v-model="form.dataForm.checkPass" id="checkPass"></vx-input>
                    </vx-form-item>
                    <template slot="action">
                      <vx-button variant="primary" outline light href="/settings">Batal</vx-button>
                      <button type="submit" class="btn btn-primary ml-2" @click="onSubmit2">Simpan</button>
                    </template>
                  </vx-form>
                </div>
              </vx-card>
            </vx-tab>
          </vx-tabs>
        </div>
      </div>
    </div>
  </vx-container>
</template>
<script>
  import session from '../../services/session'
  export default {
    data () {
      var validaePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('Mohon masukkan password Anda'))
        } else {
          if (this.form.dataForm.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      var validaePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Harap cek password anda lagi'))
        } else if (value !== this.form.dataForm.password) {
          callback(new Error('Data yang dimasukkan tidak sesuai'))
        } else {
          callback()
        }
      }
      return {
        disabledUser: true,
        disabledSocial: true,
        disabledContact: true,
        tabIndex: null,
        titleHead: 'Pengaturan',
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Pengaturan',
          link: ''
        }],
        form: {
          submitted: false,
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
            address: [
              {required: true, message: 'Harap Masukkan Alamat Anda', trigger: 'blur'}
            ],
            mobile: [
              {required: true, message: 'Harap masukkan nomor telepon anda telebih dahulu', trigger: 'blur'},
              {min: 11, max: 14, message: 'Panjang harus 11 sampai 14 huruf', trigger: 'blur'}
            ]
          },
          formRules: {
            password: [
              {validator: validaePass, trigger: 'blur'}
            ],
            checkPass: [
              {validator: validaePass2, trigger: 'blur'}
            ]
          },
          data: {
            full_name: null,
            address: null,
            description: null,
            email: null,
            username: null
          },
          dataForm: {}
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
    computed: {
      isSuperAdmin() {
        return session.me().user_group_id === '65536'
      }
    },
    methods: {
      onSubmit () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            var entity = session.entity()
            this.form.data.entity_type = entity.entity_type
            this.$store.dispatch('entity/update_me', [entity.id, this.form.data])
            this.disabledUser = true
            this.disabledContact = true
          }
        })
      },
      onSubmit2 () {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.$store.dispatch('user/update_me', this.form.dataForm)
          }
        })
      }
    },
    mounted () {
      let that = this
      var me = session.me()
      var entity = session.entity()
      that.form.data.entity_app = entity.entity_app
      that.form.data.entity_name = entity.entity_name
      that.form.data.address = entity.address
      that.form.data.description = entity.description
      that.form.data.mobile = entity.mobile
      that.form.data.email = entity.email
      that.form.data.website = entity.website
      that.form.data.instagram = entity.instagram
      that.form.data.twitter = entity.twitter
      that.form.data.is_active = entity.is_active
      console.log(that.form.data.is_active)
      that.form.data.facebook = entity.facebook

      that.form.dataForm.address = me.address
      that.form.dataForm.email = me.email
      that.form.dataForm.phone = me.phone
      that.form.dataForm.full_name = me.full_name
      that.form.dataForm.user_group = me.user_group.id
    }
  }
</script>
