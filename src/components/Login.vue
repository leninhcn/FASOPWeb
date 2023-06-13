<template>
  <div id="login">
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>{{ LoginLang.sign_in }}</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="CheckLogin">
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><i class="fas fa-user"></i
                  ></span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  :placeholder="LoginLang.user_name"
                  required
                  v-model="user.UserName"
                />
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><i class="fas fa-key"></i
                  ></span>
                </div>
                <input
                  ref="txtpass"
                  type="password"
                  class="form-control"
                  :placeholder="LoginLang.pass_word"
                  required
                  v-model="user.Password"
                />
              </div>
              <div class="btn-group laguage-bar">
                <button
                  type="button"
                  class="btn btn-link dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <flag :iso="lang.code" /> {{ lang.detail }}
                </button>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    href="#"
                    @click.prevent="ChangeLanguage('us')"
                    ><flag iso="us" /> English</a
                  >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click.prevent="ChangeLanguage('cn')"
                    ><flag iso="cn" /> 简体中文</a
                  >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click.prevent="ChangeLanguage('vn')"
                    ><flag iso="vn" /> Việt Nam</a
                  >
                </div>
              </div>
              <div class="row align-items-center remember">
                <input type="checkbox" />{{ LoginLang.remember }}
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  :value="LoginLang.login"
                  class="btn float-right login_btn"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      GetUser: "getUser",
    }),
  },
  components: {},
  name: "login-app",
  data() {
    return {
      lang: { code: "us", detail: "English" },
      LoginLang: {
        sign_in: "Sign In",
        user_name: "User Name",
        pass_word: "Password",
        login: "Login",
        remember: "Remember Me",
      },
      user: {
        UserName: "",
        Password: "",
      },
    };
  },
  mounted() {
    this.ChangeLanguage(this.lang_code);
  },
  methods: {
    ...mapActions(["Login"]),
    ChangeLanguage: function (lg) {
      this.lang.code = lg;
      switch (lg) {
        case "us":
          this.LoginLang = {
            sign_in: "Sign In",
            user_name: "User Name",
            pass_word: "Password",
            login: "Login",
            remember: "Remember Me",
          };
          this.lang.detail = "English";
          break;
        case "cn":
          this.LoginLang = {
            sign_in: "登入",
            user_name: "用户",
            pass_word: "密码",
            login: "登录",
            remember: "记得我",
          };
          this.lang.detail = "简体中文";
          break;
        case "vn":
          this.LoginLang = {
            sign_in: "Đăng Nhập",
            user_name: "Tài Khoản",
            pass_word: "Mật Khẩu",
            login: "Đăng Nhập",
            remember: "Ghi Nhớ Đăng Nhập",
          };
          this.lang.detail = "Việt Nam";
          break;
        default:
          break;
      }
    },
    CheckLogin: function () {
      const loading = this.$Loading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.Login(this.user)
        .then(() => {
          this.$router.push("/home");
          loading.close();
        })
        .catch((err) => {
          this.user.Password = "";
          if (err.response) {
            console.log(err.response.data);
            alert(err.response.data);
          } else alert(err);
          loading.close();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  background-image: url("../assets/niceBlurCity.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  font-family: "Numans", sans-serif;
  min-height: 100vh; /*specify min-height css property to Screen size */
}
@media only screen and (max-height: 800px) {
  #login {
    min-height: 650px;
  }
}

@media only screen and (min-height: 900px) {
  #login {
    min-height: 1080px;
  }
}
.laguage-bar {
  margin-bottom: 5px;
  margin-left: -260px;
}

.container {
  height: 100%;
  align-content: center;
}

.card {
  height: 370px;
  margin-top: 10%;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #ffc312;
}

.social_icon span:hover {
  color: white;
  cursor: pointer;
}

.card-header h3 {
  color: white;
}

.social_icon {
  position: absolute;
  right: 20px;
  top: -45px;
}

.input-group-prepend span {
  width: 50px;
  background-color: #ffc312;
  color: black;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn {
  color: black;
  background-color: #ffc312;
  width: 100px;
}

.login_btn:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
}
</style>
