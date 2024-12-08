<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { faker } from '@faker-js/faker/locale/it'
import { ItFaker } from '../../../../src/lib'

const itFaker = new ItFaker()
const examples = ref([
  {
    title: "Persona",
    data: {} as any
  },
  {
    title: "Località",
    data: {} as any
  },
  {
    title: "Codice Fiscale",
    data: {} as any
  }
])

function generateData() {
  examples.value = [
    {
      title: "👤 Persona Completa",
      data: itFaker.person.italianPerson()
    },
    {
      title: "📍 Città & Provincia",
      data: itFaker.location.italianCity()
    },
    {
      title: "🏢 Indirizzo Completo",
      data: itFaker.location.italianAddress()
    }
  ]
}

onMounted(() => {
  generateData()
})
</script>

<template>
  <div class="live-examples">
    <button @click="generateData" class="regenerate-btn">
      🔄 Rigenera Esempi
    </button>
    <div class="examples-grid">
      <div v-for="example in examples" :key="example.title" class="example-card">
        <h3>{{ example.title }}</h3>
        <pre>{{ JSON.stringify(example.data, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-examples {
  padding: 2rem 0;
}

.regenerate-btn {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.regenerate-btn:hover {
  background: var(--vp-c-brand-dark);
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 0 auto;
}

.example-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
}

.example-card h3 {
  margin-top: 0;
  color: var(--vp-c-brand);
  font-size: 1.1rem;
}

.example-card pre {
  margin: 0;
  font-size: 0.85rem;
  white-space: pre-wrap;
}
</style>