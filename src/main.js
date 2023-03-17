import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { router } from './router';
import App from './App.vue';

import 'vant/lib/index.css';

import { Button, Popup, Col, Row, Field, Space } from 'vant';

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);

app.use(Button);
app.use(Popup);
app.use(Field);
app.use(Col);
app.use(Row);
app.use(Space);

app.mount('#app');
