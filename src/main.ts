import { createApp } from 'vue'
import App from './App.vue'
import Vant, {Lazyload} from 'vant'
import 'vant/lib/index.css'
import router from './router'
import store from './store'
import './asset/reset.css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const app = createApp(App);
app.use(Vant);
app.use(Lazyload, {
    lazyComponent: true,
    loading:require('@/common/default/default.png'),
    error:require('@/common/default/swipe-loading.jpg'),
    attempt:1
});
app.use(store).use(router).mount('#app')
