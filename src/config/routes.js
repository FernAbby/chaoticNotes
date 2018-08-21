//我的选题
import TopicList from '../components/topic/list';
import TopicForm from '../components/topic/form';
import TopicDetail from '../components/topic/detail';
import TopicAdult from '../components/topic/adult';
import TopicQuery from '../components/topic/query';
//任务管理
import TaskList from '../components/task/list';
import TaskForm from '../components/task/form';
import TaskEdit from '../components/task/edit';
import TaskManage from '../components/task/manage';
import TaskRelate from '../components/task/relate';
import TaskDetail from '../components/task/detail';
import TaskUpload from '../components/task/upload';
//基础设置
import SettingColumn from '../components/setting/column';
import SettingBase from '../components/setting/base';
import SettingLog from '../components/setting/log';
import SettingTenant from '../components/setting/tenant';
import SettingPlugin from '../components/setting/plugin';
//公共页
import NotFound from '../components/404';

const Routes = [{
    link: '/',
    component: TopicList,
    title: '我的选题'
},{
    link: '/plans/have',
    component: TopicList,
    title: '我的选题'
},{
    link: '/topic/add',
    component: TopicForm,
    title: '新建选题'
},{
    link: '/topic/edit/:id',
    component: TopicForm,
    title: '编辑选题'
},{
    link: '/topic/detail/:id',
    component: TopicDetail,
    title: '选题详情'
},{
    link: '/plans/wait-review',
    component: TopicAdult,
    title: '待审选题'
},{
    link: '/plans',
    component: TopicQuery,
    title: '选题查询'
},{
    link: '/plan-tasks',
    component: TaskList,
    title: '我的任务'
},{
    link: '/task/add/:id',//选题id
    component: TaskForm,
    title: '新建任务'
},{
    link: '/task/edit/:id',//任务id
    component: TaskEdit,
    title: '编辑任务'
},{
    link: '/task/manage/:id',
    component: TaskManage,
    title: '任务管理'
},{
    link: '/task/relate/:id',
    component: TaskRelate,
    title: '相关任务'
},{
    link: '/task/detail/:id',
    component: TaskDetail,
    title: '任务详情'
},{
    link: '/task/upload',
    component: TaskUpload,
    title: '素材上传'
},{
    link: '/config-columns',
    component: SettingColumn,
    title: '栏目设置'
},{
    link: '/config-base-locations/edit/my-group-id',
    component: SettingBase,
    title: '基地设置'
},{
    link: '/logs',
    component: SettingLog,
    title: '日志设置'
},{
    link: '/setting/tenant',
    component: SettingTenant,
    title: '租户设置'
},{
    link: '/setting/plugin',
    component: SettingPlugin,
    title: '插件设置'
},{
    link: '/404',
    component: NotFound,
    title: '全部'
},{
    link: '*',
    component: NotFound,
    title: '全部'
}];

export default Routes;