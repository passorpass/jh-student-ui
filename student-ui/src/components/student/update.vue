<template>
    <div class="container">
        <el-button @click="goBack" type="text"
                   class="back-button" style="border: none"><el-icon><ArrowLeft/></el-icon>返回
        </el-button> <!-- 添加一个返回按钮
         -->
        <div class="cherry-blossom">
            <div class="avatar">
                <!-- Avatar image goes here -->
            </div>
            <div class="details">
                <h2>名字：{{ StudentInfo.studentName }}</h2>
                <p>年龄：{{ StudentInfo.studentAge }}</p>
                <p>性别：{{ StudentInfo.studentSex }}</p>
            </div>
        </div>
        <div class="divider"></div> <!-- Divider -->
        <div class="light-blue">
            <div class="white-box">
                <!-- Content goes here -->
            </div>
            <div class="green-box">
                <!-- Content goes here -->
            </div>
        </div>
    </div>
</template>

<script>
import caches from "@/utils/cache.js";
import {ArrowLeft} from "@element-plus/icons";

export default {
    components: {ArrowLeft},
    data() {
        return {
            StudentInfo: {}, // 学生信息列表数据
        };
    },

    methods: {
        goBack() {
            // 返回上一页
            this.$router.go(-1);
        },

        getStudentInfo() {
            this.StudentInfo = caches.session.getJSON("studentinfo");
        },
    },

    mounted() {
        // 获取学生信息
        this.getStudentInfo();
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-around; /* Adjust horizontal spacing */
    align-items: center; /* Center content vertically */
    height: 100vh; /* Match viewport height */
}

.back-button {
    position: absolute; /* 设置按钮位置为绝对定位 */
    top: 20px; /* 距离顶部 20px */
    left: 20px; /* 距离左侧 20px */
    color: black; /* 设置按钮文字颜色为黑色 */
    /*background-color: rgba(255, 204, 229, 0.5); !* Semi-transparent cherry blossom color *!*/
}

.cherry-blossom,
.light-blue,
.white-box,
.green-box {
    width: 65vw; /* 65% of the viewport width */
    height: 100%; /* Match container height */
    display: flex;
    flex-direction: column; /* Stack content vertically */
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
}

.cherry-blossom {
    width: 35vw; /* 35% of the viewport width */
    height: 100%; /* Match container height */
    background-color: rgba(255, 204, 229, 0.5); /* Semi-transparent cherry blossom color */
    margin-right: 20px; /* Adjust spacing */
}

.light-blue {
    background-color: #B3E5FC; /* 淡蓝色 */
}

.white-box {
    width: 100%; /* Full width */
    height: 50%; /* Half of container height */
    background-color: #fff; /* White */
}

.green-box {
    width: 100%; /* Full width */
    height: 50%; /* Half of container height */
    background-color: #00FF00; /* Green */
}

.avatar {
    width: 300px; /* Adjust size of the avatar */
    height: 300px; /* Adjust size of the avatar */
    background-color: #fff; /* White background */
    border-radius: 50%; /* Make it circular */
    /* You can add background image here */
}

.details {
    text-align: center; /* Center text */
    margin-top: 20px; /* Adjust spacing */
}

.divider {
    margin-right: 10px;
    width: 5px;
    height: 80%; /* Adjust height of the divider */
    background-color: rgba(255, 204, 229, 0.5); /* Semi-transparent cherry blossom color */
}
</style>
