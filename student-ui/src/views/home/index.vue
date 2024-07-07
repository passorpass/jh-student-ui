<template>
    <div>
        <!-- 导航栏 -->
        <el-header>
            <!-- 左侧标题 -->
            <div class="navbar-left">京海学生管理系统</div>

            <!-- 右侧用户信息和退出按钮 -->
            <div class="navbar-right">
                <!-- 用户头像和昵称 -->
                <el-avatar :src="user.avatar" :size="36" circle></el-avatar>
                <span>{{ user.nickname }}</span>

                <!-- 下拉菜单 -->
                <el-dropdown>
                    <el-icon style="margin-top: 24px">
                        <ArrowDown/>
                    </el-icon>
                    <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-header>

        <!-- 主内容区域 -->
        <el-container>
            <el-aside width="180px">
                <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
                    <el-menu-item v-for="route in routes" :key="route.path" :index="route.path">{{ route.name }}</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import {Logout} from "@/api/login.js";
import {removeToken} from "@/utils/auth.js";
import caches from "@/utils/cache.js";

export default {
    data() {
        return {
            user: {
                avatar: '',
                nickname: '未登录'
            },
            routes: [
                { path: '/welcome', name: '首页' },
                { path: '/student', name: '学生信息' },
                { path: '/teach', name: '老师信息' },
                { path: '/grades', name: '成绩信息' },
                { path: '/course', name: '课程信息' },
                { path: '/analysis', name: '数据分析' }
            ]
        };
    },
    mounted() {
        this.user.nickname = caches.local.getJSON("admin").desc
        this.user.avatar = caches.local.getJSON("admin").avatar
    },
    methods: {
        handleSelect(key) {
            this.$router.push(key); // 根据选中的菜单项切换路由
        },

        logout() {
            Logout()
                .then(data =>{
                    removeToken()
                    caches.local.remove("admin")
                    this.$message.success("退出成功")
                    setTimeout(() => {
                        this.$router.push("/");
                    }, 1000);
                })
        }
    }
};
</script>

<style scoped>
.el-menu-vertical-demo {
    width: 100%;
}

.navbar-left {
    float: left;
    padding: 0 20px;
    line-height: 60px;
    font-size: 20px;
}

.navbar-right {
    float: right;
    margin-right: 20px;
    line-height: 60px;
}

.navbar-right .el-avatar {
    margin-right: 10px;
    vertical-align: middle;
}
</style>
