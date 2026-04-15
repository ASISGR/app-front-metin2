<template>
  <a-form
    :model="formState"
    name="normal_login"
    class="login-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed">
    <a-form-item
      label="Θεμα"
      name="subject"
      :rules="[{ required: true, message: 'Please input your subject!' }]">
      <a-input v-model:value="formState.subject"> </a-input>
    </a-form-item>

    <a-form-item
      label="Τίλτος"
      name="title"
      :rules="[{ required: true, message: 'Please input your title!' }]">
      <a-input v-model:value="formState.title"> </a-input>
    </a-form-item>

    <a-form-item
      label="Κείμενο"
      name="content"
      :rules="[{ required: true, message: 'Please input your postContent!' }]">
      <a-textarea v-model:value="formState.content" />
    </a-form-item>

    <a-form-item>
      <a-button
        :disabled="false"
        type="primary"
        html-type="submit"
        class="login-form-button">
        Αποστολή
      </a-button>
    </a-form-item>
    <!--table start-->
    <EmailTableComponent v-if="emails.length > 0" :emails="emails" @send-emails-data="getEmailData"></EmailTableComponent>
    <!--table end-->
  </a-form>
  
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from "vue";
  import APIController from "@/services/api/API.communicate";
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/useUserStore";
  import { message } from "ant-design-vue";
import EmailTableComponent from '@/components/Administrator/EmailTableComponent.vue'
  const userStore = useUserStore();
  const route = useRouter();
  interface Email {
    email: string;
  }

  interface FormState {
    subject: string;
    title: string;
    content: string;
  }
  const formState = reactive<FormState>({
    subject: "",
    title: "",
    content: "",
  });
  const emails = ref<Email[]|any>([]) 
  const selectedEmails = ref<Email[]|any>([]) 
  onMounted(() => {
    if (!userStore.isLogged || !userStore.getUser.isAdmin) {
      route.push("/");
      return 0;
    }
    getEmails()
  });



  async function getEmails(){
   return APIController.sendRequest('server-marketing-emails','GET').then((response: any) => {
    console.log(response)  
    emails.value = response.emails;
    return response;
    }).catch((err:any) => { 
      console.log(err)
      return err
    })
  }

  const onFinish = (values: any) => {
    APIController.sendRequest("server-announcement", "POST", {
        subject: values.subject,
      title: values.title,
      content: values.content,
      emails: selectedEmails.value
    })
      .then((response: any) => {
        console.log(response);
        message.success(response.message);
      })
      .catch((err) => {
        message.error(err.data.message);
      });
  };

  function onFinishFailed() {}

  function getEmailData(emails:String[]){
    let tempMails = []
    for(let i = 0; i < emails.length; i++){
      tempMails.push({email: emails[i]})
    }
    selectedEmails.value = tempMails;
    console.log(selectedEmails.value)
  }
</script>
