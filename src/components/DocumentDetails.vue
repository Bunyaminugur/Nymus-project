<template>
  <div class="document-details">
    <div v-if="document" class="document-info">
      <div class="document-text">
      <h2>Document Details</h2>
      <p>Document Type: {{ document.documentType }}</p>
      <p>Document Number: {{ document.documentNumber }}</p>
      <p>Verzender Naam: {{ document.billingData.billingFrom.name }}</p>
      <p>Ontvanger Naam: {{ document.billingData.billingTo.name }}</p>
      <p>Client ID: {{ document.billingData.clientId }}</p>
      <p>Document Date: {{ document.billingData.documentDate }}</p>
      <p>Due Date: {{ document.dueDate }}</p>
      <p>Amount: {{ document.billingData.documentAmounts.mandatoryAmounts.totalAmountDue }}</p>
      </div>
      <div class="document-file">
        <iframe :src="document.fileLocation" width="300%" height="700px"></iframe>
        <div class="back-button-div">
          <button @click="goBack" class="back-button">BACK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script block>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
  },
  computed: {
    document() {
      const id = this.$route.params.id;

      console.log('Received id prop:', id);
      console.log('Documents array:', this.$root.documents);

      if (!id) {
        return null;
      }
      const document = this.$root.documents.find(doc => doc.docId === id) || null;

      console.log('Received document data:', document); // Log the received document

      return document;
    }
  },
  methods: {
    goBack() {
      const currentPage = this.$route.query.page || 1;
      this.$router.push({ name: 'SummaryTable', query: { page: currentPage } });
    }
  },

  created() {
    console.log('id prop:', this.id);
  }

};
</script>

<style>
.document-details {
  font-family: sans-serif;
  max-width: 80%;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.document-info {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 22px;
  display: flex;
  flex-wrap: wrap;
  text-align: start;
}

.back-button {
  background-color: #77d4ff;
  color: rgb(0, 0, 0);
  padding: 10px 50px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.back-button:hover {
  background-color: #00b7ff;
}

.document-file {
  margin-top: 20px;
}

.document-text p {
  margin-top: 20px;
  margin-right: 20px;
  padding: 15px;
  border: 2px solid  #5898c5;
  border-radius: 5px;
}

.back-button-div {
  display: flex;
  justify-content: right;
  margin-top: 10px;
}
</style>