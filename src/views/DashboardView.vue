<template>
  <div class="content">
    <h2>Καρτέλα Λογαρισμού</h2>
    <div class="splitLeft">
      <ul class="menue">
        <li><a href="index.php?s=admin">Admin</a></li>

        <li><a href="index.php?s=itemshop">Itemshop</a></li>
        <li><a href="index.php?s=charaktere">Χαρακτήρες</a></li>
        <li>
          <router-link to="/account-manage"
            >Αλλαγή στοιχείων λογαριασμού</router-link
          >
        </li>
        <li><a href="index.php?s=tombola_play">Παίξε τόμπολα</a></li>
        <li><a href="index.php?s=tombola&tombola=see">Κοίτα τα δώρα σου</a></li>
      </ul>
    </div>
    <div class="splitRight">
      <table>
        <tr>
          <th class="topLine">Λογαριασμός:</th>
          <td class="tdunkel">{{ userStore.getUser?.login }}</td>
        </tr>
        <tr>
          <th class="topLine">Βασίλειο:</th>
          <td class="thell">
            {{
              userStore.getUser?.empire === 1
                ? 'Shinsoo'
                : userStore.getUser.empire === 2
                ? 'Chunjo'
                : userStore.getUser?.empire === 3
                ? 'Jinno'
                : 'Χωρίς βασίλειο.'
            }}
            <img
              :src="
                userStore.getUser?.empire === 1
                  ? redFlag
                  : userStore.getUser?.empire === 2
                  ? yellowFlag
                  : userStore.getUser?.empire === 3
                  ? blueFlag
                  : ''
              "
              title="Βασίλειο"
              alt="Reich"
            />
          </td>
        </tr>
        <tr>
          <th class="topLine">Χαρακτήρες</th>
          <td class="tdunkel">{{ userStore.getUser?.players.toString() }}</td>
        </tr>
        <tr>
          <th class="topLine">Λεπτά Παιχνιδού:</th>
          <td class="thell">{{ userStore.getUser?.playtime }}</td>
        </tr>
        <tr>
          <th class="topLine">Κωδικός διαγραδή χαρακτήρων:</th>
          <td class="tdunkel">{{ userStore.getUser?.social_id }}</td>
        </tr>
        <tr>
          <th class="topLine">Κωδικός Αποθήκης:</th>
          <td class="tdunkel">{{ userStore.getUser?.safebox_password }}</td>
        </tr>
        <th class="topLine">E-Mail Λογαριασμού:</th>
        <td class="tdunkel">{{ userStore.getUser?.email }}</td>
        <tr>
          <th class="topLine">Κατάσταση Λογαριασμού:</th>
          <td class="tdunkel">{{ userStore.getUser?.account_status }}</td>
        </tr>
        <th class="topLine">Νομίσματα:</th>
        <td class="tdunkel">{{ userStore.getUser?.coins }}</td>
        <tr>
          <th class="topLine">Τελευτέα Συνδεση:</th>
          <td class="tdunkel">
            {{ new Date(userStore.getUser?.last_play).toLocaleString() }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import redFlag from '@/assets/images/empires/1.jpg';
import yellowFlag from '@/assets/images/empires/2.jpg';
import blueFlag from '@/assets/images/empires/3.jpg';

import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
</script>
<style scoped>
.error-message {
  color: #cc0033;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0px 0;
  align-self: flex-end;
}
</style>
