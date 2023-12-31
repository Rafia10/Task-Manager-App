<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ITasksData, viewTask } from '../composables/useTableData';
import router from '../router';

const task = ref<ITasksData>({
    title: '',
    description: '',
    assignee: '',
    priority: '',
    dueDate: '',
    status: '',
})


onMounted(async () => {
    const data = await viewTask(router.currentRoute.value.params.id)
    task.value = data
})
</script>

<template>
    <div>
        <h3 class="text-3xl font-semibold text-gray-700">
            View Task
        </h3>
        <div class="mt-8">
            <router-link to="/tasks" class=" bg-blue-500 text-white px-4 py-2 rounded">
        Back
      </router-link>
            <div class="mt-4">
                <div class="p-6 bg-white rounded-md shadow-md">
                    <form disabled>
                        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label class="text-gray-700" for="title">Title</label>
                                <input v-model="task.title" required="true" disabled
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
                                <input v-model="task.assignee" required="true" disabled
                                    class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                    type="text">
                            </div>
                            <div>
                                <label class="text-gray-700" for="Priority">Priority</label>
                                <input v-model="task.priority" required="true" disabled
                                    class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                    type="text">
                            </div>
                            <div>
                                <label class="text-gray-700" for="DueDate">Due Date</label>
                                <input v-model="task.dueDate" required="true" disabled
                                    class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                    type="text">
                            </div>
                            <div>
                                <label class="text-gray-700" for="status">Status</label>
                                <input v-model="task.status" required="true" disabled
                                    class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                                    type="text">
                            </div>

                        </div>

                        <div class="flex justify-end mt-4">
                            <button
                            disabled
                                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
