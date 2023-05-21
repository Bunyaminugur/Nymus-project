import { createRouter, createWebHistory } from 'vue-router';
import SummaryTable from '../components/SummaryTable.vue';
import DocumentDetails from '../components/DocumentDetails.vue';

const routes = [
  {
    path: '/',
    name: 'SummaryTable',
    component: SummaryTable
  },
  {
    path: '/document/:id',
    name: 'DocumentDetails',
    component: DocumentDetails,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
