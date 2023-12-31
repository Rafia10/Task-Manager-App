import api from "../Api/axios"
import swal from 'sweetalert2'
export interface ITasksData {
  title: string
  description: string
  assignee: string
  dueDate:string
  updatedAt?: string
  createdAt?: string
  status: string
  priority: string
}
export interface IUserData {
  username: string,
  email: string,
  password: string,
  createdAt: string,
  updatedAt: string
}

export async function userSignup(data: IUserData) {
  try {
    const user = await api.post('auth/signup', data)
    swal.fire({
      icon:'success',
      title: 'Registration',
      text: user.data.message,
    })

    return user.data
  }
  catch (e: any) {
    swal.fire({
      icon:'error',
      title: 'Registration',
      text:e.response.data.message,
    })
  }

}

export async function userLogin(data:IUserData) {
  try {
    const user = await api.post('auth/login', data)
    swal.fire({
      icon:'success',
      title: 'Login Successful!',
      text: user.data.message,
    })
    localStorage.setItem('token',user.data.data)
    return user.data
  }
  catch (e: any) {
    swal.fire({
      icon:'error',
      title: 'Login Failed',
      text:e.response.data.message,
    })
  }
}

export async function getTasksData() {
  try {
    const token=localStorage.getItem('token')
    if(token){
      const tasks = await api.get('task/list-tasks',{headers:{
       Authorization:`Bearer ${token}`
      }})
      return tasks.data?.result
    }

  }
  catch (e: any) {
    swal.fire({
      icon:'error',
      title: 'Unable to Fetch Tasks',
      text:e.response.data.message,
    })
  }
}

export async function addTask(data:any) {
  try { 
    const token=localStorage.getItem('token')
      if(token){
      const task = await api.post(`task/create-task`,data,{headers:{
        Authorization:`Bearer ${token}`
       }})
       swal.fire({
        icon:'success',
        title: 'Login Successful!',
        text: task.data.message,
      })
      return task.data
    }
  }  
  catch (e: any) {
    swal.fire({
      icon:'error',
      text:e.response.data.message
    })
  }
}
export async function deleteData(id:any) {
  try { 
    const token=localStorage.getItem('token')
      if(token){
      const task = await api.delete(`task/delete-task/${id}`,{headers:{
        Authorization:`Bearer ${token}`
       }})
    
      return task
    }
  }  
  catch (e: any) {
    swal.fire({
      icon:'error',
      text:e.response.data.message
    })
  }
}
export async function getFilteredUsers() {
  try { 
   
      const task = await api.get(`task/filtered-users`)
      return task.data.data
    }
  
  catch (e: any) {
    swal.fire({
      icon:'error',
      text:e.response.data.message
    })
  }
}

export async function viewTask(id:any) {
  try { 
    const token=localStorage.getItem('token')
    if(token){
      const task = await api.get(`task/view-task/${id}`,{headers:{
        Authorization:`Bearer ${token}`
       }})
      return task.data.data
    }
  }
  catch (e: any) {
    swal.fire({
      icon:'error',
      text:e.response.data.message
    })
  }
}

export async function editTask(id:any,data:any) {
  try { 
    const token=localStorage.getItem('token')
    if(token){
      const task = await api.patch(`task/update-task/${id}`,data,{headers:{
        Authorization:`Bearer ${token}`
       }})
       console.log('!!!!!!!!!1',task)
      return task.data.data
    }
  }
  catch (e: any) {
    swal.fire({
      icon:'error',
      text:e.response.data.message
    })
  }
}



