<template>
  <div class="chart-card">
    <h3>{{ title }}</h3>
    <canvas ref="canvasRef" :height="200"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart } from 'chart.js'
import { subsystems } from '../../.vitepress/data/subsystems.js'

const props = defineProps({
  title: { type: String, default: 'Progreso por Subsistema' }
})

const canvasRef = ref(null)
let chart = null

const labels = subsystems.map(s => s.name)
const data = subsystems.map(s => s.progress)
const colors = subsystems.map(s => {
  if (s.status === 'implementado') return '#22c55e'
  if (s.status === 'parcial') return '#f59e0b'
  if (s.status === 'faltante') return '#ef4444'
  return '#38bdf8'
})

onMounted(() => {
  initChart()
})

watch(() => data, () => {
  if (chart) {
    chart.data.datasets[0].data = data
    chart.data.datasets[0].backgroundColor = colors
    chart.update()
  }
})

function initChart() {
  if (!canvasRef.value) return
  chart = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Progreso (%)',
        data: data,
        backgroundColor: colors,
        borderRadius: 6,
        barThickness: 24
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e293b',
          titleColor: '#e2e8f0',
          bodyColor: '#cbd5e1',
          borderColor: '#334155',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: '#334155' },
          ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono' } }
        },
        x: {
          grid: { display: false },
          ticks: {
            color: '#94a3b8',
            font: { family: 'JetBrains Mono', size: 11 },
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  })
}
</script>

<style scoped>
.chart-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
.chart-card h3 {
  margin-top: 0;
  color: #38bdf8;
  font-size: 1.1rem;
}
</style>
