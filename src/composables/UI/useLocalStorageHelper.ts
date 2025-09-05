import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';

export const useLocalStorageHelper = <T>(key: string, initialValue: any) => {
  const storageVariable = useLocalStorage<T>(key, initialValue);
  const value = computed(() => storageVariable.value);

  const setValue = (val: T) => {
    storageVariable.value = val;
  };

  return { value, setValue };
};
