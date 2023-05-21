<template>
  <div>
    <table class="summary-table">
      <thead>
        <tr>
          <th>Document Type</th>
          <th>Document Number</th>
          <th>Verzender Naam </th>
          <th>Ontvanger Naam </th>
          <th>Client ID</th>
          <th>Document Date</th>
          <th>Due Date</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in paginatedDocuments" :key="document.docId">
          <td>{{ document.documentType }}</td>
          <td>{{ document.documentNumber }}</td>
          <td>{{ document.billingData.billingFrom.name }}</td>
          <td>{{ document.billingData.billingTo.name }}</td>
          <td>{{ document.billingData.clientId }}</td>
          <td>{{ document.billingData.documentDate }}</td>
          <td>{{ document.dueDate }}</td>
          <td>{{ document.billingData.documentAmounts.mandatoryAmounts.totalAmountDue }}</td>
          <td>
            <router-link class="view-details" :to="{ name: 'DocumentDetails', params: { id: document.docId }, query: { page: currentPage }}">
              View Details
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-button">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ this.currentPage }} of 4</span>
      <button @click="nextPage" :disabled="currentPage === 4">Next</button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    documents: {
      type: Array,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    totalPages() {
      if (!this.documents || this.documents.length === 0) {
        return 0;
      }
      return Math.ceil(this.documents.length / this.perPage);
    },
    paginatedDocuments() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.documents.slice(start, end);
    }
  },
  methods: {
    getDocumentDetailsUrl(document) {
      return `/document/${document.docId}`;
    },
    viewDetails(document) {
      this.$emit('view-details', document);
    },
    changePage(page) {
      this.currentPage = page;
    },
    previousPage() {
      this.currentPage--
    },
    nextPage() {
      this.currentPage++

    }
  },
  mounted() {
    const pageParam = this.$route.query.page;
    if (pageParam) {
      this.currentPage = parseInt(pageParam);
    }
  },
};
</script>

<style>
.summary-table {
  font-family: sans-serif;
  margin: auto;
  width: 90%;
  border-collapse: separate;

}

.summary-table th,
.summary-table td {
  padding: 30px;
  border: 1px solid #5898c5;
  border-radius: 5px;
}

.summary-table th {
  background-color: #b0cfff;
  font-weight: bold;
  border: none;
  font-size: 1.2rem;
}

.view-details {
  text-decoration: none;
  color: #0471ff;
  font-style: italic;
}

.view-details:hover {
  color: #0e0f4b;
}

.pagination-button {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #fff;
}

.pagination-button button {
  background-color:  #77d4ff;
  padding: 10px 20px;
  border: none;
  margin: 10px;
  border-radius: 7px;
  cursor: pointer;
}

.pagination-button button:hover {
  background-color: #00b7ff
}

@media (max-width: 768px) {
  .summary-table th,
  .summary-table td {
    padding: 20px;
  }
}

@media (max-width: 576px) {
  .summary-table th,
  .summary-table td {
    padding: 10px;
    font-size: 0.9rem;
  }
}

</style>