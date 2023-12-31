<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ITasksData, viewTask, getFilteredUsers, editTask } from '../composables/useTableData';
import router from '../router';

const filteredUser = ref([])
const task = ref<ITasksData>({
    title: '',
    description: '',
    assignee: '',
    priority: '',
    dueDate: '',
    status: '',
})
const priorities = ref([
    {
        id: '1',
        value: "High"
    },
    {
        id: '2',
        value: "Low"
    },
    {
        id: '3',
        value: "Medium"
    }
])
const statuses = ref([
    {
        id: "1",
        value: "TODO"
    },
    {
        id: "2",
        value: "INPROGRESS"
    },
    {
        id: "3",
        value: "DONE"
    }
])
onMounted(async () => {
    const data = await getFilteredUsers()
    filteredUser.value = data
    console.log(filteredUser.value)
})
onMounted(async () => {
    const data = await viewTask(router.currentRoute.value.params.id)
    task.value = data
    console.log(task.value)
})

async function submitTask() {
    const update = await editTask(router.currentRoute.value.params.id)
    console.log(update)
    if (update) {
        router.push('/tasks')
    }
}
</script>

<template>
    <div>
        <h3 class="text-3xl font-medium text-gray-700">
            Add Task
        </h3>

        <div class="mt-8">
            <router-link to="/tasks" class=" bg-blue-500 text-white px-4 py-2 rounded">
                Back
            </router-link>
            <div class="mt-4">
                <div class="p-6 bg-white rounded-md shadow-md">
                    <form @submit.prevent="submitTask">
                        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label class="text-gray-700" for="title">Title</label>
                                <input v-model="task.title" required="true"
                                    class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                    type="text">
                            </div>

                            <div>
                                <label class="text-gray-700" for="description">Description</label>
                                <input v-model="task.description" required="true"
                                    class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                    type="text">
                            </div>
                            <div>
                                <label class="text-gray-700" for="title">Assignee</label>
                                <select
                                    class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                    v-model="task.assignee">
                                    <option value="" disabled selected>Select Assignee</option>
                                    <option v-for="res in filteredUser" :key="res._id" :value="res._id">{{ res.username }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="text-gray-700" for="Priority">Priority</label>
                                <select
                                    class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                    v-model="task.priority">
                                    <option value="" disabled selected>Select Priority</option>
                                    <option v-for="res in priorities" :key="res.id" :value="res.value">{{ res.value }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="text-gray-700" for="DueDate">Due Date</label>
                                <input v-model="task.dueDate" required="true"
                                    class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                    type="text">
                            </div>
                            <div>
                                <label class="text-gray-700" for="status">Status</label>
                                <select
                                    class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                    v-model="task.status">
                                    <option value="" disabled selected>Select Status</option>
                                    <option v-for="res in statuses" :key="res.id" :value="res.value">{{ res.value }}
                                    </option>
                                </select>
                            </div>

                        </div>

                        <div class="flex justify-end mt-4">
                            <button
                                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
