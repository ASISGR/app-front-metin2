<template>
  <CardPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
    :post="post"
  >
    <template v-if="userStore?.getUser?.isAdmin" #actions>
      <button @click="showModal(post)">
        <SettingOutlined :style="{ fontSize: '20px' }" />
      </button>

      <button @click="deletePost(post)">
        <CloseOutlined :style="{ fontSize: '20px' }" />
      </button>
    </template>

    <template #content>
      <p>{{ post.post_content }}</p>
    </template>

    <template #footer>
      <p>
        {{ t('POST_PUBLISHED') }}:
        {{ new Date(post.created_at).toLocaleString() }}
        {{ t('POST_BY_AUTHOR') }}:
        {{ post.author }}
      </p>
    </template>
  </CardPost>

  <a-modal
    v-model:open="open"
    :title="t('EDIT_POST')"
    @ok="editPost(postToEdit)"
  >
    <a-form
      v-if="postToEdit"
      :model="postToEdit"
      name="normal_edit_post"
      class="edit-form"
      @finish="editPost(postToEdit)"
    >
      <a-form-item
        :label="t('CHARACTER')"
        :name="['author']"
        :rules="[
          { required: true, message: t('VALIDATION_AUTHOR_REQUIRED') },
          { pattern: authorPattern, message: t('VALIDATION_ONLY_ALNUM') },
        ]"
      >
        <a-select
          v-model:value="postToEdit.author"
          :placeholder="t('SELECT_CHARACTER')"
        >
          <a-select-option
            v-for="(playerName, index) in characters"
            :key="index"
            :value="playerName"
          >
            {{ playerName }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        :label="t('TITLE')"
        name="title"
        :rules="[
          { required: true, message: t('VALIDATION_TITLE_REQUIRED') },
        ]"
      >
        <a-input v-model:value="postToEdit.title" />
      </a-form-item>

      <a-form-item
        :label="t('TEXT')"
        name="post_content"
        :rules="[
          { required: true, message: t('VALIDATION_POST_CONTENT_REQUIRED') },
        ]"
      >
        <a-textarea v-model:value="postToEdit.post_content" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { SettingOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';

import CardPost from '@/components/General/CardPost.vue';
import APIController from '@/services/api/API.communicate';
import { useUserStore } from '@/stores/useUserStore';

interface Post {
  id: number;
  title: string;
  post_content: string;
  author: string;
  created_at: Date;
}

const { t } = useI18n();
const userStore = useUserStore();

const authorPattern = /^[A-Za-z0-9\[\]]+$/;

const posts = ref<Post[]>([]);
const open = ref(false);
const postToEdit = ref<Post | null>(null);
const characters = ref<any[]>(userStore.getUser?.players || []);

onMounted(() => {
  APIController.sendRequest('posts', 'GET')
    .then((response: any) => {
      posts.value = response;
    })
    .catch((err: any) => {
      console.log(err);
    });
});

const showModal = (post: Post) => {
  postToEdit.value = { ...post };
  open.value = true;
};

const editPost = (post: Post | null) => {
  if (!post) return;

  if (!confirm(t('CONFIRM_ACTION'))) {
    return;
  }

  APIController.sendRequest('posts', 'PATCH', {
    id: post.id,
    postContent: post.post_content,
    title: post.title,
    author: post.author,
  })
    .then((res: any) => {
      message.success(res.message);
      open.value = false;

      const updatedPost = posts.value.find((p) => p.id === post.id);

      if (updatedPost) {
        updatedPost.author = post.author;
        updatedPost.title = post.title;
        updatedPost.post_content = post.post_content;
      }
    })
    .catch((err: any) => {
      message.error(err?.data?.message || t('ERROR'));
    });
};

const deletePost = (post: Post) => {
  if (!confirm(t('CONFIRM_ACTION'))) {
    return;
  }

  APIController.sendRequest('posts', 'DELETE', post)
    .then((res: any) => {
      if (res.success) {
        posts.value = posts.value.filter((p) => p.id !== post.id);
        message.success(res.message);
      }
    })
    .catch((err: any) => {
      message.error(err?.data?.message || t('ERROR'));
    });
};
</script>

<style scoped></style>