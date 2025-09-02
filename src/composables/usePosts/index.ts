import type { IPost } from './types';
import { ref } from 'vue';
import $axios from '@/api';
import { useFetchStates } from '@/composables/UI';

export const usePosts = () => {
  const { loading, error: postsError } = useFetchStates();

  const posts = ref<IPost[]>([]);

  const getPosts = async () => {
    const { data, error } = await $axios.get<IPost[]>('/posts', { loading });
    posts.value = error ? [] : data;
    postsError.value = Boolean(error);
    console.log(posts.value);
  };

  return {
    posts,
    loading,
    postsError,
    getPosts,
  };
};
