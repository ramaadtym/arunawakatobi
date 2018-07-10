<template>
  <vx-container title="Pengguna">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">
        <div class="row">
          <div class="col-4">
            <info-box-count
              icon="la la-map-marker"
              :count-properties="totalSummaryNelayan" />
          </div>
          <div class="col-4">
            <info-box-count
              icon="la la-map-marker"
              :count-properties="totalSummaryUPI" />
          </div>
          <div class="col-4">
            <info-box-count
              icon="la la-map-marker"
              :count-properties="totalSummaryTpi" />
          </div>
      </div>
      <div class="table-page mt-4">
        <div class="ks-tables">
          <div class="ks-header">
            <div class="ks-search input-icon icon-right icon icon-lg">
              <input type="text" v-model="table.query" class="form-control" placeholder="Cari">
              <span class="icon-addon"><span class="la la-search"></span></span>
            </div>
            <div class="ks-search">
              <select name="user_group" class="form-control white-bg" v-model="status" @change="statusActive(status)">
                <option value="" selected>Semua Tipe Pengguna</option>
                <option value="UPI">UPI</option>
                <option value="Penangkapan">Penangkapan</option>
                <option value="Budidaya">Budidaya</option>
                <option value="TPI">TPI</option>
              </select>
            </div>
            <div class="ks-search">
              <el-select class="w-100" v-model="entityName" clearable filterable remote @change="searchEntityName(entityName)" placeholder="Cari Lembaga" :remote-method="remoteMethod" :loading="loading">
                <el-option v-for="item in options4" :label="item.entity_name" :value="item.entity_name"></el-option>
              </el-select>
            </div>
            <div class="ks-filters">
              <div class="btn-group" v-if="isSuperAdmin">
                <vx-button variant="primary" to="/users/create" block>Tambah Pengguna</vx-button>
              </div>
              <div class="btn-group">
                <vx-table-columns :columns="table.fields"></vx-table-columns>
              </div>
            </div>
          </div>
          <div class="ks-content ks-compact">
            <vx-table class="table ks-text-light ks-table-header" :items-provider="renderData" :config="table">
              <template slot="name" scope="item">
                {{item.item.user.full_name}}
              </template>
              <template slot="entity" scope="item">
                {{item.item.entity.entity_name}}
              </template>
              <template slot="phone" scope="item" v-show="isSuperAdmin">
                {{item.item.user.phone}}
              </template>
              <template slot="created_at" scope="item">
                {{ $moment(item.item.user.created_at).format('DD-MM-YYYY') }}
              </template>
              <template slot="type" scope="item">
                {{item.item.entity.entity_type}}
              </template>
              <template slot="is_active" scope="item">
                {{item.item.user.is_active?'Aktif':'Tidak Aktif'}}
              </template>
              <template slot="actions" scope="item">
                <router-link :to="{name: 'users-detail', params: { id: item.item.user.id }}">
                  <vx-button icon="la la-bars" variant="primary" light solid outline></vx-button>
                </router-link>
                <vx-button @click="$root.$emit('show::modal','modal'+ item.item.id)" v-show="item.item.user.is_active === 1 && isSuperAdmin" icon="la la-times" variant="danger" solid outline></vx-button>
                <vx-modal :id="'modal'+item.item.id" title="Nonakifkan Pengguna">
                  <h5 class="text-center">Apakah Anda yakin ingin menonaktifkan Pengguna atas nama ({{item.item.user.full_name}}) ini?</h5>
                  <template slot="footer">
                    <div class="ks-items-block">
                      <vx-button variant="danger" solid outline @click="$root.$emit('hide::modal','modal'+item.item.id)">Tidak</vx-button>
                      <vx-button variant="primary" solid outline @click="onSubmit(item.item.user.id)">Setuju</vx-button>
                    </div>
                  </template>
                </vx-modal>
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
          text: 'Daftar Pengguna',
          link: ''
        }],
        titleHead: 'Daftar Pengguna',
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

