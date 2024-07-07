<template>
    <div>
        <!-- 搜索条件 -->
        <div class="search-container">
            <el-form :model="searchForm" inline>
                <el-form-item label="关键信息搜索">
                    <el-input v-model="searchForm.keyName"
                              placeholder="请输入老师姓名或就职学校"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                            v-model="searchForm.btime"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                            v-model="searchForm.etime"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="工作状态" style="width: 200px">
                    <el-select v-model="searchForm.status" placeholder="请选择">
                        <el-option label="离职" value="0"></el-option>
                        <el-option label="就职" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">搜索</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 老师信息列表 -->
        <div class="teacher-list">
            <!-- 表格 -->
            <el-table :data="teacherList" stripe>
                <el-table-column prop="teacherId" label="编号"></el-table-column>
                <el-table-column prop="teacherName" label="姓名"></el-table-column>
                <el-table-column prop="teacherAge" label="年龄"></el-table-column>
                <el-table-column prop="teacherSex" label="性别"></el-table-column>
                <el-table-column prop="teacherAddress" label="地址"></el-table-column>
                <el-table-column prop="teacherPhone" label="电话号码"></el-table-column>
                <el-table-column prop="doWorkSchool" label="就职学校"></el-table-column>
                <el-table-column prop="teacherYear" label="教龄"></el-table-column>
                <el-table-column prop="teacherPosition" label="职位"></el-table-column>
                <el-table-column prop="entrySchoolTime" label="入职时间"></el-table-column>
                <el-table-column prop="teacherStatus" label="状态">
                    <template #default="{ row }">
                        {{ row.teacherStatus === 1 ? '就职' : '离职' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="text" @click="showDetail(row.teacherId)">详情</el-button>
                        <el-button type="text" @click="edit(row.teacherId)">编辑</el-button>
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


import { parseTime } from "@/utils/timeFormate.js";
import {getTeacherInfodata} from "@/api/teacher.js";

export default {
    data() {
        return {
            searchForm: {
                keyName : '',
                btime   : '',
                etime   : '',
                status  : ''
            },
            teacherList: [], // 学生信息列表数据
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
                  btime  : '',
                  etime  : '',
                  status : '',
            };
            this.fetchTeacherList();
        },

        // 获取学生信息列表数据
        async fetchTeacherList() {
            // 解析和格式化日期函数
            const params = {
                page: this.currentPage,
                pageSize: this.pageSize,
                keyName: this.searchForm.keyName,
                btime: parseTime(this.searchForm.btime),
                etime: parseTime(this.searchForm.time),
                status: this.searchForm.status
            };

            try {
                const response = await getTeacherInfodata(params);
                // 更新学生信息列表数据
                this.teacherList = response.data.records;
                this.total = response.data.total;
            } catch (error) {
                console.error('获取老师信息列表数据失败:', error);
            }
        },

        // 分页：每页条数变化
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchTeacherList();
        },
        // 分页：当前页数变化
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchTeacherList();
        },
        // // 查看老师信息
        showDetail() {
            getStudentInfoById(teacherId)
                .then(data =>{
                    //保存回写的学生数据
                    caches.session.setJSON("studentinfo",data.data)
                })
            console.log(teacherId)
            // 获取要导航的路径
            const path = `/update/${teacherId}`; // 假设目标路由为 /student/:id
            // 使用router.push()方法打开新页面
            this.$router.push({ path: path });
        },
        // 编辑学生信息
        edit(teacherId) {
            // 获取要导航的路径
            const path = `/update/${teacherId}`; // 假设要打开名为detail的路由，并且需要传递学生的ID作为参数

            // 使用router.push()方法打开新页面
            // this.$router.push({ path: path });
        },

        // 搜老师生信息
        search() {
            if ((this.searchForm.btime && !this.searchForm.etime) ||
                (!this.searchForm.btime && this.searchForm.etime)) {
                // 如果只选择了一个时间，清除时间搜索条件
                this.$message.warning('开始时间和结束时间需同时选择，否则无法进行搜索');
                this.searchForm.btime = '';
                this.searchForm.etime = '';
            }
            this.fetchTeacherList();
        }
    },
    mounted() {
        // 初始化时获取学生信息列表
        this.fetchTeacherList();
    }
};
</script>

<style scoped>
.search-container {
    margin-bottom: 10px;
}

</style>
