import Vue from 'vue'

//导入element-ui 样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入部分组件
import {
    Button, Form, FormItem, Input, Checkbox,
    //导入弹框提示组件
    Message,

    //Home
    Container, Header, Aside, Main,
    Dropdown, DropdownMenu, DropdownItem, MessageBox,
    Menu, Submenu, MenuItem,
    Breadcrumb, BreadcrumbItem,
    // tab
    Tabs, TabPane,
    // 表格
    Table, TableColumn
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(Table)
Vue.use(TableColumn)

// 把Message挂载到Vue的原型对象上
Vue.prototype.$message = Message;
// MessageBox.confirm的挂载
Vue.prototype.$confirm = MessageBox.confirm