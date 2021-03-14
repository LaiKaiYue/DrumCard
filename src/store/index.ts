import { Ref, ref, UnwrapRef } from 'vue'

export interface IStore {
  beatType: Ref<UnwrapRef<string>>;
}

const store = {
  beatType: ref<string>('')
}

export default store
