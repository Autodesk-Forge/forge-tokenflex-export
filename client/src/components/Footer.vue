<template>
  <v-footer color="indigo" fixed app flat>
    <v-avatar size="26" class="pl-1 pr-1">
           <img src="../assets/logo-company.png" alt="Autodesk">
   </v-avatar>
    <span class="white--text"><span class="hidden-sm-and-down">Autodesk</span>&copy; 2018</span>
    <v-spacer></v-spacer>
    <span class="white--text pr-1">Last updated on {{ today }}</span>
  </v-footer>
</template>

<script>
export default {
  data: () => (
    {
      today: new Date().today() + ' ' + new Date().timeNow()
    })
}

</script>
