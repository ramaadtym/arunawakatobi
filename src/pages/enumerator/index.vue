<template>
  <vx-container title="List Enumerator">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
      <div class="table-page mt-4">
        <div class="ks-tables" style="padding: 0px 15px;">
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <div class="ks-search input-icon icon-right icon icon-lg">
                  <input type="text" v-model="table.query" class="form-control" placeholder="Cari">
                  <span class="icon-addon"><span class="la la-search"></span></span>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <div class="ks-search">
                  <select name="user_group" class="form-control white-bg" v-model="type" @change="changeType(type)">
                    <option value="" selected>Semua Tipe Pengguna</option>
                    <option value="UPI">UPI</option>
                    <option value="Penangkapan">Penangkapan</option>
                    <option value="Budidaya">Budidaya</option>
                    <option value="TPI">TPI</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-7 text-right">
              <div class="form-group">
                <div class="ks-filters">
                  <div class="btn-group">
                    <vx-button variant="primary" to="/enumerator/create" block>Tambah User</vx-button>
                  </div>
                  <div class="btn-group">
                    <vx-table-columns :columns="table.fields"></vx-table-columns>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ks-content ks-compact">
            <vx-table class="table ks-text-light ks-table-header" :items-provider="renderData" :config="table">
              <template slot="full_name" scope="item">
                {{ item.item.full_name }}
              </template>
              <template slot="type" scope="item">
                {{ item.item.fisherman_type }}
              </template>
              <template slot="registration_date" scope="item">
                {{ $moment(item.item.created_at).format('DD/MM/YYYY') }}
              </template>
              <template slot="is_active" scope="item">
                {{ item.item.is_active? 'Aktif' : 'Tidak Aktif' }}
              </template>
              <template slot="actions" scope="item">
                <router-link :to="{name: 'enumerator-detail', params: { id: item.item.id }}">
                  <vx-button icon="la la-bars" variant="primary" light solid outline></vx-button>
                </router-link>
                <router-link :to="{name: 'uptd-edit', params: { id: item.item.id }}">
                  <vx-button icon="la la-edit" variant="primary" primary solid outline></vx-button>
                </router-link>
                <vx-button @click="$root.$emit('show::modal','modal'+ item.item.id)" icon="la la-trash-o" variant="danger" solid outline></vx-button>
                <vx-modal :id="'modal'+item.item.id" title="Nonakifkan Pengguna">
                  <h5 class="text-center">Apakah Anda yakin ingin menghapus User atas nama ({{ item.item.full_name }}) ini?</h5>
                  <template slot="footer">
                    <div class="ks-items-block">
                      <vx-button variant="danger" solid outline @click="$root.$emit('hide::modal','modal'+item.item.id)">Tidak</vx-button>
                      <vx-button variant="primary" solid outline @click="deleteUser(item.item.id)">Ya</vx-button>
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
  import uptdService from '../../vuxs/services/uptd'
  import session from '../../services/session'

  export default {
    mixins: [table],
    components: {
      InfoBoxCount
    },
    data () {
      const user = session.me().user_group_id === '65536'
      return {
        user: user,
        entity: session.entity(),
        uptd: null,
        table: {
          filter: {
            'user.user_type': '',
            'user.user_name': ''
          },
          fields: {
            full_name: {
              label: 'Nama User',
              alias: 'full_name',
              sortable: true,
              visible: true
            },
            registration_date: {
              label: 'Tanggal Registrasi',
              alias: 'created_at',
              sortable: true,
              visible: user
            },
            type: {
              label: 'Tipe User',
              alias: 'fisherman_type',
              sortable: true,
              visible: user
            },
            is_active: {
              label: 'Status',
              alias: 'is_active',
              sortable: false,
              visible: user
            },
            actions: {
              label: 'Aksi',
              visible: true,
              forceActive: true,
              width: 200
            }
          },
          searchKey: [
            'full_name.icontains'
          ]
        },
        titleHead: 'Daftar User',
        type: '',
        options: [],
        userName: [],
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
      uptdName () {
        return this.uptd ? this.uptd.name : '...'
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
      },
      breadcrumbLink() {
        return [
          {
            text: 'Dashboard',
            link: '/'
          },
          {
            text: 'Enumerator'
          }
        ]
      }
    },
    methods: {
      details (item) {
        alert(JSON.stringify(item))
      },
      renderData (tbl) {
        let that = this
        uptdService.getUPTDUsers(this.entity.id, {...this.apiParam}).then(payload => {
          const items = payload.data || []
          const total = payload.total || 0
          that.table.total = total
          tbl.items = items
        })
      },
      deleteUser (id) {
        console.log('Delete user')
        // this.$store.dispatch('user/diactive', [id])
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.options = this.list.filter(item => {
              return item.user_name.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1
            })
          }, 200)
        } else {
          this.options = []
        }
      },
      fetchDetailUPTD () {
        uptdService.getUPTDDetail(this.entity.id).then(res => {
          this.uptd = res.data
        })
      },
      changeType(type) {
        this.table.filter['user.user_type'] = type
      },
      searchEntityName(userName) {
        this.table.filter['user.user_name'] = userName
      }
    },
    mounted() {
      this.fetchDetailUPTD()
    }
  }
</script>

