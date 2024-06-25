import axios from "axios";



const API_URL = 'https://b1tts47v-8090.use.devtunnels.ms';
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  proxy: {
    '/api': {
      target: 'https://b1tts47v-8090.use.devtunnels.ms',
      changeOrigin: true,
    },
  },
});

const taskService = {
  getTasks: async () => {
    try {
      console.log(`Fetching tasks from ${API_URL}/all`); // Agregar log
      const response = await axiosInstance.get('/api/tareas/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },
    addTask: async (task) => {
      try {
        const response = await axiosInstance.post('/api/tareas/save',task);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error adding task:', error);
        throw error;
      }
    },
    updateTask: async (updatedTask) => {
      try {
        const response = await axiosInstance.put('/api/tareas/update', updatedTask);
        return response.data;
      } catch (error) {
        console.error('Error updating task:', error);
        throw error;
      }
    },
    deleteTask: async (taskId) => {
      try {
        await axiosInstance.delete(`/api/tareas/delete/${taskId}`);
      } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
      }
    },
    //Este aun no esta definido del todo.
    completeTask: async (taskId) => {
      try {
        const response = await axios.patch(`${API_URL}/tasks/${taskId}/complete`);
        return response.data;
      } catch (error) {
        console.error('Error completing task:', error);
        throw error;
      }
    }
  };  
  
  export default taskService;