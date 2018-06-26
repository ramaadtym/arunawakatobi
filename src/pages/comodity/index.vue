<template>
  <vx-container title="Komoditas">
    <vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
    <div class="container-fluid ks-rows-section">
      <div class="table-page">
        <div class="ks-tables">
          <div class="ks-header">
            <div class="ks-search input-icon icon-right icon icon-lg">
              <input id="input-group-icon-text" v-model="table.query" type="text" class="form-control" placeholder="Cari">
              <span class="icon-addon"><span class="la la-search"></span></span>
            </div>
            <div class="ks-filters">
              <div class="btn-group">
                <vx-button variant="primary" to="/comodity/create" block>Tambah Komoditas</vx-button>
              </div>
              <div class="btn-group">
                <vx-table-columns :columns="table.fields"></vx-table-columns>
              </div>
            </div>
          </div>
          <div class="ks-content ks-compact">
            <vx-table class="table ks-text-light ks-table-header" :items-provider="renderData" :config="table">
              <template slot="comodity_name" scope="item">
                <span v-if="item.item.commodity_name">{{ item.item.commodity_name }}</span>
              </template>
              <template slot="district_name" scope="item">
                <span v-if="item.item.commodity_alias">{{ item.item.description }}</span>
              </template>
              <template slot="url_image" scope="item">
                <img style="width:13rem;" v-if="item.item.image" :src="item.item.image"/>
              </template>
              <template slot="actions" scope="item">
                <!-- <router-link :to="{name: 'detail-comodity', params: {id: item.item.id}}">
                  <vx-button icon="la la-bars" variant="primary" light solid outline></vx-button>
                </router-link> -->
                  <vx-button icon="la la-trash" v-on:click="comodityDel(item.item.id,item.item.image)" variant="danger" light solid outline></vx-button>
                  <router-link :to="{name: 'edit-comodity', params: { id: item.item.id }}">
                  <vx-button icon="la la-edit" variant="primary" primary solid outline></vx-button>
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
  import vAvatar from 'vue-avatar/src/Avatar.vue'
  import table from 'vx/src/mixins/table'
  import comodityService from '../../vuxs/services/comodity'
  import cloudinaryService from '../../vuxs/services/cloudinary'
  export default {
    mixins: [table],
    data () {
      return {
        table: {
          fields: {
            comodity_name: {
              label: 'Nama Komoditas',
              sortable: true,
              visible: true
            },
            district_name: {
              label: 'Deskripsi',
              sortable: false,
              alias: 'commodity_alias',
              visible: true
            },
            url_image: {
              label: 'Foto',
              alias: 'image',
              sortable: true,
              width: 50,
              visible: true
            },
            actions: {
              label: 'Aksi',
              width: 200,
              visible: true,
              forceActive: true
            }
          },
          searchKey: ['commodity_name.icontains']
        },
        breadcrumbLink: [{
          text: 'Dashboard',
          link: '/'
        }, {
          text: 'Daftar Komoditas',
          link: ''
        }],
        titleHead: 'Daftar Komoditas'
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
      details (item) {
        alert(JSON.stringify(item))
      },
      comodityDel(id, publicId) {
        var parsedPublicId = publicId.match(/\w+.jpg+/)[0].split('.')[0]
        console.log(parsedPublicId)
        cloudinaryService.destroy(parsedPublicId).then(function(res) {
          console.log(res)
          if (res.result === 'ok' || res.result === 'not found') {
            comodityService.deleteComodity(id).then(function(res) {
              location.reload()
            })
          }
        })
      },
      renderData (tbl) {
      //   {
      //     "status": "success",
      //     "data": [
      //         {
      //             "id": "262144",
      //             "commodity_name": "Cakalang",
      //             "commodity_size": 0,
      //             "size_type": "",
      //             "image": "",
      //             "description": "Ikan Cakalang (Katsuwonus pelamis) adalah ikan berukuran sedang dari familia Skombride (tuna).",
      //             "created_at": "2017-12-14T07:13:17Z",
      //             "updated_at": "2017-12-14T07:13:17Z",
      //             "commodity_alias": [
      //                 {
      //                     "id": "327680",
      //                     "commodity": "262144",
      //                     "alias_name": "Skipjack Tuna",
      //                     "description": "",
      //                     "is_default": 0,
      //                     "created_at": "2017-12-14T07:18:07Z",
      //                     "updated_at": "2017-12-14T07:18:07Z"
      //                 }
      //             ]
      //         }
      //     ],
      //     "total": 1
      // }
        let that = this
        comodityService.getComodity(this.apiParam).then(payload => {
          console.log(this.apiParam)
          console.log(payload, '<<< payload')
          that.table.total = (payload.data) ? payload.total : 0
          tbl.items = (payload.data) ? payload.data : []
        })
      }
    }

  }
</script>

