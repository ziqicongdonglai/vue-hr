<template>
  <div class>
    <!-- 基础信息设置 -->
    <!-- 每个tab变成一个组件 components\sys\basic
    上面的是职位管理的位置 -->
    <!-- 拆分 简化到各个部分 -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="部门管理" name="first"><Department></Department></el-tab-pane>
      <el-tab-pane label="职位管理" name="second"><Position></Position></el-tab-pane>
      <el-tab-pane label="职称管理" name="third"><JobLevel></JobLevel></el-tab-pane>
      <el-tab-pane label="奖惩管理" name="fourth"><Reward></Reward></el-tab-pane>
      <el-tab-pane label="权限组" name="five"><Pemission></Pemission></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 引入tab下对应的各个组件
import Position from '../../components/sys/basic/Position'
import Department from '../../components/sys/basic/Department'
import Reward from '../../components/sys/basic/Reward'
import JobLevel from '../../components/sys/basic/JobLevel'
import Pemission from '../../components/sys/basic/Pemission'
export default {
  name: "SysBasic",
  data() {
    return {
      activeName: 'second'
    };
  },
  components: {
    Department,
    Position,
    JobLevel,
    Reward,
    Pemission
  }
};
</script>

<style lang='scss' scoped>
//@import url()
</style>