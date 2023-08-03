import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "../components/NewLogin.vue";
import wellcome from "../components/Wellcome.vue";
import home from '../components/Menu.vue';
import testmenu from '../components/Menu_Base.vue';
import about from '../components/About.vue'
import fa_sop from '../components/FAComs/RepairSOP.vue'
import newstep from '../components/FAComs/NewStep.vue'
import testcom from '../components/TestComponents.vue'
import sopmana from '../components/FAComs/SopManagement.vue'
import menumana from '../components/AdminArea/MenuManage.vue'
import mainten from '../components/Maintenance.vue'
import clock_snap from '../components/clock_snap.vue'
import VueCookies from 'vue-cookies'
import mediamana from '../components/MediaArea/ContentsManage.vue'
import playback from '../components/MediaArea/MediaPlayer.vue'
import sktest from '../components/SocketCom/TestSocket.vue'
import chatbox from '../components/QMessage/ChatBox.vue'
import ctlsender from '../components/QMessage/MsgSender.vue'
import grpifo from '../components/QMessage/GroupInfo.vue'
import imgm from '../components/testComponent.vue'

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/testmenu",
    name: "testmenu",
    component: testmenu,
  },
  {
    path: "/home",
    name: "home",
    component: home,
    redirect: "/wellcome",
    children: [
      {
        path: "/imgm",
        name: "imgm",
        component: imgm,
      },
      {
        path: '/langtrans',
        name: 'langtrans',
        component: () =>
            import ('../components/MesUtitils/langTrans.vue')
    },
      {
        path: "/grpifo",
        name: "grpifo",
        component: grpifo,
      },
      {
        path: "/ctlsender",
        name: "ctlsender",
        component: ctlsender,
      },
      {
        path: "/chatbox",
        name: "chatbox",
        component: chatbox,
      },
      {
        path: "/sktest",
        name: "sktest",
        component: sktest,
      },
      {
        path: "/mediamana",
        name: "mediamana",
        component: mediamana,
      },
      {
        path: "/sosplay",
        name: "playback",
        component: playback,
      },
      {
        path: "/wellcome",
        name: "wellcome",
        component: wellcome,
      },
      {
        path: "/mainten",
        name: "mainten",
        component: mainten,
      },
      {
        path: "/menumana",
        name: "menumana",
        component: menumana,
      },
      {
        path: "/about",
        name: "about",
        component: about
      },
      {
        path: "/fasop",
        name: "fasop",
        component: fa_sop
      },
      {
        path: "/testcom",
        name: "testcom",
        component: testcom
      },
      {
        path: "/sopmana",
        name: "sopmana",
        component: sopmana
      },
      {
        path: "/newstep",
        name: "newstep",
        component: newstep
      },
      {
        path: "/clocksnap",
        name: "clocksnap",
        component: clock_snap
      }
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),//createWebHistory(),
  routes: routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  if (to.name !== "login") {
    const vuex = VueCookies.get('vuex');

    if (!sessionStorage.getItem("isLogin") || !vuex || !vuex.user || !vuex.user.LOGIN_TIME) {
      console.log('Relogin');
      next({ name: "login" });
    }

    const now = new Date();
    const future = new Date(vuex.user.LOGIN_TIME);

    const loginHour = (now.getTime() - future.getTime()) / (1000 * 60 * 60);
    if (loginHour > 6) {
      console.log('Relogin');
      next({ name: "login" });
    } else
      next();
  }
  else next();
});
export default router;