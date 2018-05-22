<template>
  <vx-container title="Detail Pengguna">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">

      <div class="row justify-content-md-center">
        <div class="col-lg-12">
          <vx-tabs small position="left" ref="tabs" v-model="tabIndex">
            <vx-tab title="Info Pengguna">
              <vx-card>
                <h5 slot="header" class="my-0">
                  Info Pengguna
                </h5>
                <template slot="link" v-if="isSuperAdmin">
                  <vx-button variant="primary" outline light @click="disabledUser = !disabledUser" v-if="disabledUser"><span class="la la-pencil ks-icon"></span></vx-button>
                </template>
                <div class="ks-items-block">
                  <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="3">
                    <vx-form-item label="Tipe Pengguna" prop="entity_app" v-show="isSuperAdmin">
                      <select name="application" v-model="form.data.user_group" id="entity_app" class="form-control" disabled>
                        <option v-for="(ug, id) in usergroups" :selected="id == form.data.user_group ? 'selected': ''" :value="id">{{ ug }}</option>
                      </select>
                    </vx-form-item>
                    <vx-form-item label="Nama Pengguna" prop="full_name" :error="errors.full_name">
                      <vx-input name="full_name" v-model="form.data.full_name" id="full_name" :disabled="disabledUser"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Alamat" prop="address" :error="errors.address">
                      <vx-input type="textarea" name="address" v-model="form.data.address" id="address" :disabled="disabledUser"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Deskripsi" prop="description" v-show="isSuperAdmin">
                      <vx-input type="textarea" name="description" v-model="form.data.description" id="description" :disabled="disabledUser"></vx-input>
                    </vx-form-item>
                    <template slot="action" v-if="!disabledUser">
                      <button type="button" class="btn btn-primary-outline ks-light" @click="disabledUser = !disabledUser">Batal</button>
                      <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted" @click="onSubmit">Simpan</button>
                    </template>
                  </vx-form>
                </div>
              </vx-card>
              <vx-card>
                <h5 slot="header" class="my-0">
                  Info Kontak Pengguna
                </h5>
                <template slot="link" v-if="isSuperAdmin">
                  <vx-button variant="primary" outline light @click="disabledContact = !disabledContact" v-if="disabledContact"><span class="la la-pencil ks-icon"></span></vx-button>
                </template>
                <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="3">
                  <vx-form-item label="Nomor Handphone" prop="phone" :error="errors.phone">
                    <vx-input name="phone" v-model="form.data.phone" id="phone" :disabled="disabledContact"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Email" prop="email" :error="errors.email">
                    <vx-input name="email" v-model="form.data.email" id="email" :disabled="disabledContact"></vx-input>
                  </vx-form-item>
                  <template slot="action" v-if="!disabledContact" v-show="isSuperAdmin">
                    <button class="btn btn-primary-outline ks-light" @click="disabledContact = !disabledContact">Batal</button>
                    <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted" @click="onSubmit">Simpan</button>
                  </template>
                </vx-form>
              </vx-card>
            </vx-tab>
            <vx-tab title="Setting Username" v-if="isSuperAdmin">
              <vx-card>
                <h5 slot="header" class="my-0">
                  Setting Username
                </h5>
                <vx-form :model="form.data2" :rules="form.rules2" ref="ruleForm2" type="vertical" label-size="2">
                  <vx-form-item label="Username" prop="username" :error="errors.username">
                    <vx-input name="username" v-model="form.data2.username" id="username" disabled></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Kata Sandi Baru" prop="password" :error="errors.password">
                    <vx-input type="password" name="newpass" v-model="form.data2.password" id="password"></vx-input>
                  </vx-form-item>
                  <vx-form-item label="Konfirmasi Kata Sandi" prop="checkPass">
                    <vx-input type="password" name="confirmation" v-model="form.data2.checkPass" id="checkPass"></vx-input>
                  </vx-form-item>
                  <template slot="action">
                    <vx-button variant="primary" outline light to="/users">Batal</vx-button>
                    <button type="submit" class="btn btn-primary ml-2" @click="onSubmit2" :disabled="!isSuperAdmin">Simpan</button>
                  </template>
                </vx-form>
              </vx-card>
            </vx-tab>
            <vx-tab title="Peminjaman" v-if="isUserDetail">
              <tab-peminjaman-pengguna></tab-peminjaman-pengguna>
            </vx-tab>
            <vx-tab title="Pemodalan" v-if="isUserDetail">
              <tab-pemodalan-pengguna></tab-pemodalan-pengguna>
            </vx-tab>
          </vx-tabs>
        </div>
      </div>
    </div>
  </vx-container>
