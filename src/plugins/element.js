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
    Table, TableColumn,
    // 弹窗
    Dialog, Tag,
    // switch
    Switch,
    // 选择
    Select, Option,
    //
    Collapse,CollapseItem, Card,Tree,
    // loading 加载
    Loading,
    // 
    Image,
    // 分页
    Pagination,
    // 上传
    Upload
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

Vue.use(Dialog)
Vue.use(Tag)

Vue.use(Switch)

Vue.use(Select)
Vue.use(Option)

Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Card)
Vue.use(Tree)

// 使用Loading 的 指令
Vue.use(Loading.directive);
Vue.use(Image)

Vue.use(Pagination)

Vue.use(Upload)

// 把Message挂载到Vue的原型对象上
Vue.prototype.$message = Message;
// MessageBox.confirm的挂载
Vue.prototype.$confirm = MessageBox.confirm