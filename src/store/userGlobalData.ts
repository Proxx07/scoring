import { defineStore } from 'pinia';
import { useLocalStorageHelper } from '@/composables/UI/';

export const useGlobalData = defineStore('global-state', () => {
  const { value: userID, setValue: setUserID } = useLocalStorageHelper<string>('user-id', '');

  return {
    userID,
    setUserID,
  };
});
