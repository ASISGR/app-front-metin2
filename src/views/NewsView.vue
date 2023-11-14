<template>
  <CardPost
    v-for="(post, index) in posts"
    :title="post.title"
    :key="post.id"
    :post="post">
    <template v-if="userStore?.getUser?.isAdmin" #actions>
      <button @click="showModal(post)">
        <setting-outlined :style="{ fontSize: '20px' }" />
      </button>
      <button @click="deletePost(post)">
        <close-outlined :style="{ fontSize: '20px'  }" />
      </button>
    </template>
    <template #content>
      <p>
        {{ post.post_content }}
      </p>
    </template>
    <template #footer>
      <p>
        Δημοσιεύτηκε: {{ new Date(post.created_at).toLocaleString() }} από τον:
        {{ post.author }}
      </p>
    </template>
  </CardPost>
  <a-modal v-model:open="open" title="Edit Post" @ok="editPost(postToEdit)">
    <a-form
    :model="postToEdit"
    name="normal_edit_post"
    class="edit-form"
    @finish="editPost(postToEdit)">
    <a-form-item
      label="Χαρακτήρας"
      :name="['author']"
      :rules="[
        { required: true, message: 'Please input your author!' },
        {
          pattern: /^[A-Za-z0-9\[\]]+$/,
          message:
            'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
        },
      ]">
      <a-select
        v-model:value="postToEdit.author"
        placeholder="Επιλέξτε χαρατήρα">
        <a-select-option v-if="characters.length > 0"
          v-for="(playerName, index) of characters"
          :value="playerName"
          :key="index"
          >{{ playerName }}</a-select-option
        >
      </a-select>
    </a-form-item>
    <a-form-item
      label="Τίλτος"
      name="title"
      :rules="[
        { required: true, message: 'Please input your title!' },

      ]">
      <a-input v-model:value="postToEdit.title"> </a-input>
    </a-form-item>

    <a-form-item
      label="Κείμενο"
      name="post_content"
      :rules="[
        { required: true, message: 'Please input your postContent!' },
 
      ]">
      <a-textarea v-model:value="postToEdit.post_content" />
    </a-form-item>
  </a-form>

    </a-modal>
  
</template>

<script lang="ts" setup>
  import CardPost from "@/components/General/CardPost.vue";
  import { ref, onMounted } from "vue";
  import APIController from "@/services/api/API.communicate";
  import { SettingOutlined, CloseOutlined } from "@ant-design/icons-vue";
  import { useUserStore } from "@/stores/useUserStore";
import { message } from "ant-design-vue";

  const userStore = useUserStore();
  interface Post {
    id: number;
    title: string;
    post_content: string;
    author: string;
    created_at: Date;
  }

const posts = ref<Post[]>(null);

const open = ref<boolean>(false);

const postToEdit = ref<Post>(null);
const characters = ref<String[]>(null);

  onMounted(() => {
    APIController.sendRequest("posts", "GET")
      .then((response: any) => {
        posts.value = response;
      })
      .catch((err: any) => {
        console.log(err);
      });
  });

  characters.value = userStore.getUser?.players;

  function editPost(post: Post) {
    if(!confirm('are you sure?')){
      return false;
    }
    APIController.sendRequest('posts', 'PATCH', {id:post.id, postContent: post.post_content, title: post.title, author: post.author }).then((res:any) => { 
      message.success(res.message)
      open.value = false;

     const updatedPost =  posts.value.find((p) => p.id === post.id);
     updatedPost.author = post.author;
     updatedPost.title = post.title;
     updatedPost.post_content = post.post_content;

    }).catch((err: any) => {
      message.error(err.data.message)
    })
  }
  function deletePost(post: Post) {

    if(!confirm('are you sure?')){
      return false;
    }
    APIController.sendRequest('posts', 'DELETE', post).then((res:any) => { 
      if(res.success){
       posts.value =  posts.value.filter((p) => p.id !== post.id)
       message.success(res.message)
      }
    }).catch((err: any) => {
      message.error(err.data.message)

    })
  }

  const showModal = (post: Post) => {
  postToEdit.value = {...post};
  open.value = true;
};


</script>

<style scoped>

</style>
