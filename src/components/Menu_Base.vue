<template>
<div class="home_container">
    <el-container class="home_container">
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="" />
                <span @click="$router.push('/wellcome')">CPBG MES-VN</span>
            </div>
            <div>
                <nav>
                    <el-dropdown>
                        <span style="font-size: 1.3em; margin-top: 5px; cursor: pointer;" class="el-dropdown-link">
                            {{ UserName }}
                            <ArrowDown style="width: 1em; height: 1em; margin-bottom: -3px;" />
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <router-link to="#"><i class="icofont-ui-password"></i> Change Password</router-link>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <!-- <router-link to="/"><i class="icofont-logout"></i> Logout</router-link> -->
                                    <a href="#" @click.prevent="logout"><i class="icofont-logout"></i> Logout</a>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </nav>
            </div>
        </el-header>
        <el-container>
            <el-aside :width="!mColap ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse" id="toggle-button">
                    <Expand v-if=!mColap style="width: 2em; height: 2em; " />
                    <Fold v-if=mColap style="width: 2em; height: 2em; " />
                </div>
                <el-menu class="elmenu" background-color="#333744" text-color="#fff" active-text-color="#409eff" :unique-opened="true" :collapse=!mColap :collapse-transition="false" :router="true" :default-active="activePath">
                    <el-sub-menu index="1">
                        <template #title>
                            <i class="icofont-doctor-alt"></i>
                            <span>FA Documents</span>
                        </template>
                        <el-menu-item-group title="Training Doc">
                            <el-menu-item index="/fasop"><i class="icofont-book"></i> Repair SOP</el-menu-item>
                            <el-menu-item index="/sopmana"><i class="icofont-hour-glass"></i> SOP Management</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-menu-item index="2" disabled>
                        <i class="icofont-repair"></i>
                        <span>Maintenance Area</span>
                    </el-menu-item>
                    <el-menu-item index="/about">
                        <i class="icofont-code"></i>
                        <span>Development Team</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
import {
    mapGetters,mapActions
} from "vuex";

export default {
    computed: {
        ...mapGetters({
            GetUser: "getUser"
        }),
    },
    mounted(){
        if(this.GetUser) this.UserName=this.GetUser.Name;
    },
    name: 'menu-bar',
    data() {
        return {
            mColap: true,
            UserName:''
        }
    },
    methods: {
        ...mapActions(['Logout']),
        logout: function () {
            this.Logout();
        },
        toggleCollapse: function () {
            this.mColap = !this.mColap;
        }
    }
}
</script>

<style lang="scss" scoped>
.elmenu {
    i {
    margin-right: 3px;
    font-size: 1.3em;
    color: rgb(255, 252, 57);
}
}

i:active {
    color: red;
}

.el-header {
    background-color: #37314d;
    display: flex;
    justify-content: space-between;
    padding-left: 0%;
    align-items: center;
    color: #fff;
    font-size: 20px;
}

.el-header>div {
    display: flex;
    align-items: center;
}

.el-header>div>span {
    margin-left: 15px;
    cursor: pointer;
}

.drawer__footer {
    display: flex;
    align-items: center;
}

.el-header>div>img {
    height: 60px;
    background-color: #eee
}

.el-aside {
    background-color: #333744;
}

.el-aside>.el-menu {
    border-right: none;
}

.el-main {
    background-color: #1f144b;
    // background-color: #eaedf1;
}

.home_container {
    height: 100%;
}

.el-submenu {
    text-align: left;
}

.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
    width: auto;
}

.el-button {
    margin-left: 15px;
}

.drawer {
    padding-top: 10px;

    span {
        text-align: center;
    }
}

.drawer_content {
    padding: 20px;
}

.el-col {
    padding: 10px;
}

.el-icon-position {
    color: #eee;
    size: 50px;
}

.drop_item {
    font-size: 20px;
}

.el-icon-position {
    cursor: pointer;
}
</style>
