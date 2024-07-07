<template>
    <el-dropdown>
        <span>下拉菜单触发</span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮鞋</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script>

export default {
    name:"index",
    methods: {
        handleCommand(command) {
            console.log('选中了:', command);
            // 在这里你可以编写处理选项点击事件的代码
        }
    }
}
</script>
