import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '../routes';

export default {
  async Login({ commit }, credentials) {

    const response = axios.post('api/FAOnlineSOP/CheckLogin', credentials);
    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          if (result.data.status === 'OK') {
            const user = result.data.data;
            sessionStorage.setItem(`avt${user.EMP_ID}`, user.Avatar);
            user.Avatar = undefined;
            const isLogin = true;
            commit('UpdateUser', user);
            sessionStorage.setItem("UserName", user.NAME);
            sessionStorage.setItem("isLogin", isLogin);
            resolve(result);
          } else {
            sessionStorage.removeItem("isLogin");
            reject("User Name or Password is incorrect");
          }
        })
        .catch((err) => {
          sessionStorage.removeItem("isLogin");
          reject(err);
        });
    });
  }, Logout({ commit }) {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      sessionStorage.removeItem(key);
    }
    commit('UpdateUser', undefined);
    VueCookies.keys().forEach(cookie => VueCookies.remove(cookie));
    router.push('/');
  },
  async GetSOPErrorCode({ commit }, error_code) {
    if (!error_code || !error_code.trim()) {
      alert('Error Code cannot be empty!');
      return null;
    }
    const response = axios.get(`api/FAOnlineSOP/GetAllSop?error_code=${error_code}`);
    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          commit('UpdateSOP', result.data.data);
          if (result.data.status === 'OK') {
            resolve(result);
          } else {
            reject(result.data.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}