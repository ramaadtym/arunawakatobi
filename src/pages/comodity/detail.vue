<template>
  <vx-container title="Detail Komoditas">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">
      <div class="row justify-content-md-center">
        <div class="col-lg-12">
          <vx-tabs small position="left" ref="tabs" v-model="tabIndex">
            <vx-tab title="Info Komoditas">

              <vx-card>
                <h5 slot="header" class="my-0">
                  Info Komoditas
                </h5>
                <template slot="link">
                  <vx-button class="btn btn-primary-outline ks-light ks-no-text" @click="disabledInfo = !disabledInfo"
                             v-if="disabledInfo"><span class="la la-pencil ks-icon"></span></vx-button>
                </template>
                <div class="ks-items-block">
                  <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="2">
                    <vx-input name="id" v-model="form.data.id" id="id"
                              :disabled="disabledInfo" type="hidden"></vx-input>
                    <vx-form-item label="Nama Komoditas" prop="commodity_name" :error="errors.commodity_name">
                      <vx-input name="commodity_name" v-model="form.data.commodity_name" id="commodity_name"
                                :disabled="disabledInfo"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Deskripsi" prop="description">
                      <vx-input type="textarea" name="description" v-model="form.data.description"
                                id="description" :disabled="disabledInfo"></vx-input>
                    </vx-form-item>
                    <vx-form-item label="Ukuran" prop="commodity_size">
                      <vx-input v-model="form.data.commodity_size" placeholder="input large"
                                :disabled="disabledInfo" type="number" number step="0.01">
                        <template slot="prepend">
                          <select name="size_type" id="size_type" v-model="form.data.size_type"
                                  :disabled="disabledInfo" class="btn btn-default btn-outline" outline>
                            <option value="panjang">centimeter</option>
                            <option value="jumlah">ekor/kg</option>
                            <option value="berat">kg</option>
                          </select>
                        </template>
                      </vx-input>
                    </vx-form-item>
                    <template slot="action" v-if="!disabledInfo">
                      <button type="button" class="btn btn-primary-outline ks-light"
                              @click="disabledInfo = !disabledInfo">Batal
                      </button>
                      <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted"
                              @click="onSubmit">Simpan
                      </button>
                    </template>
                  </vx-form>
                </div>
              </vx-card>
              <vx-card>
                <h5 slot="header" class="my-0">
                  Alias
                </h5>
                <template slot="link">
                  <vx-button class="btn btn-primary-outline ks-light ks-no-text"
                             @click="disabledDetail = !disabledDetail" v-if="disabledDetail"><span
                    class="la la-pencil ks-icon"></span></vx-button>
                  <vx-button @click="addRow" class="btn btn-primary-outline ks-light ks-no-text" v-if="!disabledDetail" :disabled="disabledDetail"><span
                    class="la la-plus ks-icon"></span></vx-button>
                </template>
                <div class="ks-items-block">
                  <vx-form :model="form.data" :rules="form.rules" ref="ruleForm" type="vertical" label-size="2">
                    <template v-for="(aliases, index) in form.data.commodity_alias">
                      <vx-form-item :label="'Nama Alias ' + (index+1)" prop="commodity_alias" v-if="form.data.commodity_alias[index].is_default !== 1" :error="errors.alias_name">
                        <vx-input name="x" v-model="form.data.commodity_alias[index].alias_name" id="commodity_alias" :disabled="disabledDetail">
                          <template slot="append" v-if="!disabledDetail">
                            <vx-button type="button" block @click="deleteRow(aliases)" :disabled="disabledDetail"><span
                              class="la la-minus"></span></vx-button>
                          </template>
                        </vx-input>
                      </vx-form-item>
                    </template>
                    <template slot="action" v-if="!disabledDetail">
                      <button type="button" class="btn btn-primary-outline ks-light"
                              @click="disabledDetail = !disabledDetail">Batal
                      </button>
                      <button type="submit" class="btn btn-primary ml-2" :loading="form.submitted"
                              @click="onSubmitAlias">
                        Simpan
                      </button>
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
  import vAvatar from 'vue-avatar/src/Avatar.vue'
  import comodityService from '../../vuxs/services/comodity'
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        disabledInfo: true,
        disabledDetail: true,
        tabIndex: null,
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Daftar Komoditas',
          link: '/commodity'
        }, {
          text: 'Detail Komoditas',
          link: ''
        }],
        titleHead: 'Detail Komoditas',
        form: {
          submitted: false,
          rules: {
            comodity_name: [
              {required: true, message: 'Harap masukkan nama komoditas terlebih dahulu', trigger: 'blur'}
            ]
          },
          data: {
            id: '',
            commodity_name: '',
            commodity_size: '',
            size_type: '',
            description: '',
            commodity_alias: [{
              id: '',
              alias_name: ''
            }]
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
      onSubmit () {
        this.$refs.ruleForm.validate((valid) => {
          this.form.data.commodity_size = parseFloat(this.form.data.commodity_size)
          this.form.data.id = parseInt(this.form.data.id)
          if (valid) {
            this.$store.dispatch('comodity/update', [this.form.data.id, this.form.data])
            this.disabledInfo = true
            this.disabledDetail = true
          }
        })
      },
      onSubmitAlias () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('comodity/update', [this.$route.params.id, this.form.data])
          }
        })
      },
      addRow () {
        this.form.data.commodity_alias.push({alias_name: '', description: ''})
      },
      deleteRow (item) {
        var index = this.form.data.commodity_alias.indexOf(item)
        if (index !== -1) {
          this.form.data.commodity_alias.splice(index, 1)
        }
      }
//      showError(index) {
//        return this.errors['comodityalias.' + index + '.aliasname']
//      }
    },
    created () {
      let that = this
      comodityService.showComodity(this.$route.params.id).then(res => {
        that.form.data = res
      })
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
