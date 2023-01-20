/// <reference types="vite/client" />

import { Store } from 'vuex';
import type { State } from 'src/store/index';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
