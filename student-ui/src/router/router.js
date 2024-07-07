import { createRouter, createWebHashHistory } from 'vue-router';

import Course from "@/components/course/index.vue";
import Grades from "@/components/grades/index.vue";
import Student from "@/components/student/index.vue";
import Analysis from "@/components/analysis/index.vue";
import Welcome from "@/components/welcome/index.vue";
import Teacher from "@/components/teacher/index.vue";

const router = createRouter({
    history: createWebHashHistory(),
    /**
     * 路由项结构：
     *{
      path: "/",//路径，（必选；path、name、component是路由规定必选的元素）
                  也可以带参数，如 path: "/resource/detail/:id",
      name: "路由名称，是路由唯一标识",（必选）
      component: 指向组件，如 Home,或者() => import("../views/login/PageIndex.vue")，（必选）
      meta: {//meta里的属性可以自定义，全部为可选项
        text: "名称",//展示在菜单里，（可选）
        navi: true, //导航条(一级菜单)，（可选）
        noLogin: true, //无须登录即可浏览，（可选）
        access: "work:sysmanage,work:resourcemanage",//权限标识，（可选）
      },
      children: [],
    },
     */
    routes: [
        {
            path:"/",
            component:() => import("@/components/login/UserLogin.vue")
        },
        {
            path: "/user",
            component: () => import("@/components/login/UserLogin.vue")
        },
        {
            path: "/home",
            name: 'Home',
            component: () => import("@/views/home/index.vue"),
            children: [
                { path: '/welcome',name: 'welcome', component: Welcome },
                { path: '/student', name: 'student',component: Student },
                { path: '/course', name: 'course',component: Course },
                { path: '/grades', name: 'grades',component: Grades },
                { path: '/analysis',name: 'analysis', component: Analysis },
                { path: '/teach',name: 'teacher', component: Teacher }
            ]
        },
        {
            path: "/update/:id",
            name: "update",
            meta: {
                noLogin: true
            },
            component: ()=>import("@/components/student/update.vue")
        },

    ]
});

export default router;
