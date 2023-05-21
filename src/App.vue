<template>
  <div>
    <router-view :documents="documents" :id="selectedDocument" @view-details="viewDetails" @back="goBack" />
  </div>
</template>

<script>

export default {

  data() {
    return {
      documents: [],
      selectedDocument: null
    };
  },
  mounted() {
    fetch('https://staging-nymus.nymus.eu/api/recruitment/overview')
      .then(response => response.json())
      .then(data => {
        this.documents = data.data.documents;
      })
      .catch(error => console.error('Error fetching documents:', error));
  },
  methods: {
    viewDetails(document) {
      this.selectedDocument = document;
    },
    goBack() {
      this.selectedDocument = null;
    }
  }
};
</script>

<style>

</style>
