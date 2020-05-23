<template>
  <div class>
    <!-- 输入添加 -->
    <div>
      <el-input
        size="small"
        class="input_type"
        v-model="train.trainContent"
        placeholder="添加培训记录的培训内容..."
        prefix-icon="el-icon-plus"
        @keydown.enter.native="addTrain"
      ></el-input>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addTrain">添加</el-button>
    </div>

    <!-- 显示数据表格 -->
    <div>
      <el-table
        :data="trains"
        stripe
        border
        type="mini"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="56"></el-table-column>
        <el-table-column prop="id" label="编号" width="56"></el-table-column>
        <el-table-column prop="eid" label="员工编号" width="56"></el-table-column>
        <el-table-column prop="trainDate" label="培训日期" width="150"></el-table-column>
        <el-table-column prop="trainContent" label="培训内容" width="90"></el-table-column>
        <el-table-column prop="remark" label="备注" width="56"></el-table-column>
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
    <el-dialog title="修改培训记录" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-tag>培训内容</el-tag>
        <el-input class="update_input" size="small" v-model="updateTrain.trainContent"></el-input>
      </div>
       <div>
        <el-tag>备注</el-tag>
        <el-input class="update_input" size="small" v-model="updateTrain.remark"></el-input>
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
  name: "PerTrain",
  data() {
    return {
      // 添加输入框的数据
      train: {
        trainContent: ""
      },
      // 表格显示的数据
      trains: [],
      // 更新按钮的数据
      updateTrain: {
        trainContent: "",
        remark: ""
      },
      // 对话框显示与否的标志位
      dialogVisible: false,
      // 批量删除的数据记录
      multipleSelection: []
    };
  },
  methods: {
    // 表格数据初始化处理
    async initTrains() {
      // 记得最后的要加斜杠/
      const data = await this.getRequest("/per/train/");
      if (data) {
        this.trains = data.obj;
      }
    },
    // 添加新记录的事件处理
    async addTrain() {
      if (this.train.trainContent) {
        // 记得最后的要加斜杠
        const resp = await this.postRequest("/per/train/", this.train);
        if (resp) {
          this.initTrains();
          this.train.trainContent = "";
        }
      } else {
        this.$message.warning("培训内容不能为空");
      }
    },
    // 显示修改对话框
    showEditDialog(index, data) {
      // this.updateTrain = data //浅拷贝会改变表格的记录
      Object.assign(this.updateTrain, data); //使用深拷贝
      this.dialogVisible = true;
    },
    // 弹框确认修改的事件处理
    async doUpdate() {
      const resp = await this.putRequest("/per/train/", this.updateTrain);
      if (resp) {
        this.initTrains();
        this.updateTrain.trainContent = "";
        this.dialogVisible = false;
      }
    },
    // 表格记录的删除按钮的事件处理
    handleDelete(index, data) {
      this.$confirm(
        "此操作将永久删除" + data.trainContent + "记录，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cacelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deleteRequest("/per/train/" + data.id).then(resp => {
            this.initTrains();
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
          "条培训记录，是否继续？",
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
            ids += "ids=" + item.id + "&";
          });
          this.deleteRequest("/per/train/" + ids).then(resp => {
            this.initTrains();
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
    this.initTrains();
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
  margin: 0 0 8px 8px;
}
</style>