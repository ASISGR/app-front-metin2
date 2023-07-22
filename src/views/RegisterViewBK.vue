<template>
  <div class="content">
    <h2>World Of Metin2 - Εγγραφή</h2>
    <!-- Signup From -->

    <p style="font-weight: bold">
      Όλα τα πεδία είναι υποχρεωτικά και πρέπει να συμπληρωθούν.
    </p>
    <p  v-if="messageResponses.length > 0">
      <ul>
        <li v-for="(message, index) in messageResponses">{{message}}</li>
        
      </ul>
    </p>
    <section>
      <form @submit.prevent="register()" method="POST">
        <div>
          <label for="username">Username:</label>
          <input
            v-model="user.login"
            type="text"
            placeholder="Username."
            id="username"
            maxlength="16"
            size="25"
            required
          />
        </div>
        
        <div>
          <label for="real_name">Πραγματικό όνομα:</label>
          <input
            v-model="user.real_name"
            type="text"
            placeholder="What's your name?"
            id="real_name"
            maxlength="16"
            size="25"
          />
        </div>

        <div>
          <label for="password">Κωδικός:</label>
          <input
            v-model="user.password"
            type="password"
            placeholder="Your strong password."
            id="password"
            maxlength="16"
            size="25"
            required

          />
        </div>

        <div>
          <label for="password_bestaetigung">Επιβεβαίωση κωδικού:</label>
          <input
            v-model="bestaetigungsDaten.password"
            placeholder="Repeat your strong password."
            type="password"
            id="password_bestaetigung"
            maxlength="16"
            size="25"
            required
          />
          
          <span v-if="passwordErrorMessage" class="error-message">{{passwordErrorMessage}}</span>
        </div>
        
        <div>
          <label for="email">E-Mail:</label>
          <input
            v-model="user.email"
            placeholder="Email"
            type="email"
            id="email"
            maxlength="50"
            size="25"
            required

          />
        </div>
        <div>
          <label for="email_bestaetigung">Eπιβεβαίωση E-Mail:</label>
          <input
          v-model="bestaetigungsDaten.email"
          placeholder="Email repeat."
          type="email"
          id="email_bestaetigung"
          maxlength="50"
          size="25"
          required
          
          />
          <span v-if="emailErrorMessage" class="error-message">{{emailErrorMessage}}</span>
          
        </div>

        <div>
          <label for="delete_character_password"
            >Κωδ. διαγραφή χαρακτήρα:</label
          >

          <input
            v-model="user.social_id"
            placeholder="1234567"
            type="text"
            id="delete_character_password"
            maxlength="7"
            size="25"
            required

          />
        </div>

        <div>
          <label for="sicherheitsf">Μυστική ερώτηση:</label>
          <select id="sicherheitsf" v-model="user.question1"
          required
>
            <option value="1">Όνομα μητέρας</option>
            <option value="2">Αγαπημένη πόλη</option>
            <option value="3">Όνομα κατοικιδίου</option>
            <option value="4">Όνομα αγαπημένου ήρωα</option>
          </select>
        </div>

        <div>
          <label for="sicherheits_antwort">Μυστική απάντηση:</label>
          <input

            v-model="user.answer1"
            placeholder="Your secret."
            type="text"
            id="sicherheits_antwort"
            maxlength="16"
            size="25"
            required

          />
        </div>

        <div style="border: none; margin-right: 25vh">
          <input v-model="acceptTOS" style="width: 3vh; margin-right: 15px" type="checkbox"
          required
 />
          
          <p>
            Με την εγγραφή μου, δηλώνω ρητά ότι συμφωνώ και αποδέχομαι πλήρως
            τους όρους και τις προϋποθέσεις του παιχνιδιού.
          </p>
        </div>

        <div style="align-self: center; border: none">
          <button>Εγγραφή</button>
          <button @click.stop.prevent="clearFields()">Καθαρισμός</button>
        </div>
      </form>
    </section>
    {{ acceptTOS }}
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import APIController from '@/services/api/API.communicate';

