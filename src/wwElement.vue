<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">📂 Files</h2>

    <p v-if="loading" class="text-gray-500">Loading files...</p>

    <p v-if="error" class="text-red-500">{{ error }}</p>

    <ul v-if="files.length > 0" class="space-y-2">
      <li
        v-for="file in files"
        :key="file.id"
        class="p-3 border rounded-lg shadow-sm flex items-center justify-between"
      >
        <div class="flex items-center space-x-2">
          <span v-if="file.type === 'folder'">📁</span>
          <span v-else>📄</span>
          <span class="font-medium">{{ file.name }}</span>
        </div>
        <span class="text-sm text-gray-400"
          >Created by: {{ file.createdBy }}</span
        >
      </li>
    </ul>

    <p v-else-if="!loading && !error" class="text-gray-400">No files found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const files = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchFiles = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(
      "https://68ceda846dc3f35077802f63.mockapi.io/files"
    );
    if (!res.ok) throw new Error("Network response was not ok");
    files.value = await res.json();
  } catch (err) {
    error.value = "Failed to fetch files.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchFiles();
});
</script>
