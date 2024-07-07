<template>
    <div class="login-container">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px" class="login-form">
            <h2 class="title">管理员登录</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import {Login} from "@/api/login.js";
import {setToken , getToken} from "@/utils/auth.js";
import caches from "@/utils/cache.js"

export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            loginRules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            },
            responseData: ""
        };
    },

    methods: {
        login() {
            // 表单验证
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    // 表单验证通过，发送登录请求
                    Login(this.loginForm)
                        .then(data => {
                            this.$message.success("登录成功");
                            // 获取返回的 token
                            const token = data.data.token;
                            // 将 token 保存到 Cookie 中
                            setToken(token);
                            caches.local.setJSON("admin", data.data);
                            setTimeout(() => {
                                this.$router.push("welcome");
                            }, 1000);
                        })
                        .catch(error => {
                            console.error("登录失败:", error);
                        });
                } else {
                    // 表单验证不通过，显示错误提示
                    this.$message.error("请输入用户名和密码");
                }
            });
        }
    }
};
</script>

<style scoped>

html, body {
    margin: 0;
    padding: 0;
}

.title {
    text-align: center; /* 居中标题 */
}

.login-container {
    display: flex;
    justify-content: flex-end; /* 将登录框放置在页面的右侧 */
    align-items: center; /* 垂直居中 */
    height: 92vh; /* 设置容器高度为视口高度，保证背景图片铺满整个页面 */
    background-image: url("@/assets/img/background(1).png");
    background-size: cover;
    background-position: center;
    padding: 20px;
}

.login-form {
    width: 400px;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2); /* 添加半透明边框 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
</style>
