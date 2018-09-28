<template>
		<canvas ref="chartHolder"></canvas>
</template>
<script>
import Chart from 'chart.js'
let randomScalingFactor = () => {
  return Math.round(Math.random() * 100)
}
let chartColors = {
    	red: 'rgb(255, 99, 132)',
    	orange: 'rgb(255, 159, 64)',
    	yellow: 'rgb(255, 205, 86)',
    	green: 'rgb(75, 192, 192)',
    	blue: 'rgb(54, 162, 235)',
    	purple: 'rgb(153, 102, 255)',
    	grey: 'rgb(201, 203, 207)'
}
export default {
  data () {
    return {
      today: new Date().today() + ' ' + new Date().timeNow()
    }
  },
  mounted () {
    let config = {
      type: 'pie',
      data: {
        datasets: [{
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
          ],
          backgroundColor: [
            chartColors.red,
            chartColors.orange,
            chartColors.yellow,
            chartColors.green,
            chartColors.blue
          ],
          label: 'Contracts'
        }],
        labels: [
          'Red',
          'Orange',
          'Yellow',
          'Green',
          'Blue'
        ]
      },
      options: {
        responsive: true
      }
    }
    new Chart(this.$refs['chartHolder'], config)
  }
}

</script>
