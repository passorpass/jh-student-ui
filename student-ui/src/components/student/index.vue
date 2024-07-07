<template>
    <div>
        <!-- 搜索条件 -->
        <div class="search-container">
            <el-form :model="searchForm" inline>
                <el-form-item label="关键信息搜索">
                    <el-input v-model="searchForm.keyName"
                              placeholder="请输入学生姓名或就读学校"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="searchForm.beginSchoolDate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="searchForm.endSchoolDate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="社会面貌" style="width: 200px">
                    <el-select v-model="searchForm.socialPresence" placeholder="请选择">
                        <el-option label="群众" value="群众"></el-option>
                        <el-option label="团员" value="团员"></el-option>
                        <el-option label="党员" value="党员"></el-option>
                        <el-option label="预备党员" value="预备党员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">搜索</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 学生信息列表 -->
        <div class="student-list">
            <!-- 表格 -->
            <el-table :data="studentList" stripe>
                <el-table-column prop="studentId" label="编号"></el-table-column>
                <el-table-column prop="studentName" label="学生姓名"></el-table-column>
                <el-table-column prop="studentAge" label="学生年龄"></el-table-column>
                <el-table-column prop="studentSex" label="性别"></el-table-column>
                <el-table-column prop="studentSocialPresence" label="社会面貌"></el-table-column>
                <el-table-column prop="studentAddress" label="家庭地址"></el-table-column>
                <el-table-column prop="studentPhone" label="电话号码"></el-table-column>
                <el-table-column prop="studentBeginSchool" label="入学时间"></el-table-column>
                <el-table-column prop="studentHasSchool" label="就读学校"></el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="text" @click="showDetail(row.studentId)">详情</el-button>
                        <el-button type="text" @click="edit(row.studentId)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>

import {getStudentInfoById, getStudentInfodata} from "@/api/studentapi.js";
import { parseTime } from "@/utils/timeFormate.js";
import caches from "@/utils/cache.js"

export default {
    data() {
        return {
            searchForm: {
                keyName: '',
                beginSchoolDate: '',
                endSchoolDate: '',
                socialPresence: ''
            },
            studentList: [], // 学生信息列表数据
            total: 100, // 总数据条数
            currentPage: 1, // 当前页数
            pageSize: 10 // 每页显示条数
        };
    },
    methods: {

        // 重置搜索条件
        reset() {
            this.searchForm = {
                keyName: '',
                beginSchoolDate: '',
                endSchoolDate: '',
                socialPresence: ''
            };
            this.fetchStudentList();
        },


        // 获取学生信息列表数据
        async fetchStudentList() {
            // 解析和格式化日期函数


            const params = {
                page: this.currentPage,
                pageSize: this.pageSize,
                keyName: this.searchForm.keyName,
                beginSchoolDate: parseTime(this.searchForm.beginSchoolDate),
                endSchoolDate: parseTime(this.searchForm.endSchoolDate),
                socialPresence: this.searchForm.socialPresence
            };

            try {
                const response = await getStudentInfodata(params);
                // 更新学生信息列表数据
                this.studentList = response.data.records;
                this.total = response.data.total;
            } catch (error) {
                console.error('获取学生信息列表数据失败:', error);
            }
        },

        // 分页：每页条数变化
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchStudentList();
        },
        // 分页：当前页数变化
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchStudentList();
        },
        // 查看学生详情
        showDetail(studentId) {
            getStudentInfoById(studentId)
                .then(data =>{
                   //保存回写的学生数据
                    caches.session.setJSON("studentinfo",data.data)
                })
            console.log(studentId)
            // 获取要导航的路径
            const path = `/update/${studentId}`; // 假设目标路由为 /student/:id
            // 使用router.push()方法打开新页面
            this.$router.push({ path: path });
        },
        // 编辑学生信息
        edit(student) {
            // 获取要导航的路径
            const path = `/update/${student.studentId}`; // 假设要打开名为detail的路由，并且需要传递学生的ID作为参数

            // 使用router.push()方法打开新页面
            // this.$router.push({ path: path });
        },

        // 搜索学生信息
        search() {
            if ((this.searchForm.beginSchoolDate && !this.searchForm.endSchoolDate) ||
                (!this.searchForm.beginSchoolDate && this.searchForm.endSchoolDate)) {
                // 如果只选择了一个时间，清除时间搜索条件
                this.$message.warning('开始时间和结束时间需同时选择，否则无法进行搜索');
                this.searchForm.beginSchoolDate = '';
                this.searchForm.endSchoolDate = '';
            }
            this.fetchStudentList();
        }
    },
    mounted() {
        // 初始化时获取学生信息列表
        this.fetchStudentList();
    }
};
</script>

<style scoped>
.search-container {
    margin-bottom: 10px;
}

</style>
