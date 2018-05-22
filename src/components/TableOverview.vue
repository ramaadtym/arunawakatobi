<template>
  <div class="table-overview">
    <div class="filters">
      <label>Filter</label>
      <el-select class="select-type"
        v-model="filterType"
        filterable
        placeholder="Filter">
        <el-option
          v-for="filter in filterTypeOptions"
          :key="filter.value"
          :label="filter.label"
          :value="filter.value">
        </el-option>
      </el-select>

      <!-- Chart Commodity Filters -->
      <div v-if="filterType === 'commodity'" class="filter-options">
        <el-select
          v-model="filter.id_commodity"
          filterable
          remote
          placeholder="Pilih Komoditas"
          :remote-method="fetchOptionsCommodity"
          :fetchingOptionsCommodity="fetchingOptionsCommodity">
          <el-option
            v-for="opt in optionsCommodity"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value">
          </el-option>
        </el-select>
      </div>

      <!-- Chart Entity Filters -->
      <div v-if="filterType === 'entity'" class="filter-options">
        <el-select
          v-model="filter.id_entity"
          filterable
          remote
          placeholder="Pilih Lembaga"
          :remote-method="fetchOptionsEntity"
          :fetchingOptionsEntity="fetchingOptionsEntity">
          <el-option
            v-for="opt in optionsEntity"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="ks-content ks-compact">
      <vx-table class="table ks-text-light ks-table-header" :items-provider="renderData" :config="table">
        <template slot="alias" scope="item">
          <span v-if="item.item.commodity_alias">{{ item.item.commodity_alias[0].alias_name }}</span>
        </template>
      </vx-table>
      <div style="padding: 20px 20px;">
        <vx-pagination :config="table" v-model="table.currentPage" extended></vx-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import table from 'vx/src/mixins/table'
import comodityService from '../vuxs/services/comodity'
import entityService from '../vuxs/services/entity'

export default {
  name: 'table-overview',
  mixins: [table],
  data () {
    return {
      filterType: '',
      filterTypeOptions: [
        {value: '', label: '- Tanpa Filter -'},
        {value: 'commodity', label: 'Komoditas'},
        {value: 'entity', label: 'Lembaga'}
      ],
      filter: {
        id_commodity: '',
        id_entity: ''
      },
      optionsCommodity: [],
      optionsEntity: [],
      table: {
        perPage: 10,
        fields: {
          commodity_name: {
            label: 'Komoditas',
            sortable: true,
            visible: true
          },
          entity_name: {
            label: 'Lembaga',
            sortable: true,
            visible: true
          },
          price_avg: {
            label: 'Harga',
            sortable: true,
            visible: true
          }
        },
        searchKey: ['commodity_name.icontains']
      }
    }
  },
  methods: {
    renderData (tbl) {
      comodityService.getComodity(this.apiParam).then(payload => {
        this.table.total = (payload.data) ? payload.total : 0
        tbl.items = (payload.data) ? payload.data : []
      })
    },
    fetchOptionsCommodity (query) {
      if (query !== '') {
        this.fetchingOptionsCommodity = true
        comodityService.getComodity({conditions: `Or.commodity_name.icontains:${query}`}).then(payload => {
          this.fetchingOptionsCommodity = true
          this.optionsCommodity = (payload.data || []).map(comodity => {
            return {
              value: comodity.commodity_name,
              label: comodity.commodity_name
            }
          })
        })
      } else {
        this.optionsCommodity = []
      }
    },
    fetchOptionsEntity (query) {
      if (query !== '') {
        this.fetchingOptionsEntity = true
        entityService.getEntity({
          conditions: `Or.entity_name.icontains:${query}`
        }).then(payload => {
          this.fetchingOptionsEntity = false
          this.optionsEntity = (payload.data || []).map(entity => {
            return {
              value: entity.id,
              label: entity.entity_name
            }
          })
        })
      } else {
        this.optionsEntity = []
      }
    }
  }
}
</script>

<style>
.filters {
  padding: 15px;
}

.filter-options {
  display: inline-block;
  margin-left: 15px;
}
</style>
