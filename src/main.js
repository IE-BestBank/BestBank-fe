import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from "bootstrap-vue";
import './assets/globals.css'; // global styles
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

Vue.config.productionTip = false;

// Fetch connection string from environment variables
// const connectionString = process.env.VUE_APP_APPLICATIONINSIGHTS_CONNECTION_STRING;

// if (connectionString) {
//   const appInsights = new ApplicationInsights({
//     config: {
//       connectionString,
//       enableAutoRouteTracking: true, // Automatically track route changes
//     },
//   });
//   appInsights.loadAppInsights();
//   appInsights.trackPageView(); // Track the initial page view
// } else {
//   console.warn('Application Insights connection string is not defined.');
// }

Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
