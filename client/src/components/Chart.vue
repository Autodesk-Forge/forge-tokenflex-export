<template>
<canvas ref="chartHolder"></canvas>
</template>
<script>
import Chart from 'chart.js'

export default {
  data () {
    return {
      chart: null,
      today: new Date().today() + ' ' + new Date().timeNow()
    }
  },
  props: ['datasets', 'labels', 'type', 'title'],
  mounted () {
    let config = {
      type: this.type,
      data: {
        datasets: this.datasets,
        labels: this.labels
      },
      options: {
        responsive: true,
        title: {
          display: !!this.title,
          text: this.title
        },
        legend: {
          display: this.type !== 'bar'
        }

      }
    }
    this.chart = new Chart(this.$refs['chartHolder'], config)
  }
}

</script>
