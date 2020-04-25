<template>
  <div class>
    <!-- 输入添加 -->
    <div>
      <el-input
        size="small"
        class="input_type"
        v-model="pos.name"
        placeholder="添加职位..."
        prefix-icon="el-icon-plus"
        @keydown.enter.native="addPosition"
      ></el-input>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addPosition">添加</el-button>
    </div>

    <!-- 显示数据表格 -->
    <div>
      <el-table :data="positions" stripe border type="small" style="width: 70%">
       <el-table-column type="selection" width="55"></el-table-column>
       <el-table-column prop="id" label="编号" width="56"></el-table-column>
       <el-table-column prop="name" label="职称名称" width="180"></el-table-column>
       <el-table-column prop="createDate" label="创建时间" width="200"></el-table-column>
       <el-table-column prop="right" label="操作">
         <template slot-scope="">
           <el-button size="small">编辑</el-button>
           <el-button type="danger" size="small">删除</el-button>
         </template>
       </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Position",
  data() {
    return {
      pos: {
        name: ""
      },
      positions: []
    };
  },
  methods: {
    async initPositions () {
      // 记得最后的要加斜杠/
      const data = await this.getRequest('/system/basic/pos/');
      if (data) {
        this.positions = data.obj;
      }
    },
    async addPosition() {
      if (this.pos.name) {
        // 记得最后的要加斜杠
        const resp = await this.postRequest("/system/basic/pos/", this.pos);
        if (resp) {
          this.initPositions();
          this.pos.name = "";
        }
      } else {
        this.$message.warning("职称名称不能为空");
      }
    }
  },
  mounted () {
    this.initPositions();
  }
};
</script>

<style lang='scss' scoped>
//@import url()
.input_type {
  width: 300px;
  margin-right: 8px;
  margin-bottom: 16px;
}
.update_input {
  width: 200px;
  margin-left: 8px;
}
</style>