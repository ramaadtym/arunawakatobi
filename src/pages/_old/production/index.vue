<template>
  <vx-container title="Produksi">
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
              <select name="user_group" class="form-control white-bg" v-model="fishType" @change="filterType(fishType)">
                <option value="" selected>Semua Tipe</option>
                <option value="budidaya">budidaya</option>
                <option value="tangkap">tangkap</option>
              </select>
            </div>
            <vx-table-columns :columns="table.fields"></vx-table-columns>
          </div>
          <div class="ks-content ks-compact">
            <vx-table class="table ks-text-light ks-table-header" :items-provider="renderData" :config="table">
              <template slot="quantity" scope="item">
                {{item.value}} Kg
              </template>
              <template slot="price" scope="item">
                Rp {{item.value}}
              </template>
              <template slot="production_date" scope="item">
                {{ $moment(item.value).format('DD-MM-YYYY') }}
              </template>
              <template slot="actions" scope="item">
                <vx-button @click="$root.$emit('show::modal','modal'+item.item.id)" icon="la la-bars" variant="primary" light solid outline></vx-button>
                <vx-modal :id="'modal'+item.item.id" title="Detail Produksi">
                  <form>

                    <div class="row">
                      <div class="col-sm-12 production-image">
                        <img v-if="item.item.photo === ''" src="https://s3-ap-southeast-1.amazonaws.com/commonstorage-ap/fish/default.png" alt="foto komoditas">
                        <img v-else :src="item.item.photo" width="100%" alt="" onerror="this.src='https://s3-ap-southeast-1.amazonaws.com/commonstorage-ap/fish/default.png'">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-xs">Nama</label>
                      <div class="col-sm-9">
                        <p class="form-control">{{item.item.commodity}}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-xs">Tipe Ikan</label>
                      <div class="col-sm-9">
                        <p class="form-control">{{item.item.production_type}}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-xs">Tanggal Dimasukkan</label>
                      <div class="col-sm-9">
                        <p class="form-control">{{$moment(item.item.production_date).format('DD-MM-YYYY')}}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-xs">Ukuran Ikan</label>
                      <div class="col-sm-9">
                        <p class="form-control">{{item.item.size}} {{item.item.size_type}}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-xs">Harga/Kg</label>
                      <div class="col-sm-9">
                        <p class="form-control">Rp {{item.item.price}}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-xs">Nama Nelayan</label>
                      <div class="col-sm-9">
                        <p class="form-control">{{item.item.fisher_data.name}}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-xs">Nama Kapal</label>
                      <div class="col-sm-9">
                        <p class="form-control">{{item.item.fisher_data.ship}}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-xs">Alat Kapal</label>
                      <div class="col-sm-9">
                        <p class="form-control">{{item.item.fisher_data.tool}}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-xs">Kuantitas/Kg</label>
                      <div class="col-sm-9">
                        <p class="form-control">{{item.item.quantity}} Kg</p>
                      </div>
                    </div>
                  </form>
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
  import productionService from '../../vuxs/services/production'
  import session from '../../services/session'

  export default {
    mixins: [table],
    data () {
      var data = session.me().user_group_id === '65536'
      return {
        table: {
          filter: {
            production_type: ''
          },
          fields: {
            commodity: {
              label: 'Nama Komoditas',
              sortable: true,
              visible: true,
              width: 200
            },
            entity: {
              label: 'Nama Lembaga',
              sortable: false,
              visible: true
            },
            production_type: {
              label: 'Jenis Ikan',
              visible: true,
              sortable: false
            },
            production_date: {
              label: 'Tanggal',
              visible: true
            },
            quantity: {
              label: 'Kuantitas',
              visible: true
            },
            area: {
              label: 'Daerah Tangkap',
              visible: data
            },
            price: {
              label: 'Harga',
              visible: !data
            },
            actions: {
              label: 'Aksi',
              visible: true,
              forceActive: true
            }
          },
          searchKey: ['commodity']
        },
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Daftar Produksi',
          link: ''
        }],
        titleHead: 'Daftar Produksi',
        fishType: ''
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
      details (item) {
        alert(JSON.stringify(item))
      },
      imageExists (imageUrl) {
        var http = new XMLHttpRequest()
        http.open('HEAD', imageUrl, false)
        http.send()
        return http.status !== 404
      },
      renderData (tbl) {
        let that = this
        productionService.getAll(this.apiParam).then(payload => {
          that.table.total = (payload.data) ? payload.total : 0
          tbl.items = (payload.data) ? payload.data : []
        })
      },
      filterType (fishType) {
        this.table.filter.production_type = fishType
      }
    }
  }
</script>
<style>
  .production-image img {
    display: block;
    width: 80%;
    margin: 0 auto;
  }
</style>
