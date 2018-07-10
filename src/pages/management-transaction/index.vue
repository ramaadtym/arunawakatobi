<template>
  <vx-container title="List Produksi">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">
      <div class="row">
        <div class="col-4">
          <vx-card>
            <h5 slot="header" class="my-0">List Fishlog</h5>
              <div class="list_overflow">
                <div style="display: table;">
                  <div style="display: table-row;">
                    <div style="display: table-cell; width: 20rem;" class="pb-3">
                      Fishlog 1
                    </div>
                    <div style="display: table-cell;">
                       <button type="button" class="btn btn-primary ml-2 btn-sm" @click="pushStash">
                        Add
                      </button>
                    </div>
                  </div>
                  <div style="display: table-row;">
                    <div style="display: table-cell; width: 20rem;">
                      Fishlog 2
                    </div>
                    <div style="display: table-cell;">
                       <button type="button" class="btn btn-primary ml-2 btn-sm">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </vx-card>
        </div>
        <div class="col-4">
          <vx-card>
             <h5 slot="header" class="my-0">Stash</h5>
              <div class="list_overflow">
                <p v-for="t in test">
                  {{t}}
                </p>
              </div>
          </vx-card>
        </div>
        <div class="col-4">
           <div>
             <vx-button type="submit" variant="primary" class="mb-3" style="width:174px;" @click="onSubmit">Save and Publish</vx-button>
            </div>
            <div>
              <vx-button type="submit" variant="primary" @click="onSubmit">Save without Publish</vx-button>
            </div>
        </div>
      </div>
    </div>
  </vx-container>
</template>
<script>
  // this.test.push('asd')
  import table from 'vx/src/mixins/table'
  import InfoBoxCount from '../../components/InfoBoxCount'
  import userService from '../../vuxs/services/user'
  import entityService from '../../vuxs/services/entity'
  import session from '../../services/session'

  export default {
    mixins: [table],
    components: {
      InfoBoxCount
    },
    data () {
      var data = session.me().user_group_id === '65536'
      return {
        table: {
          filter: {
            'entity.entity_type': '',
            'entity.entity_name': ''
          },
          fields: {
            name: {
              label: 'Nama Pengguna',
              alias: 'user.full_name',
              sortable: true,
              visible: true
            },
            entity: {
              label: 'Lembaga',
              alias: 'entity.entity_name',
              sortable: true,
              visible: data
            },
            phone: {
              label: 'Nomor Handphone',
              sortable: false,
              visible: !data
            },
            created_at: {
              label: 'Tanggal Registrasi',
              sortable: false,
              visible: data
            },
            type: {
              label: 'Tipe Pengguna',
              sortable: false,
              visible: data
            },
            is_active: {
              label: 'Status',
              alias: 'user.is_active',
              sortable: true,
              visible: data
            },
            actions: {
              label: 'Aksi',
              visible: true,
              forceActive: true,
              width: 150
            }
          },
          searchKey: ['user.full_name.icontains']
        },
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Manajemen Transaksi',
          link: ''
        }],
        titleHead: 'Manajemen Transaksi',
        status: '',
        options4: [],
        entityName: [],
        list: [],
        loading: false,
        tmp: [],
        test: []
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
      },
      totalSummaryNelayan () {
        return [{
          count: 90,
          label: 'Summary Nelayan',
          class: 'text-primary'
        }]
      },
      totalSummaryUPI () {
        return [{
          count: 56,
          label: 'Summary UPI',
          class: 'text-primary'
        }]
      },
      totalSummaryTpi () {
        return [{
          count: 65,
          label: 'Summary TPI',
          class: 'text-primary'
        }]
      }
    },
    methods: {
      details (item) {
        alert(JSON.stringify(item))
      },
      renderData (tbl) {
        let that = this
        userService.getEntityUser(this.apiParam).then(payload => {
          that.table.total = (payload.data) ? payload.total : 0
          tbl.items = (payload.data) ? payload.data : []
        })
      },
      onSubmit (id) {
        this.$store.dispatch('user/diactive', [id])
      },
      pushStash() {
        this.test.push('asd')
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.options4 = this.list.filter(item => {
              return item.entity_name.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1
            })
          }, 200)
        } else {
          this.options4 = []
        }
      },
      statusActive(status) {
        this.table.filter['entity.entity_type'] = status
      },
      searchEntityName(entityName) {
        this.table.filter['entity.entity_name'] = entityName
      }
    },
    mounted() {
      let that = this
      entityService.getEntity().then(res => {
        that.tmp = res.data
        this.list = that.tmp.map(item => {
          return item
        })
      })
    }
  }
</script>
<style type="text/css" src="../../../static/css/style.css"></style>
