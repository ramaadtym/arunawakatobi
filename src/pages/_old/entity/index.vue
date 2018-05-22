<template>
  <vx-container title="Lembaga">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">
      <div class="table-page">
        <div class="ks-tables">
          <div class="ks-header">
            <div class="ks-search input-icon icon-right icon icon-lg">
              <input type="text" v-model="table.query" class="form-control" placeholder="Cari">
              <span class="icon-addon"><span class="la la-search"></span></span>
            </div>
            <div class="ks-search">
              <select name="user_group" class="form-control white-bg" v-model="stEntity" @change="statusEntity(stEntity)">
                <option value="" selected>Semua Tipe Entitas</option>
                <option value="koperasi">koperasi</option>
                <option value="perusahaan">perusahaan</option>
                <option value="organisasi">organisasi</option>
                <option value="pemilik_kapal">pemilik kapal</option>
              </select>
            </div>
            <div class="ks-filters">
              <div class="btn-group">
                <vx-button variant="primary" to="/entity/create" block>Tambah Lembaga</vx-button>
              </div>
              <div class="btn-group">
                <vx-table-columns :columns="table.fields"></vx-table-columns>
              </div>
            </div>
          </div>
          <div class="ks-content ks-compact">
            <vx-table class="table ks-text-light ks-table-header" :items-provider="renderData" :config="table">
              <template slot="created_at" scope="item">
                {{ $moment(item.value).format('DD-MM-YYYY') }}
              </template>
              <template slot="is_active" scope="item">
                {{item.value?'Aktif':'Tidak Aktif'}}
              </template>
              <template slot="actions" scope="item">
                <router-link :to="{name: 'entity-detail', params: { id: item.item.id }}">
                  <vx-button icon="la la-bars" variant="primary" light solid outline></vx-button>
                </router-link>
                <vx-button @click="$root.$emit('show::modal','modal'+item.item.id)" v-show="item.item.is_active === 1 && isSuperAdmin" icon="la la-times" variant="danger" solid outline></vx-button>
                <vx-modal :id="'modal'+item.item.id" title="Nonakifkan Lembaga">
                  <h5 class="text-center">Apakah Anda yakin ingin menonaktifkan Lembaga atas nama ({{item.item.entity_name}}) ini?</h5>
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
    </div>
  </vx-container>
</template>
<script>
  import table from 'vx/src/mixins/table'
  import entityService from '../../vuxs/services/entity'
  import session from '../../services/session'

  export default {
    mixins: [table],
    data() {
      return {
        is_active: 0,
        table: {
          filter: {
            entity_type: ''
          },
          fields: {
            entity_name: {
              label: 'Nama Lembaga',
              sortable: true,
              visible: true,
              width: 400
            },
            created_at: {
              label: 'Tanggal Registrasi',
              sortable: true,
              visible: true
            },
            entity_type: {
              label: 'Tipe Lembaga',
              sortable: true,
              visible: true
            },
            is_active: {
              label: 'Status',
              sortable: true,
              visible: true
            },
            actions: {
              label: 'Aksi',
              visible: true,
              forceActive: true,
              width: 150
            }
          },
          searchKey: ['entity_name.icontains']
        },
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Daftar Lembaga',
          link: ''
        }],
        titleHead: 'Daftar Lembaga',
        stEntity: ''
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
      details (item) {
        alert(JSON.stringify(item))
      },
      renderData (tbl) {
        let that = this
        entityService.getEntity(this.apiParam).then(payload => {
          that.table.total = (payload.data) ? payload.total : 0
          tbl.items = (payload.data) ? payload.data : []
        })
      },
      onSubmit (id) {
        this.$store.dispatch('entity/diactive', [id])
      },
      statusEntity (stEntity) {
        this.table.filter.entity_type = stEntity
      }
    }
  }
</script>

