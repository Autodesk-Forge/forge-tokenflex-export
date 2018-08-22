<template>
  <v-list dense>
    <v-list-tile @click="goHome">
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile v-if="this.$store.state.isUserLoggedIn">
      <v-list-tile-action>
        <v-flex xs4 sm2 md1>
          <v-avatar size="40px" :title="this.$store.state.user.fullName">
            <img
              :src="this.$store.state.user.picture"
              alt="Avatar"
            >
          </v-avatar>
        </v-flex>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-flex no-wrap xs5 sm3>
        <strong v-html="  this.$store.state.user.fullName  "></strong>
      </v-flex>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile v-if="!this.$store.state.isUserLoggedIn" @click="login">
      <v-list-tile-action>
        <v-icon>person</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Login</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile v-if="this.$store.state.isUserLoggedIn" @click="logout">
      <v-list-tile-action>
        <v-icon>toggle_off</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Logout</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import config from './../config'

export default {
  methods: {
    goHome () {
      this.$router.push('/')
    },
    login () {
      window.location.href = `${config.koahost}/api/oauth/authenticate`
    },
    async logout () {
      const response = await this.$axios.get(
        `${config.koahost}/api/oauth/logout`
      )
      if (response.status === 200) {
        this.$store.state.isUserLoggedIn = false
        this.$store.dispatch('setUser', null)
        window.open(
          'https://accounts-staging.autodesk.com/Authentication/LogOut',
          '_blank'
        )
        this.$router.push('/')
      }
    }
  }
}

</script>
