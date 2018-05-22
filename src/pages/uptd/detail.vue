<template>
  <vx-container :title="'Detail UPTD: ' + uptdName">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="table-page mt-4">
      <div class="ks-tables">
        <div class="ks-header">
          <div class="ks-search input-icon icon-right icon icon-lg">
            <input type="text" v-model="table.query" class="form-control" placeholder="Cari">
            <span class="icon-addon"><span class="la la-search"></span></span>
          </div>
          <div class="ks-search">
            <select name="user_group" class="form-control white-bg" v-model="type" @change="changeType(type)">
              <option value="" selected>Semua Tipe Pengguna</option>
              <option value="upi">UPI</option>
              <option value="tangkapan">Penangkapan</option>
              <option value="budidaya">Budidaya</option>
              <option value="tpi">TPI</option>
            </select>
          </div>
          <div class="ks-filters">
            <div class="btn-group" v-if="isSuperAdmin">
              <vx-button variant="primary" to="/uptd/create" block>Tambah User</vx-button>
            </div>
            <div class="btn-group">
              <vx-table-columns :columns="table.fields"></vx-table-columns>
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
              <router-link :to="{name: 'uptd-detail', params: { id: item.item.id }}">
                <vx-button icon="la la-bars" variant="primary" light solid outline></vx-button>
              </router-link>
              <vx-button @click="$root.$emit('show::modal','modal'+ item.item.id)" v-show="item.item.is_active === 1 && isSuperAdmin" icon="la la-times" variant="danger" solid outline></vx-button>
              <vx-modal :id="'modal'+item.item.id" title="Nonakifkan Pengguna">
                <h5 class="text-center">Apakah Anda yakin ingin menonaktifkan User atas nama ({{item.item.full_name}}) ini?</h5>
                <template slot="footer">
                  <div class="ks-items-block">
                    <vx-button variant="danger" solid outline @click="$root.$emit('hide::modal','modal'+item.item.id)">Tidak</vx-button>
                    <vx-button variant="primary" solid outline @click="onSubmit(item.item.id)">Setuju</vx-button>
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
        uptd: null,
        table: {
          filter: {
            'fisherman_type.contains': '',
            'full_name.icontains': ''
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
              visible: data
            },
            type: {
              label: 'Tipe User',
              alias: 'fisherman_type',
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
        return this.uptd ? this.uptd.entity_name : '...'
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
            text: 'UPTD',
            link: '/uptd'
          },
          {
            text: this.uptdName
          }
        ]
      }
    },
    methods: {
      details (item) {
        alert(JSON.stringify(item))
      },
      renderData (tbl) {
        uptdService.getUPTDUsers(this.$route.params.id, {...this.apiParam}).then(payload => {
          const items = payload.data || []
          const total = payload.total || 0
          this.table.total = total
          tbl.items = items
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
        uptdService.getUPTDDetail(this.$route.params.id).then(res => {
          this.uptd = res.data
        })
      },
      changeType(type) {
        this.table.filter['fisherman_type.contains'] = type
      },
      searchEntityName(name) {
        this.table.filter['full_name.icontains'] = name
      }
    },
    mounted() {
      this.fetchDetailUPTD()
    }
  }
</script>

