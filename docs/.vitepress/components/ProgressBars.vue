<template>
  <div class="progress-grid">
    <div v-for="subsystem in subsystems" :key="subsystem.id" class="stat-card">
      <div class="chip">
        <span :class="`dot dot-${subsystem.status}`"></span>
        <strong>{{ subsystem.name }}</strong>
      </div>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: subsystem.progress + '%' }"></div>
      </div>
      <div class="value">{{ subsystem.progress }}%</div>
      <div class="label">{{ subsystem.description }}</div>
    </div>
    <div class="stat-card">
      <div class="chip"><strong>Progreso Global</strong></div>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: globalProgress + '%' }"></div>
      </div>
      <div class="value">{{ globalProgress }}%</div>
      <div class="label">Progreso promedio de todos los subsistemas</div>
    </div>
  </div>
</template>

<script setup>
import { subsystems, getSubsystemProgress } from '../../.vitepress/data/subsystems.js'

const globalProgress = getSubsystemProgress()
</script>

<style scoped>
.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
</style>
