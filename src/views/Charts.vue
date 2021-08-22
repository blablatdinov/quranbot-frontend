<template>
<div class="cards">
  <div class="number-card green">
    <p class="number-card__title">Активных</p>
    <p class="number-card__value">{{ $store.state.charts.activeSubscribers }}</p>
  </div>
  <div class="number-card red">
    <p class="number-card__title">Всего</p>
    <p class="number-card__value">{{ $store.state.charts.allSubscribers }}</p>
  </div>
  <div class="number-card blue">
    <p class="number-card__title">Время ответа на сообщения</p>
    <p class="number-card__value">{{ $store.state.charts.pingToMessage }}</p>
  </div>
</div>
<div class="row">
  <canvas id="usageChart"></canvas>
  <mass-send></mass-send>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import { Chart, registerables } from 'chart.js';
import MassSend from '@/components/MassSend.vue';

export default {
  data() {
    return { };
  },
  components: {
    MassSend,
  },
  methods: {
    ...mapActions({
      getSubscribersCount: 'charts/getSubscribersCount',
      getUsageChartData: 'charts/getUsageChartData',
    }),
    drawUsageChart() {
      Chart.register(...registerables);
      const ctx = document.getElementById('usageChart');
      /* eslint-disable no-new */
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.$store.state.charts.usageChartLabels,
          datasets: [{
            label: '# of Votes',
            data: this.$store.state.charts.usageChartValues,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            fill: false,
            tension: 0.1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      /* eslint-enable no-new */
    },
  },
  created() {
    this.getSubscribersCount();
    this.getUsageChartData();
  },
  mounted() {
    this.drawUsageChart();
  },
};
</script>

<style>
.cards {
  display: flex;
}
.number-card {
  overflow: hidden;
  border: solid 1px;
  border-radius: 5px;
  width: 250px;
  margin: 0 15px 0 0;
}
.number-card__title {
  font-size: 30px;
  border-bottom: solid 1px;
  padding: 10px;
  text-align: center;
}
.number-card__value {
  font-size: 50px;
  padding: 10px;
  text-align: center;
}
.red {
  color: #D32F2F;
  border-color: #EF9A9A;
}
.red > .number-card__title {
  background-color: #FFEBEE;
  border-bottom-color: #EF9A9A;
}
.green {
  color: green;
  border-color: #8fd879;
}
.green > .number-card__title {
  background-color: #b8f1a6;
  border-bottom-color: #8fd879;
}
.blue {
  color: green;
  border-color: #8fd879;
}
.blue > .number-card__title {
  background-color: #b8f1a6;
  border-bottom-color: #8fd879;
}
#usageChart {
  max-width: 400px;
  max-height: 400px;
}
.row {
  display: flex;
  margin: 20px 0;
}
</style>
