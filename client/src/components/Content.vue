<template>
  <v-content>

      <v-dialog
        v-model="dialog"
        max-width="80%"
      >
        <v-card v-bind:style="(dialogChartOpts||{}).styleObject">
          <v-card-title v-if="!dialogChartOpts" class="grey lighten-3" >{{dialogHeader}}</v-card-title>

          <v-card-text v-if="!dialogChartOpts&&!dialogGmapOpts">
            {{dialogMessage}}
          </v-card-text>
          <v-container v-if="dialogChartOpts">
          <Chart :datasets="dialogChartOpts.datasets" :type="dialogChartOpts.type" :labels="dialogChartOpts.labels" :title="dialogChartOpts.title" :styleObject="dialogChartOpts.chartStyleObject"  />
          <br/>
        </v-container>

        <gmap-map v-if="dialogGmapOpts" :center="dialogGmapOpts.markers[0].position" :zoom="zoom" style="width:100%;height:80vh" :mapTypeControl="false">
            <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
              <div v-html="infoContent"></div>
            </gmap-info-window>
            <gmap-marker :key="index" v-for="(m, index) in dialogGmapOpts.markers" :title="m.title" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,index)" ></gmap-marker>
          </gmap-map>

        </v-card>
      </v-dialog>

    <v-container fluid grid-list-md >
      <v-card>

          <v-toolbar color="white" flat>

            <v-toolbar-title class="grey--text text--darken-4">Contracts</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn :disabled="!!!items.length" @click="exportContracts">Export</v-btn>
            <v-btn icon light>
           <v-switch v-model="showContract"></v-switch>
         </v-btn>
          </v-toolbar>

      <v-progress-linear :indeterminate="true" v-if="this.$store.state.loading.contracts"></v-progress-linear>

  <v-container fluid grid-list-md v-if="!this.$store.state.loading.contracts&&showContract" transition="slide-y-transition" >
    <v-layout row wrap>
      <v-flex xs4>
        <v-card  hover class='pa-1'>
            <h3 class="text-xs-center">
              Contract Count
            </h3>
            <h1 class="text-xs-center">
              <animated-number
              :value="contractCount"
              :duration="300"
              />
            </h1>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card  hover class='pa-1'>
          <h3  class="text-xs-center">
            Length in Days
          </h3>
          <h1 class="text-xs-center">
          <animated-number
          :value="contractLength"
          :duration="300"
          />
          </h1>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card hover class='pa-1'>
          <h3 class="text-xs-center">
              Average Days
          </h3>
          <h1 class="text-xs-center">
          <animated-number
          :value="averageLength"
          :duration="300"
          />
          </h1>
        </v-card>
      </v-flex>
    </v-layout>
     <v-divider class='ma-3'></v-divider>
      <v-data-iterator ref="contractIt" :items="items" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" content-tag="v-layout" hide-actions row wrap>
        <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3 >
          <v-card raised hover v-on:click.native="showContractStats(props.item.contractNumber, true)">
            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn @click.stop="displayMap(props.item, props.index)">{{props.item.showMap||props.item.showLoading?'info':'map view'}}</v-btn>
               <v-btn @click.stop="showDialogMap(props.item)" v-if="props.item.showMap&&!props.item.showLoading">enlarge</v-btn>
            </v-card-actions>
            <v-divider></v-divider>
            <v-list  v-if="!props.item.showMap">
              <v-list-tile>
                <v-list-tile-content>Contract Number:</v-list-tile-content>
              <v-list-tile-content class="align-end">  {{ props.item.contractNumber }} </v-list-tile-content>
            </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Contract Name:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.contractName }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Contract Start Date:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.contractStartDate }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Contract End Date:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.contractEndDate }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Is Active:</v-list-tile-content>
                <v-list-tile-content class="align-end"><v-checkbox v-model="props.item.isActive" v-on:click.stop=""></v-checkbox></v-list-tile-content>
              </v-list-tile>
            </v-list>
            <div @click.stop="">
              <gmap-map  :center="props.item.markers[0].position" :zoom="zoom" style="width:100%;height:255px" :mapTypeControl="false" v-if="props.item.showMap">
                <gmap-info-window :options="infoOptions" :position="props.item.infoWindowPos" :opened="props.item.infoWinOpen" @closeclick="props.item.infoWinOpen=false">
                  <div v-html="props.item.infoContent"></div>
                </gmap-info-window>
                <gmap-marker :key="index" v-for="(m, index) in props.item.markers" :title="m.title" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,index,props.item)" ></gmap-marker>
              </gmap-map>
            </div>
              <v-progress-linear :indeterminate="true" v-if="props.item.showLoading"></v-progress-linear>
          </v-card>
        </v-flex>

      </v-data-iterator>
