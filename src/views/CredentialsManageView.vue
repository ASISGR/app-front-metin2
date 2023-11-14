<template>
  <div class="content">
    <h2>Αλλαγή Στοιχείων Λογαριασμού</h2>
    <p v-if="responseMessage" class="meldung">{{ responseMessage }}</p>
    <div class="splitLeft">
      <form @submit.prevent="send()" method="POST">
        <p>
          Αλλαγή κωδικού σύνδεσης. Ο νέος κωδικός πρέπει να έχει τα ακόλουθα
          χαρακτηριστικά:<br /><b
            >6-16 ψηφία, χαρακτήρες a-Z, 0-9 και σύμβολα.</b
          >
        </p>
        <table>
          <span v-if="passwordErrorMessage" class="error-message">{{
            passwordErrorMessage
          }}</span>
          <tr>
            <th class="topLine" colspan="2">Κωδικός λογαριασμού.</th>
          </tr>
          <tr>
            <th class="topLine">Παλιός κωδικός:</th>
            <td class="tdunkel">
              <input
                type="password"
                v-model="updateCredentials.previousPassword"
                size="16"
                maxlength="16"
              />
            </td>
          </tr>
          <tr>
            <th class="topLine">Νέος κωδικός:</th>
            <td class="tdunkel">
              <input
                type="password"
                v-model="updateCredentials.updatePassword"
                size="16"
                maxlength="16"
              />
            </td>
          </tr>
          <tr>
            <th class="topLine">Νέος κωδικός (επιβεβαίωση):</th>
            <td class="tdunkel">
              <input
                type="password"
                v-model="verifyPasswrod"
                size="16"
                maxlength="16"
              />
            </td>
          </tr>

          <tr>
            <th class="topLine" style="text-align: center" colspan="2">
              <button type="submit" name="submit">
                Αλλαγή κωδικού σύνδεσης
              </button>
            </th>
          </tr>
        </table>
      </form>
    </div>
    <div class="splitRight">
      <form action="index.php?s=passwort" method="POST">
        <p>
          Αλλαγή κωδικού αποθήκης. Ο κωδικός αποθήκης, θα πρέπει να έχει οριστεί
          πρώτα in game, για να μπορεί να αλλαχθεί. Ο νέος κωδικός θα πρέπει να
          έχει τα ακόλουθα χαρακτηριστικά:<br /><b
            >1-6 ψηφία (μόνο a-Z και 0-9).</b
          >
        </p>
        <table>
          <tr>
            <th class="topLine" colspan="2">Κωδικός αποθήκης.</th>
          </tr>
          <tr>
            <th class="topLine">Παλιός κωδικός:</th>
            <td class="tdunkel">
              <input type="password" size="6" maxlength="6" />
            </td>
          </tr>
          <tr>
            <th class="topLine">Νέος κωδικός:</th>
            <td class="tdunkel">
              <input type="password" size="6" maxlength="6" />
            </td>
          </tr>
          <tr>
            <th class="topLine">Νέος κωδικός (επιβεβαίωση):</th>
            <td class="tdunkel">
              <input type="password" size="6" maxlength="6" />
            </td>
          </tr>
          <tr>
            <th class="topLine" style="text-align: center" colspan="2">
              <button type="submit" name="submit">
                Αλλαγή κωδικού αποθήκης
              </button>
            </th>
          </tr>
        </table>
      </form>
    </div>

    <div class="splitLeft">
      <form action="index.php?s=passwort" method="POST">
        <p>Αλλαγή μυστικής ερώτησης/απάντησης.</p>
        <table>
          <tr>
            <th class="topLine" colspan="2">Δικλίδα ασφαλείας λογαριασμού.</th>
          </tr>
          <tr>
            <th class="topLine">Προηγούμενη μυστική ερώτηση:</th>
            <td class="tdunkel">
              <select id="sicherheitsf" required>
                <option value="1">Όνομα μητέρας</option>
                <option value="2">Αγαπημένη πόλη</option>
                <option value="3">Όνομα κατοικιδίου</option>
                <option value="4">Όνομα αγαπημένου ήρωα</option>
              </select>
            </td>
          </tr>

          <tr>
            <th class="topLine">Προηγούμενη μυστική απάντηση:</th>
            <td class="tdunkel">
              <input type="password" name="opass" size="16" maxlength="16" />
            </td>
          </tr>
          <tr>
            <th class="topLine">Νέα μυστική ερώτηση:</th>
            <td class="tdunkel">
              <select id="sicherheitsf" required>
                <option value="1">Όνομα μητέρας</option>
                <option value="2">Αγαπημένη πόλη</option>
                <option value="3">Όνομα κατοικιδίου</option>
                <option value="4">Όνομα αγαπημένου ήρωα</option>
              </select>
            </td>
          </tr>

          <tr>
            <th class="topLine">Νέα μυστική απάντηση:</th>
            <td class="tdunkel">
              <input type="password" name="opass" size="16" maxlength="16" />
            </td>
          </tr>
          <tr>
            <th class="topLine" style="text-align: center" colspan="2">
              <button type="submit" name="submit">
                Αλλαγή δικλίδας ασφαλείας
              </button>
            </th>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import APIController from '@/services/api/API.communicate';
import { ref, watchEffect } from 'vue';

//Updating Password
const verifyPasswrod = ref('');
const passwordErrorMessage = ref('');
const responseMessage = ref('');
const errors = ref<String[]>([]);
const updateCredentials = ref({
  previousPassword: '',
  updatePassword: '',
});

function send() {
  if (errors.value.length > 0) {
    return false;
  }

  APIController.sendRequest(
    'change-user-password',
    'POST',
    updateCredentials.value
  ).then((res: any) => {
    responseMessage.value = res.message;
  });
}

watchEffect(() => {
  if (verifyPasswrod.value) {
    if (verifyPasswrod.value !== updateCredentials.value.updatePassword) {
      passwordErrorMessage.value = 'Οι κωδικοί δεν ταιριάζουν.';
      errors.value.push(passwordErrorMessage.value);
    } else {
      passwordErrorMessage.value = '';
      errors.value = [];
    }

    console.log(passwordErrorMessage.value);
  }
});
</script>
<style>
.error-message {
  color: #cc0033;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0px 0;
  align-self: flex-end;
}
</style>
