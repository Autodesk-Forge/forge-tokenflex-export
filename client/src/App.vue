<template>
  <v-app id="forge">
    <v-navigation-drawer v-model="drawer" fixed app>
      <NavDrawer />
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Consumption Reporting</v-toolbar-title>
    </v-toolbar>
    <Content />
    <Footer />
  </v-app>
</template>

<script>
import config from './config'

import Content from '@/components/Content.vue'
import Footer from '@/components/Footer.vue'
import NavDrawer from '@/components/NavDrawer.vue'

export default {
  beforeMount () {
    // detect if query param isUserLoggedIn is true
    if (this.$route.query.isUserLoggedIn) {
      this.setUserData()
      this.$store.state.isUserLoggedIn = true
    }
  },
  components: {
    Content, Footer, NavDrawer
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    async setUserData () {
      await this.$axios({
        method: 'GET',
        url: `${config.koahost}/api/user/profile`
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
          console.error(`\n/api/user/profile error: ${JSON.stringify(err)}\n`)
        })
    }
  },
  name: 'App'
}
</script>
