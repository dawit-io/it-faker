<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { ItFaker } from '../../../../src/lib'
import { ItalianPersonDto } from '../../../../src/lib/types/dto/person.dto'
import { Subject } from 'rxjs'
import { finalize } from 'rxjs/operators'

const faker = new ItFaker()

const selectedGender = ref('')
const selectedProvince = ref('')
const provinceSearch = ref('')
const includeTitle = ref(false)
const minAge = ref(18)
const maxAge = ref(80)
const showProvinceDropdown = ref(false)
const personData = ref<ItalianPersonDto | null>(null)
const isLoading = ref(true)

const generateTrigger$ = new Subject<void>()

watch(selectedProvince, () => {
  provinceSearch.value = selectedProvince.value
  showProvinceDropdown.value = false
})

generateTrigger$.pipe(
  finalize(() => isLoading.value = false)
).subscribe(() => {
  isLoading.value = true
  
  const gender = faker.itPerson.parseGender(selectedGender.value)
  
  faker.itPerson.generatePerson$({ 
    gender, 
    withTitle: includeTitle.value, 
    minAge: minAge.value, 
    maxAge: maxAge.value, 
    province: provinceSearch.value 
  }).subscribe({
    next: (person) => {
      personData.value = person
    },
    error: (error) => {
      console.error('Error generating person:', error)
    },
    complete: () => {
      isLoading.value = false
    }
  })
})

const provinces = [
  'Roma', 'Milano', 'Napoli', 'Torino', 'Palermo', 
  'Genova', 'Bologna', 'Firenze', 'Bari', 'Catania', 'Bolzano'
].sort()

const filteredProvinces = computed(() => {
  if (!provinceSearch.value) return provinces
  return provinces.filter(p => 
    p.toLowerCase().includes(provinceSearch.value.toLowerCase())
  )
})

function regenerate() {
  generateTrigger$.next()
}

onMounted(() => {
  regenerate()
})

async function handleProvinceBlur() {
  await nextTick()
  if (!provinceSearch.value) {
    showProvinceDropdown.value = false
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Options Form -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm">
      <!-- Gender Selection -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Gender</label>
        <div class="flex space-x-4">
          <label class="relative flex items-center group">
            <input
              type="radio"
              v-model="selectedGender"
              value=""
              class="hidden"
            />
            <span 
              class="px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 group-hover:border-blue-400"
              :class="[selectedGender === '' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600']"
            >
              Random
            </span>
          </label>
          <label class="relative flex items-center group">
            <input
              type="radio"
              v-model="selectedGender"
              value="male"
              class="hidden"
            />
            <span 
              class="px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 group-hover:border-blue-400"
              :class="[selectedGender === 'male' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600']"
            >
              Male
            </span>
          </label>
          <label class="relative flex items-center group">
            <input
              type="radio"
              v-model="selectedGender"
              value="female"
              class="hidden"
            />
            <span 
              class="px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 group-hover:border-blue-400"
              :class="[selectedGender === 'female' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600']"
            >
              Female
            </span>
          </label>
        </div>
      </div>

      <!-- Province Autocomplete -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Province</label>
        <div class="relative">
          <input
            v-model="provinceSearch"
            type="text"
            class="input input-bordered w-full"
            placeholder="Search province..."
            @focus="showProvinceDropdown = true"
            @blur="handleProvinceBlur"
          >
          <div 
            v-if="showProvinceDropdown && filteredProvinces.length" 
            class="absolute top-full left-0 bg-white right-0 z-50 mt-1 menu p-2 shadow-lg bg-base-100 rounded-box w-full max-h-60 overflow-auto"
          >
            <div 
              v-for="province in filteredProvinces" 
              :key="province"
              @mousedown="selectedProvince = province; showProvinceDropdown = false; provinceSearch = province"
              class="px-4 py-2 hover:bg-neutral cursor-pointer"
              :class="{'bg-neutral text-neutral-content': selectedProvince === province}"
            >
              {{ province }}
            </div>
          </div>
        </div>
      </div>

      <!-- Age Range -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Age (min-max)</label>
        <div class="flex items-center space-x-4">
          <div class="relative flex-1">
            <input
              v-model="minAge"
              type="number"
              min="0"
              max="120"
              class="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="Min"
            >
            <span class="absolute right-3 top-2 text-gray-400 text-sm">years</span>
          </div>
          <span class="text-gray-400">-</span>
          <div class="relative flex-1">
            <input
              v-model="maxAge"
              type="number"
              min="0"
              max="120"
              class="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="Max"
            >
            <span class="absolute right-3 top-2 text-gray-400 text-sm">years</span>
          </div>
        </div>
      </div>

      <!-- Title Toggle -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Include Title</label>
        <label class="relative inline-flex items-center cursor-pointer group">
          <input
            v-model="includeTitle"
            type="checkbox"
            class="hidden"
          >
          <span 
            class="px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 group-hover:border-blue-400"
            :class="[includeTitle ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600']"
          >
            Include honorific title
          </span>
        </label>
      </div>
    </div>

    <!-- Results -->
    <div class="bg-gray-50 p-6 rounded-xl">
      <div v-if="isLoading" class="flex justify-center items-center p-6">
        <span class="loading loading-spinner loading-lg"></span>
      </div>      
      <div v-else class="grid bg-white rounded-lg border-2 border-gray-100">
        <pre class="p-6 m-0 overflow-auto"><code>{{ JSON.stringify(personData, null, 2) }}</code></pre>
      </div>
      <button 
        @click="regenerate"
        :disabled="isLoading"
        class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Regenerate</span>
      </button>
    </div>
  </div>
</template>