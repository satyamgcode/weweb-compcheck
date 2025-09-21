<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">📂 Files</h2>

    <!-- Loading -->
    <p v-if="loading" class="text-gray-500">Loading files...</p>

    <!-- Error -->
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <!-- File List -->
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

    <!-- Empty -->
    <p v-else-if="!loading && !error" class="text-gray-400">No files found.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FilesList",
  data() {
    return {
      files: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchFiles() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(
          "https://68ceda846dc3f35077802f63.mockapi.io/files"
        );
        this.files = res.data;
      } catch (err) {
        this.error = "Failed to fetch files.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchFiles();
  },
};
</script>