</template>
<script>
  import {mapState} from 'vuex'
  import UserService from '../../vuxs/services/user'
  import session from '../../services/session'
  import TabPemodalanPengguna from '../../components/TabPemodalanPengguna'
  import TabPeminjamanPengguna from '../../components/TabPeminjamanPengguna'

  export default {
    components: {
      TabPemodalanPengguna,
      TabPeminjamanPengguna
    },
    data () {
      var validaePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('Harap masukkan password Anda'))
        } else {
          if (this.form.data.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      var validaePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Harap cek password anda lagi'))
        } else if (value !== this.form.data2.password) {
          callback(new Error('Data yang dimasukkan tidak sesuai'))
        } else {
          callback()
        }
      }
      return {
        disabledUser: true,
        disabledContact: true,
        tabIndex: null,
        titleHead: 'Detail Pengguna',
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Daftar Pengguna',
          link: '/users'
        }, {
          text: 'Detail Pengguna',
          link: ''
        }],
        form: {
          submitted: false,
          rules: {
            full_name: [
              {required: true, message: 'Harap masukkan nama panjang Anda', trigger: 'blur'}
            ],
            address: [
              {required: true, message: 'Harap masukkan alamat Anda', trigger: 'blur'}
            ],
            phone: [
              {required: true, message: 'Harap masukkan nomor telepon anda telebih dahulu', trigger: 'blur'},
              {min: 11, max: 14, message: 'Panjang harus 11 sampai 14 huruf', trigger: 'blur'}
            ],
            email: [
              {type: 'email', message: 'Harap masukkan alamat email yang valid', trigger: 'blur'}
            ]
          },
          rules2: {
            password: [
              {validator: validaePass, trigger: 'blur'}
            ],
            checkPass: [
              {validator: validaePass2, trigger: 'blur'}
            ]
          },
          data: {
            full_name: null,
            user_group_id: null,
            address: null,
            description: null,
            phone: null,
            email: null
          },
          data2: {
            username: null
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
            this.$store.dispatch('user/update', [this.$route.params.id, this.form.data])
            this.disabledUser = true
            this.disabledContact = true
          }
        })
      },
      onSubmit2 () {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.$store.dispatch('user/update_pass', [this.$route.params.id, this.form.data2])
            this.disabledUser = true
            this.disabledContact = true
          }
        })
      }
    },
    computed: mapState({
      errors: state => state.Form.errors,
      submitted: state => state.Form.submitted,
      usergroups () {
        return {
          65536: 'Super Admin',
          131072: 'Admin',
          196608: 'User'
        }
      },
      isSuperAdmin () {
        return session.me().user_group_id === '65536'
      },
      isUserDetail () {
        return this.isSuperAdmin && this.form.data.user_group_id === '196608'
      }
    }),
    mounted () {
      let that = this
      UserService.getUserDetail(this.$route.params.id).then(res => {
        that.form.data.full_name = res.full_name
        that.form.data.user_group_id = res.user_group_id
        that.form.data.address = res.address
        that.form.data.description = res.description
        that.form.data.phone = res.phone
        that.form.data.email = res.email
        that.form.data2.username = res.username
      })
    }
  }
</script>
