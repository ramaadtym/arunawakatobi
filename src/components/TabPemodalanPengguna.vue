 <template>
 	<vx-card>
 		<h5 slot="header" class="my-0">
 			Peminjaman
 		</h5>
          <vx-table class="table ks-text-light ks-table-header" :items-provider="renderData" :config="table">
            <template slot="name" scope="item">
              {{item.item.nama}}
            </template>
            <template slot="entity" scope="item">
              {{item.item.umur}}
            </template>
            <template slot="entity" scope="item">
              {{item.item.umur}}
            </template>
            <template slot="entity" scope="item">
              {{item.item.umur}}
            </template>
            <template slot="entity" scope="item">
              {{item.item.umur}}
            </template>
          </vx-table>
 	</vx-card>
 </template>
 <script>
 export default {
   data () {
     return {
       dummy_data: [
         {
           tipe_pemodalan: 'Bagi hasil',
           tipe_pengembalian: 'Bulanan',
           besar_pemodalan: 2000,
           keperluan: 'Modal melaut',
           lama_waktu: '4 Bulan',
           penghasilan: 1000 + ' / Bulan'
         },
         {
           tipe_pemodalan: 'Bunga',
           tipe_pengembalian: 'Tahunan',
           besar_pemodalan: 40000,
           keperluan: 'Modal produksi tambak',
           lama_waktu: '3 Bulan',
           penghasilan: 23
         }
       ],
       dummy_total: 2,
       table: {
         filter: {
           'entity.entity_type': '',
           'entity.entity_name': ''
         },
         fields: {
           tipe_pemodalan: {
             label: 'Tipe Pemodalan',
             sortable: true,
             visible: true
           },
           tipe_pengembalian: {
             label: 'Tipe Pengembalian',
             sortable: true,
             visible: true
           },
           besar_pemodalan: {
             label: 'Besar Pemodalan',
             sortable: true,
             visible: true
           },
           keperluan: {
             label: 'Keperluan',
             sortable: true,
             visible: true
           },
           lama_waktu: {
             label: 'Lama Waktu',
             sortable: true,
             visible: true
           },
           penghasilan: {
             label: 'Penghasilan',
             sortable: true,
             visible: true
           }
         }
       }
     }
   },
   methods: {
     renderData (tbl) {
       this.table.total = (this.dummy_data) ? this.dummy_total : 0
       tbl.items = (this.dummy_data) ? this.dummy_data : []
     }
   }
 }
 </script>
