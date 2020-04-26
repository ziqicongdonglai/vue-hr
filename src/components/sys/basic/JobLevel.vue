<template>
  <div class>
    <!-- 输入添加 -->
    <div>
      <el-input
        size="small"
        class="input_type"
        v-model="job.name"
        placeholder="添加职称..."
        prefix-icon="el-icon-plus"
        @keydown.enter.native="addJob"
      ></el-input>
      <!-- 职称选择 -->
      <!-- <el-input placeholder="职称等级" size="small" class="input_type"> -->
      <el-dropdow trigger="click">
        <span class="el-dropdown-link">
          <el-input
            placeholder="职称等级"
            size="small"
            class="input_type"
            suffix-icon="el-icon-arrow-down el-icon--right"
          ></el-input>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command>正高级</el-dropdown-item>
          <el-dropdown-item command>副高级</el-dropdown-item>
          <el-dropdown-item command>中级</el-dropdown-item>
          <el-dropdown-item command>初级</el-dropdown-item>
          <el-dropdown-item command>员级</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdow>
      <!-- </el-input> -->
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addJob">添加</el-button>
    </div>

    <!-- 显示数据表格 -->
    <div>
      <el-table
        :data="jobs"
        stripe
        border
        type="small"
        style="width: 70%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="56"></el-table-column>
        <el-table-column prop="name" label="职称名称" width="180"></el-table-column>
        <el-table-column prop="titleLevel" label="职称级别" width="180"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="right" label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="danger"
        size="small"
        style="margin-top: 8px"
        @click="deleteMany"
        :disabled="multipleSelection.length === 0"
      >批量删除</el-button>
    </div>
    <el-dialog title="修改职称" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-tag>职称名称</el-tag>
        <el-input class="update_input" size="small" v-model="updateJobs.name"></el-input>
      </div>
      <div>
        <el-tag>职称级别</el-tag>
        <!-- <el-input class="update_input" size="small" v-model="updateJobs.titleLevel"></el-input> -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-input
              size="small"
              class="input_type"
              suffix-icon="el-icon-arrow-down el-icon--right"
              v-model="updateJobs.titleLevel"
            ></el-input>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command>正高级</el-dropdown-item>
            <el-dropdown-item command>副高级</el-dropdown-item>
            <el-dropdown-item command>中级</el-dropdown-item>
            <el-dropdown-item command>初级</el-dropdown-item>
            <el-dropdown-item command>员级</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisable=false" size="small">取消</el-button>
        <el-button type="primary" @click="doUpdate" size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "JobLevel",
  data() {
    return {
      // 添加输入框的数据
      job: {
        name: ""
      },
      // 表格显示的数据
      jobs: [],
      // 职称等级
      // joblevel: [
      //   '正高级',
      //   '副高级',
      //   '中级',
      //   '初级',
      //   '员级'
      // ],
      // 更新按钮的数据
      updateJobs: {
        name: ""
      },
      // 对话框显示与否的标志位
      dialogVisible: false,
      // 批量删除的数据记录
      multipleSelection: []
    };
  },
  methods: {
    // 表格数据初始化处理
    async initJobs() {
      // 记得最后的要加斜杠/
      const data = await this.getRequest("/system/basic/job/");
      if (data) {
        this.jobs = data.obj;
      }
    },
    // 添加新记录的事件处理
    async addJob() {
      if (this.job.name) {
        // 记得最后的要加斜杠
        const resp = await this.postRequest("/system/basic/job/", this.job);
        if (resp) {
          this.initJobs();
          this.job.name = "";
        }
      } else {
        this.$message.warning("职称名称不能为空");
      }
    },
    // 显示修改对话框
    showEditDialog(index, data) {
      // this.updateJobs = data //浅拷贝会改变表格的记录
      Object.assign(this.updateJobs, data); //使用深拷贝
      this.dialogVisible = true;
    },
    // 弹框确认修改的事件处理
    async doUpdate() {
      const resp = await this.putRequest("/system/basic/job/", this.updateJobs);
      if (resp) {
        this.initJobs();
        this.updateJobs.name = "";
        this.dialogVisible = false;
      }
    },
    // 表格记录的删除按钮的事件处理
    handleDelete(index, data) {
      this.$confirm(
        "此操作将永久删除" + data.name + "职称，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cacelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deleteRequest("/system/basic/job/" + data.id).then(resp => {
            this.initJobs();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 记录多选的处理
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // 批量删除
    deleteMany() {
      this.$confirm(
        "此操作将永久删除" +
          this.multipleSelection.length +
          "条记录，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cacelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          // 生成删除记录 id的查询字符串
          let ids = "?";
          this.multipleSelection.forEach(item => {
            ids += "ids" + item.id + "&";
          });
          this.deleteRequest("/system/basic/job/" + ids).then(resp => {
            this.initJobs();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  },
  // 在页面元素挂载后加载数据
  mounted() {
    this.initJobs();
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