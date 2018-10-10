<template>
  <v-app id="forge">

      <Header />

    <Content />
    <Footer />

    <v-dialog
      v-model="dialog"
      max-width="80%"
    >
      <v-card>
        <v-card-title class="grey lighten-3">{{dialogHeader}}</v-card-title>

        <v-card-text>
          {{dialogMessage}}
        </v-card-text>

      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import config from './config'

import Content from '@/components/Content.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

Date.prototype.today = function () {
  return ((this.getDate() < 10) ? '0' : '') + this.getDate() + '/' + (((this.getMonth() + 1) < 10) ? '0' : '') + (this.getMonth() + 1) + '/' + this.getFullYear()
}
Date.prototype.timeNow = function () {
  return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':' + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':' + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds()
}

export default {
  beforeMount () {
    // detect if query param isUserLoggedIn is true
    if (this.$route.query.isUserLoggedIn) {
      this.setUserData()
      this.$store.state.isUserLoggedIn = true
    }
  },
  components: {
    Content, Footer, Header
  },
  data: () => ({
    dialog: false,
    dialogHeader: '',
    dialogMessage: ''
  }),
  methods: {
    async setUserData () {
      this.$store.dispatch('setLoading', true)
      await this.$axios({
        method: 'GET',
        url: new URL('/api/user/profile', config.koahost).href
      })
        .then(response => {
          if (response.data) {
            this.$store.dispatch('setUserFullName', `${response.data.firstName} ${response.data.lastName}`)
            this.$store.dispatch('setUserPicture', response.data.profileImages.sizeX40)
            this.$store.dispatch('setUser', {
              fullName: this.$store.state.user.fullName,
              picture: this.$store.state.user.picture
            })
          }
        })
        .catch(err => {
          this.dialog = true
          this.dialogHeader = 'Error'
          this.dialogMessage = err
        }).finally(() => this.$store.dispatch('setLoading', false))
    }
  },
  name: 'App'
}
</script>