const bestaetigungsDaten = ref({
  password: '',
  email: '',
});

const user = ref({
  login: '',
  password: '',
  real_name: '',
  social_id: '',
  email: '',
  question1: '1',
  answer1: '',
});

const acceptTOS = ref<boolean>(false);

// Serverside errors.
const messageResponses = ref<String[]>([])
// Clientside errors.
const emailErrorMessage = ref<String>('')
const passwordErrorMessage = ref<String>('')

function register() {
  // Serverside - Clear errors.
  messageResponses.value = [];

  if(emailErrorMessage.value || passwordErrorMessage.value){
    console.log(emailErrorMessage.value,passwordErrorMessage.value )
    return false;
  }
  

  if(!acceptTOS.value){
    messageResponses.value.push(`Δεν έχεις αποδεχτεί τους όρους και τις προϋποθέσεις του παιχνιδιού.`)
    return 0;
  }
  APIController.sendRequest('create', 'POST', user.value)
    .then((res: any) => {
      user.value.login = '';
      user.value.email = '';
      user.value.password = '';
      user.value.real_name = '';
      user.value.social_id = '';
      user.value.question1 = '1';
      user.value.answer1 = '';
      bestaetigungsDaten.value.email = '';
      bestaetigungsDaten.value.password = '';
      messageResponses.value.push(res.message)
    })
    .catch((err) => {
      messageResponses.value.push(err.response.data.message)
    });
}
function clearFields() {
  user.value.login = '';
  user.value.email = '';
  user.value.password = '';
  user.value.real_name = '';
  user.value.social_id = '';
  user.value.question1 = '1';
  user.value.answer1 = '';
  bestaetigungsDaten.value.email = '';
  bestaetigungsDaten.value.password = '';
  messageResponses.value = [];
}

watchEffect(() => {
  if(bestaetigungsDaten.value.email){
    if(bestaetigungsDaten.value.email !== user.value.email){
      emailErrorMessage.value = 'Οι διευθύνσεις E-mail δεν ταιριάζουν.'
    }else{
      emailErrorMessage.value = '';
    }
  }
  if(bestaetigungsDaten.value.password){
    if(bestaetigungsDaten.value.password !== user.value.password){
      passwordErrorMessage.value = 'Οι κωδικοί δεν ταιριάζουν.'
    }else{
      passwordErrorMessage.value = '';
    }
  }
})
</script>
<style scoped>
section {
  color: bisque;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}
form div {
  margin: 2vh;
  border-bottom: 1px solid rgb(90, 84, 84);
  padding-bottom: 1vh;
  display: flex;
  align-items: center;
}

form div input,
form div select {
  margin-left: 40vh;

  width: 30vh;
  height: 33px;
  border: 2px solid #ae7b17;
  background-color: #1a1414;
  padding-left: 10px;
  font-family: Arial;
  font-size: 12px;
  color: #fff;
  outline: none;
}

form div input:focus {
  outline: none;
}
form {
  display: flex;
  flex-direction: column;
}

button,
a {
  /*������� ����������� �� ������..*/
  font-family: 'Merriweather', serif;
  letter-spacing: 0.6;
  color: #fff4d3;
  font-size: 18px;  
  font-weight: 500;
  height: 47px;
  width: 190px;
  outline: none;
  border: 2px solid #ae7b17;
  border-radius: 5px;
  background: #151a19;
  margin-right: 0.3rem;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;

}

button:hover,
a:hover {
  /*������� ����������� �� ������..*/
  border: 2px solid #ae7b17;
  background: rgb(41, 49, 48);
  cursor: pointer;
}

button:focus,
a:hover {
  /*������� ����������� �� ������..*/
  background: #121414;
}
.error-message {
  color: #cc0033;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0px 0 ;
  align-self: flex-end;
}

p ul{
list-style-type: none;
font-weight: bold;
}


</style>
