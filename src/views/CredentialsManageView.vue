<template>
  <div class="content">
    <h2>{{ t('ACCOUNT_DETAILS_CHANGE_TITLE') }}</h2>

    <p v-if="responseMessage" class="meldung">
      {{ responseMessage }}
    </p>

    <div class="splitLeft">
      <form @submit.prevent="send" method="POST">
        <p>
          {{ t('CHANGE_LOGIN_PASSWORD_INFO') }}<br />
          <b>{{ t('CHANGE_LOGIN_PASSWORD_RULES') }}</b>
        </p>

        <p v-if="passwordErrorMessage" class="error-message">
          {{ passwordErrorMessage }}
        </p>

        <table>
          <tbody>
            <tr>
              <th class="topLine" colspan="2">
                {{ t('ACCOUNT_PASSWORD') }}
              </th>
            </tr>

            <tr>
              <th class="topLine">{{ t('OLD_PASSWORD') }}:</th>
              <td class="tdunkel">
                <input
                  v-model="updateCredentials.previousPassword"
                  type="password"
                  size="16"
                  maxlength="16"
                />
              </td>
            </tr>

            <tr>
              <th class="topLine">{{ t('NEW_PASSWORD') }}:</th>
              <td class="tdunkel">
                <input
                  v-model="updateCredentials.updatePassword"
                  type="password"
                  size="16"
                  maxlength="16"
                />
              </td>
            </tr>

            <tr>
              <th class="topLine">{{ t('NEW_PASSWORD_CONFIRM') }}:</th>
              <td class="tdunkel">
                <input
                  v-model="verifyPassword"
                  type="password"
                  size="16"
                  maxlength="16"
                />
              </td>
            </tr>

            <tr>
              <th class="topLine" style="text-align: center" colspan="2">
                <button type="submit" name="submit">
                  {{ t('CHANGE_LOGIN_PASSWORD') }}
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
    </div>

    <div class="splitRight">
      <form action="index.php?s=passwort" method="POST">
        <p>
          {{ t('CHANGE_SAFEBOX_PASSWORD_INFO') }}<br />
          <b>{{ t('CHANGE_SAFEBOX_PASSWORD_RULES') }}</b>
        </p>

        <table>
          <tbody>
            <tr>
              <th class="topLine" colspan="2">
                {{ t('SAFEBOX_PASSWORD') }}
              </th>
            </tr>

            <tr>
              <th class="topLine">{{ t('OLD_PASSWORD') }}:</th>
              <td class="tdunkel">
                <input type="password" size="6" maxlength="6" />
              </td>
            </tr>

            <tr>
              <th class="topLine">{{ t('NEW_PASSWORD') }}:</th>
              <td class="tdunkel">
                <input type="password" size="6" maxlength="6" />
              </td>
            </tr>

            <tr>
              <th class="topLine">{{ t('NEW_PASSWORD_CONFIRM') }}:</th>
              <td class="tdunkel">
                <input type="password" size="6" maxlength="6" />
              </td>
            </tr>

            <tr>
              <th class="topLine" style="text-align: center" colspan="2">
                <button type="submit" name="submit">
                  {{ t('CHANGE_SAFEBOX_PASSWORD') }}
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
    </div>

    <div class="splitLeft">
      <form action="index.php?s=passwort" method="POST">
        <p>{{ t('CHANGE_SECRET_QUESTION_INFO') }}</p>

        <table>
          <tbody>
            <tr>
              <th class="topLine" colspan="2">
                {{ t('ACCOUNT_SECURITY') }}
              </th>
            </tr>

            <tr>
              <th class="topLine">{{ t('PREVIOUS_SECRET_QUESTION') }}:</th>
              <td class="tdunkel">
                <select required>
                  <option value="1">{{ t('SECRET_MOTHER_NAME') }}</option>
                  <option value="2">{{ t('SECRET_FAVORITE_CITY') }}</option>
                  <option value="3">{{ t('SECRET_PET_NAME') }}</option>
                  <option value="4">{{ t('SECRET_FAVORITE_HERO') }}</option>
                </select>
              </td>
            </tr>

            <tr>
              <th class="topLine">{{ t('PREVIOUS_SECRET_ANSWER') }}:</th>
              <td class="tdunkel">
                <input type="password" name="opass" size="16" maxlength="16" />
              </td>
            </tr>

            <tr>
              <th class="topLine">{{ t('NEW_SECRET_QUESTION') }}:</th>
              <td class="tdunkel">
                <select required>
                  <option value="1">{{ t('SECRET_MOTHER_NAME') }}</option>
                  <option value="2">{{ t('SECRET_FAVORITE_CITY') }}</option>
                  <option value="3">{{ t('SECRET_PET_NAME') }}</option>
                  <option value="4">{{ t('SECRET_FAVORITE_HERO') }}</option>
                </select>
              </td>
            </tr>

            <tr>
              <th class="topLine">{{ t('NEW_SECRET_ANSWER') }}:</th>
              <td class="tdunkel">
                <input type="password" name="opass" size="16" maxlength="16" />
              </td>
            </tr>

            <tr>
              <th class="topLine" style="text-align: center" colspan="2">
                <button type="submit" name="submit">
                  {{ t('CHANGE_ACCOUNT_SECURITY') }}
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import APIController from '@/services/api/API.communicate';

const { t } = useI18n();

const verifyPassword = ref('');
const passwordErrorMessage = ref('');
const responseMessage = ref('');
const errors = ref<string[]>([]);

const updateCredentials = ref({
  previousPassword: '',
  updatePassword: '',
});

const send = () => {
  if (errors.value.length > 0) {
    return;
  }

  APIController.sendRequest(
    'change-user-password',
    'POST',
    updateCredentials.value
  )
    .then((res: any) => {
      responseMessage.value = res.message;
    })
    .catch((err: any) => {
      responseMessage.value = err?.data?.message || t('ERROR');
    });
};

watchEffect(() => {
  errors.value = [];

  if (!verifyPassword.value) {
    passwordErrorMessage.value = '';
    return;
  }

  if (verifyPassword.value !== updateCredentials.value.updatePassword) {
    passwordErrorMessage.value = t('VALIDATION_PASSWORD_MATCH');
    errors.value.push(passwordErrorMessage.value);
    return;
  }

  passwordErrorMessage.value = '';
});
</script>

<style>
.error-message {
  color: #cc0033;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 10px;
}
</style>