<template>
  <div class="content">
    <h2>Αλαγή Στοιχείων Λογαριασμού</h2>
    <div class="splitLeft">
      <form @submit.prevent="send()" method="POST">
        <p>
          Αλλαγή κωδικού σύνδεσης. Ο νέος κωδικός πρέπει να έχει τα ακόλουθα
          χαρακτηριστικά:<br /><b
            >6-16 ψηφία, χαρακτήρες a-Z, 0-9 και σύμβολα.</b
          >.
        </p>
        <table>
          <tr>
            <th class="topLine" colspan="2">Κωδικός λογαριασμού.</th>
          </tr>
          <tr>
            <th class="topLine">Παλιός κωδικός:</th>
            <td class="tdunkel">
              <input type="password" name="opass" size="16" maxlength="16" />
            </td>
          </tr>
          <tr>
            <th class="topLine">Νέος κωδικός:</th>
            <td class="tdunkel">
              <input type="password" name="npass" size="16" maxlength="16" />
            </td>
          </tr>
          <tr>
            <th class="topLine">Νέος κωδικός (επιβεβαίωση):</th>
            <td class="tdunkel">
              <input type="password" name="npass2" size="16" maxlength="16" />
            </td>
          </tr>
          <tr>
            <th class="topLine" style="text-align: center" colspan="2">
              <input type="submit" name="submit" value="Αλαγή Κωδικού" />
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
          >.
        </p>
        <table>
          <tr>
            <th class="topLine" colspan="2">Κωδικός αποθήκης.</th>
          </tr>
          <tr>
            <th class="topLine">Παλιός κωδικός:</th>
            <td class="tdunkel">
              <input type="password" name="lopass" size="6" maxlength="6" />
            </td>
          </tr>
          <tr>
            <th class="topLine">Νέος κωδικός:</th>
            <td class="tdunkel">
              <input type="password" name="lnpass" size="6" maxlength="6" />
            </td>
          </tr>
          <tr>
            <th class="topLine">Νέος κωδικός (επιβεβαίωση):</th>
            <td class="tdunkel">
              <input type="password" name="lnpass2" size="6" maxlength="6" />
            </td>
          </tr>
          <tr>
            <th class="topLine" style="text-align: center" colspan="2">
              <input
                type="submit"
                name="submit"
                value="Αλαγή κωδικού αποθήκης"
              />
            </th>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import APIController from '@/services/api/API.communicate';

function send() {
  APIController.sendRequest('change-user-password', 'POST');
}
</script>
