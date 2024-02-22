<template>
  <div id="login" class="q-pa-md">
    <div class="lgCard q-gutter-y-md column">
      <div class="header">
        <h3>Sign In</h3>
        <hr />
      </div>
      <q-input
        :disable="MyLoading"
        outlined
        label-color="purple-12"
        color="purple-12"
        filled
        v-model="user.UserName"
        label="User Name"
        clearable
        @keydown.enter="CheckUserName"
        ref="txtUserName"
        autofocus
        input-style="color: #ebdb9e"
      >
        <template v-slot:prepend>
          <q-icon color="purple-12" name="account_circle" />
        </template>
      </q-input>

      <q-input
        input-style="color: #ebdb9e"
        :disable="MyLoading"
        outlined
        label-color="teal"
        color="teal"
        filled
        v-model="user.Password"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        ref="txtPassword"
        @keydown.enter="CheckLogin"
      >
        <template v-slot:prepend>
          <q-icon color="teal" name="vpn_key" />
        </template>
        <template #append>
          <q-icon
            v-show="user.Password.length > 0"
            name="visibility"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
      <div>
        <q-btn
          :loading="MyLoading"
          color="primary"
          style="width: 150px"
          @click="CheckLogin"
        >
          Login
          <template v-slot:loading>
            <q-spinner-gears class="on-left" />
            Processing...
          </template>
        </q-btn>
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
  mounted() {
    sessionStorage.removeItem("Avatar");
  },
  data() {
    return {
      showPassword: false,
      requiredRule: [(val) => val !== "" || "This field is required"],
      user: { UserName: "", Password: "" },
      MyLoading: false,
    };
  },
  methods: {
    ...mapActions(["Login"]),
    CheckUserName() {
      if (this.user.UserName.length > 0) {
        this.$refs.txtPassword.focus();
      }
    },
    CheckLogin: function () {
      if (this.user.UserName.length <= 0) {
        alert("UserName cannot be empty!");
        this.$refs.txtUserName.focus();
        return;
      }
      if (this.user.Password.length <= 0) {
        alert("Password cannot be empty!");
        this.$refs.txtPassword.focus();
        return;
      }
      this.MyLoading = true;
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
          this.MyLoading = false;
          this.user.Password = "";
          if (err.response) {
            console.log(err.response.data);
            alert(err.response.data);
          } else alert(err);
          loading.close();
          setTimeout(() => {
            this.$refs.txtUserName.focus();
            this.$refs.txtUserName.select();
          }, 100);
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
  position: relative;
}
.lgCard {
  position: absolute;
  height: 400px;
  width: 400px;
  background-color: #20284c;
  top: 15%;
  left: 40%;
  .header {
    h3 {
      margin: 0;
      color: white;
    }
    hr {
      border-color: #000;
    }
  }
}
</style>