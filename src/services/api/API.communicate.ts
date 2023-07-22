import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore';

const url = import.meta.env.VITE_API_URL;

export default class APIController {
  static sendRequest(
    endPoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any
  ) {
    const userStore = useUserStore();

    return new Promise((resolve, reject) => {
      axios(`${url + endPoint}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userStore.loggedUser.token}`,
          token: 'eW91aGF2ZW5vYW3NjZXNz',
        },
        method: method,
        data: data,
      })
        .then((response) => {
          return resolve(response.data);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  }
}
