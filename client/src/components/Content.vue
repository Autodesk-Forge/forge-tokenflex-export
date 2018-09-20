<template>
  <v-content>
    <v-container fluid grid-list-md v-if="!this.$store.state.contractNumber">
      <v-data-iterator :items="items" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" content-tag="v-layout" hide-actions row wrap >
        <v-toolbar slot="header" class="mb-2" color="indigo darken-5" dark flat >
          <v-toolbar-title>Contracts</v-toolbar-title>
        </v-toolbar>
        <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3 >
          <v-card>
            <v-card-actions>
              <v-btn flat color="orange" @click="displayMap(props.item.contractNumber)">{{ props.item.contractNumber }}</v-btn>
            </v-card-actions>
            <v-divider></v-divider>
            <v-list dense>
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
                <v-list-tile-content class="align-end">{{ props.item.isActive }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-toolbar slot="footer" class="mt-2" color="indigo" dark dense flat >
          <v-toolbar-title class="subheading">Last report update {{ today }}</v-toolbar-title>
        </v-toolbar>
      </v-data-iterator>
    </v-container>
    <v-container fluid v-if="this.$store.state.contractNumber">
      <v-layout row justify-center align-center>
        <v-flex xs12>
          <v-card flat> 
            <br>
            <gmap-map :center="center" :zoom="zoom" style="width:100%; height: 400px;">
              <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                @click="center=m.position"
              >
              </gmap-marker>
            </gmap-map>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import config from './../config'

export default {
  beforeMount () { this.getContracts() },
  data () {
    return {
      center: { lat: 45.508, lng: -73.587 }, // Montreal
      currentPlace: null,
      items: [],
      markers: [],
      pagination: { rowsPerPage: 4 },
      rowsPerPageItems: [4, 8, 12],
      today: this.getTodayDate(),
      zoom: 12
    }
  },
  methods: {
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    displayMap (contractNumber) {
      this.$store.dispatch('setContractNumber', contractNumber)
      this.$router.push(`/auth?isUserLoggedIn=true&contractNumber=${contractNumber}`)
    },
    async getContracts () {
      await this.$axios({
        method: 'GET',
        url: `${config.koahost}/api/reports/contracts`
      })
        .then(response => {
          if (response.data) {
            this.items = response.data
          }
        })
        .catch(err => {
          console.error(`/api/reports/contracts error: ${JSON.stringify(err)}\n`)
        })
    },
    getTodayDate () {
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1 // January is 0
      let yyyy = today.getFullYear()
      if (dd < 10) {
        dd = `0${dd}`
      }
      if (mm < 10) {
        mm = `0${mm}`
      }
      today = `${mm}/${dd}/${yyyy}`
      return today
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }
      )
    },
    setPlace (place) {
      this.currentPlace = place
    }
  },
  mounted () {
    this.geolocate()
  },
  name: 'Consumption-Reporting-Dashboard'
}

</script>
