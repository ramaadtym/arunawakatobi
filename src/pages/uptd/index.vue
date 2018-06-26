<template>
  <vx-container title="Daftar UPTD">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
      <div class="table-page mt-4">
        <div class="ks-tables">
          <div class="ks-header">
            <div class="ks-search input-icon icon-right icon icon-lg">
              <input type="text" v-model="table.query" class="form-control" placeholder="Cari">
              <span class="icon-addon"><span class="la la-search"></span></span>
            </div>
            <div class="ks-filters">
              <div class="btn-group" v-if="isSuperAdmin">
              <vx-button variant="primary" block @click="addEnum()">Tambah Enumerator</vx-button>
            </div>
              <div class="btn-group">
                <vx-table-columns :columns="table.fields"></vx-table-columns>
              </div>
            </div>
          </div>
          <div class="ks-content ks-compact">
            <vx-table class="table ks-text-light ks-table-header" :items-provider="renderData" :config="table">
              <template slot="name" scope="item">
                {{ item.item.entity_name }}
              </template>
              <template slot="count_users" scope="item">
                {{ item.item.count_users }}
              </template>
              <template slot="is_active" scope="item">
                {{ item.item.is_active? 'Aktif' : 'Tidak Aktif' }}
              </template>
              <template slot="actions" scope="item">
                <router-link :to="{name: 'uptd-detail', params: { id: item.item.id }}">
                  <vx-button icon="la la-bars" variant="primary" light solid outline></vx-button>
                </router-link>
              </template>
            </vx-table>
            <div style="padding: 20px 20px;">
              <vx-pagination :config="table" v-model="table.currentPage" extended></vx-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vx-container>
</template>
<script>
  import table from 'vx/src/mixins/table'
  import InfoBoxCount from '../../components/InfoBoxCount'
  import uptdService from '../../vuxs/services/uptd'
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
              label: 'Nama UPTD',
              alias: 'entity_name',
              sortable: true,
              visible: true
            },
            count_users: {
              label: 'Jumlah User',
              alias: 'count_users',
              sortable: true,
              visible: data
            },
            is_active: {
              label: 'Status',
              alias: 'is_active',
              sortable: false,
              visible: data
            },
            actions: {
              label: 'Aksi',
              visible: true,
              forceActive: true,
              width: 150
            }
          },
          searchKey: [
            'uptd.name.icontains'
          ]
        },
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Daftar UPTD',
          link: ''
        }],
        titleHead: 'Daftar UPTD',
        status: '',
        options4: [],
        entityName: [],
        list: [],
        loading: false,
        tmp: []
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
      addEnum () {
        this.$router.push('/enumerator/')
      },
      renderData (tbl) {
        let that = this
        uptdService.getUPTD(this.apiParam).then(payload => {
          const uptds = payload.data || []
          const total = payload.total
          that.table.total = total || 0
          tbl.items = uptds
        })
      },
      onSubmit (id) {
        this.$store.dispatch('user/diactive', [id])
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

    }
  }
</script>

