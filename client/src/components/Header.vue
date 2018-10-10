<template>
  <v-toolbar color="indigo" dark fixed app>

   <v-avatar>
          <img src="../assets/logo-small.png" alt="Forge">
  </v-avatar>
   <v-toolbar-title class="white--text hidden-sm-and-down">Consumption Report</v-toolbar-title>

   <v-spacer></v-spacer>

   <v-btn color="blue" :icon="$vuetify.breakpoint.xs" :href="githubRepoUrl">
     <v-icon>code</v-icon><span class="hidden-md-and-down">Source</span>
   </v-btn>
   <v-btn color="blue" :icon="$vuetify.breakpoint.xs" @click="login" v-if="!this.$store.state.isUserLoggedIn">

     <v-icon>person</v-icon><span class="hidden-md-and-down">Login</span>
   </v-btn>

   <v-btn color="blue" :icon="$vuetify.breakpoint.xs" @click="logout" v-if="this.$store.state.isUserLoggedIn">
   <v-icon>power_settings_new</v-icon><span class="hidden-md-and-down">Logout</span>
   </v-btn>
   <span v-if="this.$store.state.isUserLoggedIn">
      <v-progress-circular
      indeterminate
      color="primary"
      v-if="this.$store.state.loading"
      ></v-progress-circular>
      <v-avatar :title="this.$store.state.user.fullName" v-if="!this.$store.state.loading">
        <img
          :src="this.$store.state.user.picture"
        >
      </v-avatar>
      <strong class="pl-1 hidden-sm-and-down" v-html="this.$store.state.user.fullName"></strong>
    </span>
 </v-toolbar>
</template>

<script>
import config from './../config'

export default {
  data: () => (
    {
      githubRepoUrl: config.githubRepoUrl
    }),
  methods: {
    displayContracts () {
      this.$router.push('/contracts?isUserLoggedIn=true')
      this.$router.go()
    },

    login () {
      window.location.href = new URL('/api/oauth/authenticate', config.koahost).href
    },
    async logout () {
      const response = await this.$axios.get(
        new URL('/api/oauth/logout', config.koahost).href
      )
      if (response.status === 200) {
        this.$store.state.isUserLoggedIn = false
        this.$store.dispatch('setUser', null)
        window.open(
          'https://accounts-staging.autodesk.com/Authentication/LogOut',
          '_blank'
        )
        window.location.href = '/'
      }
    }
  }
}

</script>
