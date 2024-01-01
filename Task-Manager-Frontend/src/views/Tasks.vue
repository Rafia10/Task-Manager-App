<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { getTasksData, deleteData } from '../composables/useTableData';
import router from '../router';
import io from 'socket.io-client';
const TasksData = ref([]);
const Pagination = ref({});
const currentPage = ref(1);
const getUpdatedTasksData = async (page) => {
  const tasksData = await getTasksData(page);
  TasksData.value = tasksData.tasks;
  Pagination.value = tasksData.pagination;
};

const handleNextPage = async () => {
  currentPage.value += 1;
  await getUpdatedTasksData(currentPage.value);
};

const handlePrevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    await getUpdatedTasksData(currentPage.value);
  }
};

onMounted(async () => {
  await getUpdatedTasksData(currentPage.value);

  const socket = io('http://localhost:3333', {
    transports: ['websocket'],
  });
  // Listen the events from server
  socket.on('initialData', (data) => {
    TasksData.value = data;
  });

  socket.on('taskUpdated', (updatedData) => {
    console.log('!!!!!!!', updatedData);
    if (updatedData._id) {
      const index = TasksData.value.findIndex(
        (item) => item._id === updatedData._id
      );
      if (index !== -1) {
        TasksData.value[index] = updatedData;
      } else {
        TasksData.value.push(updatedData);
      }
    } else {
      TasksData.value = TasksData.value.filter(
        (item) => item._id !== updatedData._id
      );
    }
  });
});

async function handleView(id) {
  router.push(`/view-task/${id}`);
}
async function handleUpdate(id) {
  router.push(`/edit-task/${id}`);
}
async function handleDelete(Id) {
  Swal.fire({
    icon: 'warning',
    title: 'Are you sure you want to delete it?',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes',
  }).then(async (res) => {
    if (res.isConfirmed) {
      await deleteData(Id);
      Swal.fire({
        icon: 'success',
        text: 'Task Deleted Successfully',
      });
    }
  });
}
</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Tasks</h3>

    <div class="mt-8">
      <router-link
        to="/add-task"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </router-link>

      <div class="mt-6">
        <div class="flex flex-col mt-3 sm:flex-row">
          <div class="flex">
            <div class="relative">
              <div
                class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>

            <div class="relative">
              <div
                class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div
            class="inline-block min-w-full overflow-hidden rounded-lg shadow"
          >
            <table
              class="min-w-full min-w-full divide-y divide-gray-200-normal"
            >
              <thead>
                <tr>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Title
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Description
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Assignee
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Due Date
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Priority
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Status
                  </th>
                  <th
                    class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in TasksData" :key="task?._id">
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <div class="flex items-center">
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-nowrap">
                          {{ task?.title }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <div class="flex items-center">
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-nowrap">
                          {{ task?.description }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <div class="flex items-center">
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-nowrap">
                          {{ task?.userInfo?.username }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <div class="flex items-center">
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-nowrap">
                          {{ task?.dueDate }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <div class="flex items-center">
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-nowrap">
                          {{ task?.priority }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <div class="flex items-center">
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-nowrap">
                          {{ task?.status }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <div class="flex flex-col md:flex-row items-center">
                      <button
                        @click="handleView(task._id)"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <i class="fa fa-eye"></i>
                      </button>
                      <button
                        @click="handleDelete(task?._id)"
                        class="ml-3 mb-3 md:mb-0 md:ml-0 md:mr-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                      >
                        <i class="fa fa-trash-alt"></i>
                      </button>
                      <button
                        @click="handleUpdate(task?._id)"
                        class="ml-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
                      >
                        <i class="fa fa-edit"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
            >
              <span class="text-xs text-gray-900 xs:text-sm"
                >{{ Pagination.totalPages }}
              </span>

              <div class="inline-flex mt-2 xs:mt-0">
                <button
                  @click="handlePrevPage"
                  :disabled="!Pagination?.hasPrevPage"
                  class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
                >
                  Prev
                </button>
                <button
                  @click="handleNextPage"
                  :disabled="!Pagination?.hasNextPage"
                  class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
