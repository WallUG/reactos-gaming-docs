<template>
  <div class="compatibility-card">
    <div class="table-controls">
      <input
        type="text"
        class="search-box"
        placeholder="Buscar juego o programa..."
        v-model="searchQuery"
      />
      <div class="filter-chips">
        <span class="chip" :class="{ active: kernelFilter === 'todos' }" @click="kernelFilter = 'todos'">Todos los núcleos</span>
        <span class="chip" :class="{ active: kernelFilter === 'NT 6.x' }" @click="kernelFilter = 'NT 6.x'">NT 6.x</span>
        <span class="chip" :class="{ active: kernelFilter === 'NT 5.2' }" @click="kernelFilter = 'NT 5.2'">NT 5.2</span>
        <span class="chip" :class="{ active: kernelFilter === 'Ambos' }" @click="kernelFilter = 'Ambos'">Ambos</span>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Programa / Juego</th>
          <th>Versión</th>
          <th>Estado</th>
          <th>Núcleo</th>
          <th>FPS</th>
          <th>Notas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.name">
          <td><strong>{{ item.name }}</strong></td>
          <td>{{ item.version }}</td>
          <td>
            <span class="badge" :class="getStatusBadge(item.status).class">
              {{ getStatusBadge(item.status).label }}
            </span>
          </td>
          <td>{{ item.kernel }}</td>
          <td>{{ item.fps }}</td>
          <td>{{ item.notes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { compatibility, getStatusBadge } from '../../.vitepress/data/compatibility.js'

const searchQuery = ref('')
const kernelFilter = ref('todos')

const filteredItems = computed(() => {
  return compatibility.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesKernel = kernelFilter.value === 'todos' || item.kernel === kernelFilter.value
    return matchesSearch && matchesKernel
  })
})
</script>

<style scoped>
.compatibility-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
}
.table-controls {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #0f172a;
  border-bottom: 1px solid #334155;
  flex-wrap: wrap;
  align-items: center;
}
.filter-chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.chip.active {
  background: #38bdf8;
  color: #0f172a;
  border-color: #38bdf8;
}
</style>
