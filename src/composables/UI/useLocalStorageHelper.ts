/*
import type { ComputedRef } from 'vue';
import { useLocalStorage, useSessionStorage } from '@vueuse/core';
import { computed } from 'vue';
*/

/* export const useLocalStorageHelper = <T>(key: string, initialValue: any): { setValue: (value: T) => void, value: ComputedRef<T> } => {
  const storageVariable = useLocalStorage<T>(key, initialValue);
  const value = computed(() => storageVariable.value);

  const setValue = (val?: T) => {
    storageVariable.value = val;
  };

  return { value, setValue };
}; */

/*
export const useSessionStorageHelper = <T>(key: string, initialValue: any): { setValue: (value: T) => void, value: ComputedRef<T> } => {
  const storageVariable = useSessionStorage<T>(key, initialValue);
  const value = computed(() => storageVariable.value);

  const setValue = (val?: T) => {
    storageVariable.value = val;
  };

  return { value, setValue };
};
*/