</v-container>
</v-card>
    </v-container>
    <v-container fluid grid-list-md transition="slide-y-transition" ref="statsHolder" >
      <v-card>

          <v-toolbar color="white" flat>

            <v-toolbar-title class="grey--text text--darken-4">Statistics {{!$vuetify.breakpoint.xs&&$store.state.contractNumber?`- ${$store.state.contractNumber}`:''}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn :disabled="!!!stats.length" @click="exportStats">Export</v-btn>

            <v-btn icon light>
           <v-switch v-model="showCharts"></v-switch>
         </v-btn>
          </v-toolbar>

      <v-progress-linear :indeterminate="true" v-if="this.$store.state.loading.charts"></v-progress-linear>

  <v-container fluid grid-list-md v-if="!this.$store.state.loading.charts&&showCharts">

    <v-layout row wrap v-for="(ucr,index) in usageChartOpts" :key="index">
              <v-flex v-bind="{[$vuetify.breakpoint.xs?'xs12':($vuetify.breakpoint.sm?`xs${Math.round(12/ucr.length)*2}`:`xs${Math.round(12/ucr.length)}`)]: true}" v-for="(uc, index) in ucr"
              :key="index" >
                <v-card raised hover v-on:click.native="showDialogChart(uc)" v-bind:style="uc.styleObject">
                  <Chart :datasets="uc.datasets" :type="uc.type" :labels="uc.labels" :title="uc.title" :styleObject="uc.chartStyleObject"  />
                  <br/>
                </v-card>
              </v-flex>
            </v-layout>
  </v-container>
  </v-card>
      </v-container>
  </v-content>

</template>
<style>
.vue-map-container .gm-svpc, .vue-map-container  .gm-style-mtc {display:none!important}
</style>
<script>
import config from './../config'
import countries from './../countries.json'
import Chart from './Chart.vue'
import AnimatedNumber from 'animated-number-vue'
const groupBy = (list, keyGetter) => {
  const map = new Map()
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
}
const diffDays = (date1, date2) => {
  let dt1 = new Date(date1)
  let dt2 = new Date(date2)
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24))
}
const chartColors = ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(17,134,134)']
const shuffle = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}
const exportToCSV = (obj) => {
  let rows = [Object.keys(obj[0])]
  obj.forEach(o => rows.push(rows[0].map(k => o[k])))
  let csvContent = 'data:text/csv;charset=utf-8,'
  rows.forEach(rowArray => {
    let row = rowArray.join(',')
    csvContent += row + '\r\n'
  })
  window.open(encodeURI(csvContent))
}
export default {

  beforeMount () { if (this.$store.state.isUserLoggedIn) this.getContracts() },
  components: {
    Chart, AnimatedNumber
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.dialogChartOpts = this.dialogGmapOpts = null
        this.infoWinOpen = false
      }
    }
  },
  data: () => (
    {
      showStatsCancelSource: null,
      dialogGmapOpts: null,
      dialogChartOpts: null,
      stats: [],
      showContract: true,
      showCharts: true,
      usageChartOpts: [],
      items: [],
      center: { lat: 45.508, lng: -73.587 }, // Montreal
      currentMidx: null,
      currentPlace: null,
      infoContent: '',
      infoOptions: { // Offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPos: null,
      infoWinOpen: false,
      pagination: { rowsPerPage: 4 },
      rowsPerPageItems: [4, 8, 12],
      zoom: 12,
      dialog: false,
      dialogHeader: '',
      dialogMessage: ''
    }
  ),
  computed: {
    contractCount: function () { return this.items.length },
    contractLength: function () { return this.items.reduce((o, e) => diffDays(e.contractStartDate, e.contractEndDate) + o, 0) },
    averageLength: function () { return this.contractLength / this.items.length }
  },
  methods: {
    showDialogMap (item) {
      this.dialogGmapOpts = item
      this.dialogHeader = item.contractNumber
      this.dialog = true
    },
    showDialogChart (chartOpts) {
      this.dialogChartOpts = chartOpts
      this.dialog = true
    },
    exportContracts () {
      exportToCSV(this.items)
    },
    exportStats () {
      exportToCSV(this.stats)
    },
    showError (err) {
      this.dialog = true
      this.dialogHeader = 'Error'
      this.dialogMessage = err
    },
    async displayMap (item, index) {
      if (item.showLoading || item.showMap) {
        if (item.cancelSource) { item.cancelSource.cancel('Operation canceled due to new requests') }

        this.$set(this.items, index, Object.assign(item, { showLoading: false, showMap: false, cancelSource: null }))
        return
      }
      let children = this.$refs['contractIt'].$children[index].$children
      this.$set(this.items, index, Object.assign(item, { showLoading: true, cancelSource: this.$cancelToken.source(), infoWinOpen: false }))
      await this.$axios({
        method: 'GET',
        cancelToken: item.cancelSource.token,
        url: new URL(`/api/forge/reports/${item.contractNumber}/query`, config.koahost).href
      })
        .then(response => {
          item.cancelSource = null
          if (response.data) {
            let rows = response.data.result.rows
            let ris = []
            if (rows.length > 50) { // randomly pick 5-10 geos if greater than 50 in total
              let length = Math.floor((Math.random() * 10) + 5)
              while (length > 0) {
                let ri = Math.floor((Math.random() * rows.length) + 0)
                if (ris.indexOf(ri) < 0) {
                  ris.push(ri)
                  length--
                }
              }
            } else ris = rows.map((r, i) => i)
            this.$set(this.items, index, Object.assign(item, {
              showMap: true,
              markers: ris.map(ri => {
                let row = rows[ri]
                let cty = countries.find(c => c.name.toLowerCase().trim() === row[1].toLowerCase().trim()) || countries[Math.floor((Math.random() * (countries.length - 1)) + 0)]
                return {
                  title: cty.name,
                  position: {
                    lat: cty.latitude,
                    lng: cty.longitude
                  },
                  infoText: `Product: ${row[2]}<br/>Tokens Consumed: ${row[3]}<br/>Usage: ${Math.round(row[4])} hours`
                }
              })
            }))
            setTimeout(() => children.find((child) => child.$refs['vue-map']).$mapPromise.then(() => this.$set(this.items, index, Object.assign(item, { showLoading: false }))))
          }
        })
        .catch(err => {
          this.showError(err)
          console.error(`/api/forge/reports/${item.contractNumber}/query error`, err)
        })
    },
    async getContracts () {
      this.$store.dispatch('setLoading', { contracts: true, charts: true })
      this.$store.dispatch('setContractNumber', '')
      await this.$axios({
        method: 'GET',
        url: new URL('/api/forge/reports/contracts', config.koahost).href
      })
        .then(response => {
          if (response.data) {
            this.items = response.data
            if (response.data.length) this.showContractStats(response.data[0].contractNumber)
          }
        })
        .catch(err => {
          this.showError(err)

          console.error(`/api/forge/reports/contracts error`, err)
        })
        .finally(() => this.$store.dispatch('setLoading', { contracts: false }))
    },
    async showContractStats (contractNumber, doScrollTo) {
      if (doScrollTo)window.scroll({ top: this.$refs['statsHolder'].offsetTop - document.body.scrollTop, left: 0, behavior: 'smooth' })
      if (this.showStatsCancelSource) {
        this.showStatsCancelSource.cancel('Operation canceled due to new requests')
        this.showStatsCancelSource = null
      }
      this.$store.dispatch('setContractNumber', contractNumber)

      this.$store.dispatch('setLoading', { charts: true })
      this.showStatsCancelSource = this.$cancelToken.source()
      this.$axios({
        method: 'GET',
        url: new URL(`/api/forge/reports/summary/${contractNumber}`, config.koahost).href,
        cancelToken: this.showStatsCancelSource.token
      })
        .then(response => {
          this.showStatsCancelSource = null
          if (response.data) {
            this.stats = response.data
            let grouped = groupBy(response.data, u => u.usageCategory)
            let keys = Array.from(grouped.keys())
            let groupedByDates = groupBy(response.data, u => u.usageMonth)
            let dateValues = Array.from(groupedByDates.values())
            let dateKeys = Array.from(groupedByDates.keys())
            let rchartColors = shuffle(chartColors)
            this.usageChartOpts = [[
              {
                datasets: [
                  { data: keys.map(k => grouped.get(k).reduce((o, e) => o + e.uniqueUsers, 0)),
                    label: 'Unique Users',
                    backgroundColor: rchartColors
                  }],
                labels: keys,
                type: 'pie',
                title: 'Unique Users'
              },
              {
                datasets: [
                  { data: keys.map(k => grouped.get(k).reduce((o, e) => o + e.tokensConsumed, 0)),
                    label: keys,
                    backgroundColor: rchartColors
                  }],
                type: 'bar',
                labels: keys,
                title: 'Tokens Consumed'
              },
              {
                datasets: [
                  { data: keys.map(k => grouped.get(k).reduce((o, e) => o + Math.round(e.tokensConsumed / e.uniqueUsers), 0)),
                    label: keys,
                    backgroundColor: rchartColors
                  }],
                type: 'doughnut',
                labels: keys,
                title: 'Tokens Per User'
              }
            ], [{
              datasets: keys.map((k, i) => ({
                data: dateValues.map(v => (v.find(u => u.usageCategory === k) || {}).tokensConsumed),
                label: k,
                tension: 0,
                fill: false,
                backgroundColor: rchartColors[i],
                borderColor: rchartColors[i]
              })),
              type: 'line',
              labels: dateKeys,
              title: 'Tokens Consumed By Month',
              styleObject: {
                'overflow-y': 'scroll'

              },
              chartStyleObject: {
                'min-width': dateKeys.length * 20 + 'px'
              }
            }]]
          }
        })
        .catch(err => {
          this.showError(err)

          console.error(`/api/forge/reports/summary/${contractNumber} error`, err)
        })
        .finally(() => this.$store.dispatch('setLoading', { charts: false }))
    },
    toggleInfoWindow: function (marker, idx, item) {
      item = item || this
      item.infoWindowPos = marker.position
      item.infoContent = marker.infoText
      // Check if it is the same marker that was selected, if yes toggle
      if (item.currentMidx === idx) {
        item.infoWinOpen = !item.infoWinOpen
      } else { // If different marker set infowindow to open and reset current marker index
        item.infoWinOpen = true
        item.currentMidx = idx
      }
      if (item !== this) this.$set(this.items, this.items.findIndex((e) => e.contractNumber === item.contractNumber), item)
    }
  },
  mounted () {

  },
  name: 'Consumption-Reporting-Dashboard'
}

</script>
