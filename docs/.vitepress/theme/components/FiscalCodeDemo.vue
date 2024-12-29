<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ItFaker } from '../../../../src/lib'
import type { Gender } from '../../../../src/lib/types/types'
import { lastValueFrom } from 'rxjs'
import type { Country } from '../../../../src/lib/types/country'
import type { ItalianCity } from '../../../../src/lib/types/city'
import type { BirthPlace } from '../../../../src/lib/modules/fiscalCode.module'

const faker = new ItFaker()

const firstName = ref('')  
const lastName = ref('')
const selectedGender = ref<Gender | ''>('')
const birthDate = ref('')
const birthPlaceSearch = ref('')
const selectedBirthPlace = ref<ItalianCity | Country | null>(null)
const showBirthPlaceDropdown = ref(false)
const generatedCode = ref('')
const isLoading = ref(false)

const birthPlaces = ref<(ItalianCity | Country)[]>([])

async function fetchBirthPlaces() {
  try {
    const [cities, countries] = await Promise.all([
      lastValueFrom(faker.itPlace.mostPopulatedCities$(500)),
      lastValueFrom(faker.itPlace.getAllCountries$())
    ])
    birthPlaces.value = [...cities, ...countries]
  } catch (error) {
    console.error('Error loading birth places:', error)
  }
}

const filteredBirthPlaces = computed(() => {
  if (!birthPlaceSearch.value) return birthPlaces.value
  const searchTerm = birthPlaceSearch.value.toLowerCase()
  return birthPlaces.value.filter(birthPlace => 
    ('nameEn' in birthPlace ? birthPlace.nameEn.toLowerCase() : birthPlace.name.toLowerCase())
      .startsWith(searchTerm)
  )
})

function selectBirthPlace(birthPlace: ItalianCity | Country) {
  selectedBirthPlace.value = birthPlace
  birthPlaceSearch.value = 'nameEn' in birthPlace ? `${birthPlace.nameEn} (${birthPlace.nameIt})` : birthPlace.name
  showBirthPlaceDropdown.value = false
}

async function generate() {
  isLoading.value = true
  try {
    let birthPlace: BirthPlace = null;
    if (selectedBirthPlace.value) {
      if ('iso3166Alpha3' in selectedBirthPlace.value) {
        birthPlace = {
          type: 'foreign',
          country: {
            name: selectedBirthPlace.value.nameEn,
            code: selectedBirthPlace.value.iso3166Alpha3
          }
        }
      } else {
        birthPlace = {
          type: 'italian',
          city: selectedBirthPlace.value
        }
      }
    }
      
    const fiscalCode$ = faker.itFiscalCode.generate$({
      firstName: firstName.value || undefined, 
      lastName: lastName.value || undefined,
      gender: faker.itPerson.parseGender(selectedGender.value),
      birthDate: birthDate.value ? new Date(birthDate.value) : undefined, 
      birthPlace
    })

    generatedCode.value = await lastValueFrom(fiscalCode$)
  } catch (error) {
    console.error('Error generating fiscal code:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchBirthPlaces()
  generate()
})  
</script>

<template>
  <div class="space-y-8">
    <!-- Main Form Container -->
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <div class="max-w-3xl mx-auto space-y-6 mb-10">

        <!-- Fiscal Code Display -->
        <div class="mt-8 bg-gray-50 rounded-xl p-8">
          <div v-if="isLoading" class="flex justify-center items-center p-6">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
          <div v-else class="bg-white rounded-lg border-2 border-gray-100">
            <div class="p-6 text-center">
              <h3 class="text-lg font-medium text-gray-700 mb-2">Your fiscal code:</h3>
              <p class="text-4xl font-bold tracking-wider text-blue-700 font-mono">
                {{ generatedCode }}
              </p>
            </div>
          </div>
        </div>

        <!-- Generate Button -->
        <button 
          @click="generate"
          :disabled="isLoading"
          class="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
          <span>Generate Fiscal Code</span>
        </button>
      </div>
        <!-- Form Inputs -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- First Name Input -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              v-model="firstName"
              type="text"
              placeholder="Mario"
              class="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            >
          </div>

          <!-- Last Name Input -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              v-model="lastName"
              type="text"
              placeholder="Rossi"
              class="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            >
          </div>

          <!-- Gender Selection -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Gender</label>
            <div class="flex space-x-4">
              <label class="relative flex items-center group">
                <input
                  v-model="selectedGender"
                  type="radio"
                  value="male"
                  class="hidden"
                >
                <span 
                  class="px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 group-hover:border-blue-400"
                  :class="[selectedGender === 'male' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600']"
                >
                  Male
                </span>
              </label>
              <label class="relative flex items-center group">
                <input
                  v-model="selectedGender"
                  type="radio"
                  value="female"
                  class="hidden"
                >
                <span 
                  class="px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 group-hover:border-blue-400"
                  :class="[selectedGender === 'female' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600']"
                >
                  Female
                </span>
              </label>
            </div>
          </div>

          <!-- Birth Date Input -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              v-model="birthDate"
              type="date"
              class="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            >
          </div>

          <!-- Birth Place Autocomplete -->
          <div class="space-y-2 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">
              Place of Birth
              <span class="text-gray-500 text-xs">(Only most populated cities are shown)</span>
            </label>
            <div class="relative">
              <input 
                v-model="birthPlaceSearch"
                type="text" 
                placeholder="Search city or country..."
                class="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                @focus="showBirthPlaceDropdown = true"
                @blur="showBirthPlaceDropdown = false"
              >
              <div 
                v-if="showBirthPlaceDropdown && filteredBirthPlaces.length"
                class="absolute z-10 w-full bg-white rounded-lg shadow-lg border border-gray-200 mt-1 max-h-60 overflow-auto"
              >
                <div
                  v-for="birthPlace in filteredBirthPlaces"
                  :key="'iso3166Alpha3' in birthPlace ? birthPlace.iso3166Alpha3 : birthPlace.belfioreCode"
                  @mousedown="selectBirthPlace(birthPlace)"
                  class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  :class="{ 'bg-blue-50': birthPlace === selectedBirthPlace }"
                >
                  <template v-if="'nameEn' in birthPlace">
                    {{ birthPlace.nameEn }} ({{ birthPlace.nameIt }})
                  </template>
                  <template v-else>
                    {{ birthPlace.name }}
                  </template>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
  </div>
</template>