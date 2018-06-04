<template>
	<vx-container :title="'Detail User'">
		<vx-breadcrumb :items="breadcrumbLink"></vx-breadcrumb>
		<div class="container-fluid ks-rows-section">
			<div class="row justify-content-md-center">
				 <div class="col-lg-8">
				 	<vx-tabs small position="left" ref="tabs" v-model="tabIndex">
				 	  <vx-tab title="Data User">
				 	  	<label>Alamat</label>
				 	  	<p>{{dataUser.address}}</p>
				 	  	<label>UPTD</label>
				 	  	<p>{{dataUser.entity_name}} / {{dataUser.entity_type}}</p>
				 	  </vx-tab>
				 	</vx-tabs>
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
      // var data = session.me().user_group_id === '65536'
      return {
        uptd: null,
        titleHead: 'Detail User',
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
      dataUser () {
        return this.uptd
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
            text: 'Detail user'
          }
        ]
      }
    },
    methods: {
      details (item) {
        alert(JSON.stringify(item))
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
      this.fetchDetailUPTD(0)
    }
  }
</script>
