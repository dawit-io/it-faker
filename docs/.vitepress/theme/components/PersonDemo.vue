<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { ItFaker } from '../../../../src/lib'
import { Gender } from '../../../../src/lib/types/types';
import { ItalianPerson } from '../../../../src/lib/types/person';
import { ItalianCity } from '../../../../src/lib/types/city';
import { fi } from '@faker-js/faker';

const faker = new ItFaker()

// Form controls
const selectedGender = ref('')
const selectedProvince = ref('')
const provinceSearch = ref('')
const includeTitle = ref(false)
const minAge = ref(18)
const maxAge = ref(80)
const showProvinceDropdown = ref(false)

// Reset province search when selection is made
watch(selectedProvince, () => {
  provinceSearch.value = selectedProvince.value
  showProvinceDropdown.value = false
})

function generatePerson() {
  let birthCity: ItalianCity = selectedProvince.value ? faker.itPlace.city({ province: selectedProvince.value}) : faker.itPlace.randomCity();
  let gender = faker.itPerson.parseGender(selectedGender.value);
  let firstName = faker.itPerson.firstName();
  let lastName = faker.itPerson.lastName();
  let prefix = gender ? faker.itPerson.prefix(gender) : '';
  let birthDate = faker.date.birthdate({ 
      mode: 'age', 
      min: minAge.value, 
      max: maxAge.value 
    });
    /*
  let person =  {
    fullName: `${prefix} ${firstName} ${lastName}`.trim(),
    birthDate: birthDate.toLocaleDateString('it-IT'),
    birthPlace: {
      city: birthCity.name,
      province: birthCity.province.name,
      region: birthCity.region.name
    },
    mobilePhone: faker.itPerson.phone(),
    email: faker.itPerson.email(firstName, lastName),
    pec: faker.itPerson.pec(firstName, lastName),
    fiscalCode: ''
  };
    
  person.fiscalCode = faker.itPerson.fiscalCode( {
    birthDate: birthDate,
    birthPlace: birthCity,
    firstName,
    lastName,
    gender: gender
  });*/
  return faker.itPerson.generatePerson({ gender: gender, withTitle: includeTitle.value, minAge: minAge.value, maxAge: maxAge.value, province: provinceSearch.value,  });
}

const personData = ref(generatePerson())

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
  personData.value = generatePerson()
}

onMounted(() => {
  personData.value = generatePerson()
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
        <label class="block text-sm font-medium text-gray-700">Genere</label>
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
              Casuale
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
              Uomo
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
              Donna
            </span>
          </label>
        </div>
      </div>

      <!-- Province Autocomplete -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Provincia</label>
        <div class="relative">
          <input
            v-model="provinceSearch"
            type="text"
            class="input input-bordered w-full"
            placeholder="Cerca provincia..."
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
        <label class="block text-sm font-medium text-gray-700">Età (min-max)</label>
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
            <span class="absolute right-3 top-2 text-gray-400 text-sm">anni</span>
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
            <span class="absolute right-3 top-2 text-gray-400 text-sm">anni</span>
          </div>
        </div>
      </div>

      <!-- Title Toggle -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Includi Titolo</label>
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
            Includi titolo onorifico
          </span>
        </label>
      </div>
    </div>

    <!-- Results -->
    <div class="bg-gray-50 p-6 rounded-xl">
      <pre class="bg-white p-6 rounded-lg border-2 border-gray-100 overflow-auto"><code>{{ JSON.stringify(personData, null, 2) }}</code></pre>
      <button 
        @click="regenerate"
        class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-medium flex items-center space-x-2"
      >
        <span>Regenerate</span>
      </button>
    </div>
  </div>
</template>