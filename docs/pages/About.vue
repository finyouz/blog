<template>
    <el-timeline style="max-width: 600px">
        <el-timeline-item timestamp="2020/09/15" placement="top">
            <el-card>
                <h4>江西科技学院</h4>
                <p>第14届蓝桥杯web应用开发江西赛区二等奖 ---2023.4.10</p>
            </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2024/3/1" placement="top">
            <el-card>
                <h4>中大网校教育科技有限公司</h4>
                <p>职位：前端实习生</p>
                <div class="content_content">
                    <p class="shixi_content">实习内容:
                    </p>
                    <p class="main_content">
                        <p class="main1">1.参与前端项目开发，如后台管理系统、小程序</p>
                        <p class="main2">2.根据产品提供原型图、ui设计图,完成页面的开发</p>
                        <p class="main3">3.与后端工程师进行联调，确保整个开发流程的协调和顺畅</p>
                    </p>
                </div>
            </el-card>
        </el-timeline-item>
    </el-timeline>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.vp-doc ul{
    list-style: none;
}
.content_content{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .shixi_content{
        flex: 1;
        display: flex;
        margin-top: 8px;
    }
    .main_content{
        flex: 5;
        display: flex;
        flex-direction: column;
        p{
            height: 30px;
        }
    }

}
.vp-doc p, .vp-doc summary {
    margin: 4px 0;
}
</style>
