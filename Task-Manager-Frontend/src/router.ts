import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Forms from './views/Forms.vue'
import Tasks from './views/Tasks.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import AddTask from './views/AddTask.vue'
import TaskView from './views/TaskView.vue'
import TaskEdit from './views/TaskEdit.vue'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Signup',
    component: Signup,
    meta: { layout: 'empty' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta:{requiresAuth:true}
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
  },
 
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/add-task',
    name: 'Add-Task',
    component: AddTask,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/view-task/:id',
    name: 'View-Task',
    component: TaskView,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/edit-task/:id',
    name: 'Edit-Task',
    component: TaskEdit,
    meta:{
      requiresAuth:true
    }
  },
  
 
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authToken = localStorage.getItem('token');

    if (authToken) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router
