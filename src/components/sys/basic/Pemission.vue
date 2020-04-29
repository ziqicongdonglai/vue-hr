<template>
  <div>
    <div class="permission_input">
      <el-input placeholder="请输入角色英文名" v-model="role.name" size="small">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input v-model="role.nameZh" placeholder="请输入角色中文名" size="small"></el-input>
      <el-button type="primary" size="small" icon="el-icon-plus">添加角色</el-button>
    </div>
    <div class="permission_main">
      <el-collapse v-model="activeName" accordion size="small" @change="changeMenu">
        <el-collapse-item
          :title="item.nameZh"
          :name="item.id"
          v-for="(item, index) in roles"
          :key="item.id"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问资源</span>
              <el-button style="float: right; padding: 3px 0; color: #ff0000" icon="el-icon-delete"></el-button>
            </div>
            <div>
              <el-tree
                :data="allMenus"
                :props="defaultProps"
                ref="tree"
                show-checkbox
                node-key="id"
                :default-checked-keys="selectedMenus"
              ></el-tree>
              <div style="display: flex; justify-content: flex-end">
                <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
                <el-button size="mini" type="primary" @click="doUpdate(item.id, index)">确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>


<script>
export default {
  name: "Pemission",
  data() {
    return {
      //  添加功能的表单元素的数据
      role: {
        name: "",
        nameZh: ""
      },
      // 面板激活项
      activeName: -1,
      // 角色数组
      roles: [],
      // 每个角色的权限树数据
      allMenus: [],
      // 数据配置项名称与后端数据的属性名称匹配
      defaultProps: {
        children: "children",
        label: "name"
      },
      // 选中菜单的 id数组
      selectedMenus: []
    };
  },
  mounted() {
    this.initRoles();
  },
  methods: {
    // 获取角色初始化列表
    initRoles() {
      this.getRequest("/system/basic/permiss/").then(resp => {
        if (resp) {
          this.roles = resp.obj;
        }
      });
    },
    // 折叠免费展开时加载菜单数据
    changeMenu(rid) {
      if (rid) {
        this.initAllMenus();
        this.initSelectedMenus(rid);
      }
    },
    // 初始化三级菜单列表
    initAllMenus() {
      this.getRequest("system/basic/permiss/menus/").then(resp => {
        if (resp) {
          console.log(resp);
          this.allMenus = resp.obj;
        }
      });
    },
    // 初始化角色对应的菜单资源
    initSelectedMenus(rid) {
      this.getRequest("/system/basic/permiss/mid/" + rid).then(resp => {
        if (resp) {
          console.log(resp);
          this.selectedMenus = resp.obj;
        }
      });
    },
    // 更新权限
    doUpdate(rid, index) {
      let tree = this.$refs.tree[index];
      var selectedKeys = tree.getCheckedKeys(true); //true：只获取叶子节点的 id
      console.log(selectedKeys);
      let url = "/system/basic/permiss/?rid=" + rid;
      selectedKeys.forEach(key => {
        url += "&mids=" + key;
      });
      this.putRequest(url).then(resp => {
        if (resp) {
          this.activeName = -1;
        }
      });
    },
    cancelUpdate() {
      this.activeName = -1;
    },
    addRole() {}
  }
};
</script>

<style lang='scss' scoped>
//@import url()
.permission_input {
  display: flex;
  justify-content: flex-start;
  .el-input {
    width: 300px;
    margin-right: 8px;
  }
}
.permission_main {
  margin-top: 10px;
  width: 700px;
}
</style>