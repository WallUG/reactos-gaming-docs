<template>
  <div class="system-map">
    <div class="metrics-panel">
      <h2>Métricas Globales</h2>
      <div class="donut-container">
        <canvas ref="donutCanvas" :height="260"></canvas>
      </div>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value">{{ globalStats.totalModules }}</div>
          <div class="metric-label">Módulos mapeados</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">{{ globalStats.globalProgress }}%</div>
          <div class="metric-label">Completitud global</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">{{ globalStats.dualKernel }}</div>
          <div class="metric-label">Dual Kernel</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">{{ globalStats.smp }}</div>
          <div class="metric-label">SMP / UP</div>
        </div>
      </div>
      <div class="filters">
        <button
          v-for="filter in filters"
          :key="filter.id"
          class="filter-btn"
          :class="{ active: activeFilter === filter.id }"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </button>
        <input
          type="text"
          class="search-box"
          placeholder="Buscar módulo..."
          v-model="searchQuery"
        />
      </div>
    </div>

    <div class="map-container">
      <div
        v-for="layer in systemMapLayers"
        :key="layer.id"
        class="layer-card"
      >
        <div class="layer-header">{{ layer.name }}</div>
        <div class="layer-modules">
          <a
            v-for="module in filteredModules(layer)"
            :key="module.id"
            class="module-card"
            :class="`module-${getStatusInfo(module.status).class.split('-')[0]}`"
            :href="withBase(module.link)"
          >
            <div class="module-header">
              <span class="module-name">{{ module.name }}</span>
              <span class="module-badge" :class="getStatusInfo(module.status).class">
                {{ getStatusInfo(module.status).label }}
              </span>
            </div>
            <div class="module-progress">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: module.progress + '%', background: getStatusColor(module.status) }"
                ></div>
              </div>
              <span class="module-pct">{{ module.progress }}%</span>
            </div>
            <div class="module-kernel">{{ module.kernel }}</div>
            <div class="module-summary">{{ module.summary }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { withBase } from 'vitepress'
import { Chart } from 'chart.js'
import { systemMapLayers, globalStats, getStatusInfo } from '../../.vitepress/data/systemMap.js'

const filters = [
  { id: 'todos', label: 'Todos' },
  { id: 'implementado', label: 'Implementados' },
  { id: 'parcial', label: 'Parciales' },
  { id: 'faltante', label: 'Faltantes' },
  { id: 'NT 6.x', label: 'NT 6.x' }
]

const activeFilter = ref('todos')
const searchQuery = ref('')
const donutCanvas = ref(null)
let donutChart = null

const getStatusColor = (status) => {
  if (status === 'implementado') return '#22c55e'
  if (status === 'parcial') return '#f59e0b'
  if (status === 'faltante') return '#ef4444'
  return '#38bdf8'
}

const filteredModules = (layer) => {
  return layer.modules.filter(m => {
    const matchesFilter = activeFilter.value === 'todos' ||
      activeFilter.value === m.status ||
      activeFilter.value === m.kernel
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesFilter && matchesSearch
  })
}

onMounted(() => {
  initDonutChart()
})

watch([activeFilter, searchQuery], () => {
  updateDonutChart()
})

function initDonutChart() {
  if (!donutCanvas.value) return
  const ctx = donutCanvas.value.getContext('2d')
  const values = [
    globalStats.implemented,
    globalStats.partial,
    globalStats.missing
  ]
  const colors = ['#22c55e', '#f59e0b', '#ef4444']
  donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Implementado', 'Parcial', 'Faltante'],
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderColor: '#0f172a',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 12 } }
        },
        tooltip: {
          backgroundColor: '#1e293b',
          titleColor: '#e2e8f0',
          bodyColor: '#cbd5e1',
          borderColor: '#334155',
          borderWidth: 1
        }
      }
    }
  })
}

function updateDonutChart() {
  if (!donutChart) return
  let total = 0
  let implemented = 0
  let partial = 0
  let missing = 0
  systemMapLayers.forEach(layer => {
    layer.modules.forEach(m => {
      const matchesFilter = activeFilter.value === 'todos' ||
        activeFilter.value === m.status ||
        activeFilter.value === m.kernel
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      if (matchesFilter && matchesSearch) {
        total++
        if (m.status === 'implementado') implemented++
        else if (m.status === 'parcial') partial++
        else missing++
      }
    })
  })
  donutChart.data.datasets[0].data = [implemented, partial, missing]
  donutChart.update()
}
</script>

<style scoped>
.system-map {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.metrics-panel {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.metrics-panel h2 {
  margin-top: 0;
  color: #38bdf8;
  font-size: 1.25rem;
}

.donut-container {
  width: 260px;
  height: 260px;
  margin: 1rem auto;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.metric-card {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #38bdf8;
  font-family: 'JetBrains Mono', monospace;
}

.metric-label {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-top: 0.25rem;
}

.filters {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-btn {
  background: #0f172a;
  border: 1px solid #334155;
  color: #cbd5e1;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  cursor: pointer;
}

.filter-btn.active {
  background: #38bdf8;
  color: #0f172a;
  border-color: #38bdf8;
}

.search-box {
  flex: 1;
  min-width: 200px;
  padding: 0.5rem 1rem;
  border: 1px solid #334155;
  border-radius: 0.375rem;
  background: #020617;
  color: #e2e8f0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
}

.map-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.layer-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.layer-header {
  background: #0f172a;
  border-bottom: 1px solid #334155;
  padding: 0.75rem 1rem;
  color: #38bdf8;
  font-weight: 600;
  font-size: 0.95rem;
}

.layer-modules {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.module-card {
  display: block;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 0.375rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: border-color 0.2s;
  text-decoration: none;
}

.module-card:hover {
  border-color: #38bdf8;
}

.module-card.module-implementado {
  border-left: 3px solid #22c55e;
}
.module-card.module-parcial {
  border-left: 3px solid #f59e0b;
}
.module-card.module-faltante {
  border-left: 3px solid #ef4444;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.module-name {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  color: #e2e8f0;
  font-size: 0.9rem;
}

.module-badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
}

.module-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.progress-bar {
  flex: 1;
  height: 10px;
  background: #334155;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.5s ease;
}

.module-pct {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #94a3b8;
}

.module-kernel {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.module-summary {
  font-size: 0.8rem;
  color: #94a3b8;
  line-height: 1.4;
}
</style>
