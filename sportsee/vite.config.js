import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

const BASE_URL = "http://localhost:3000";
const USER18_URL = `/user/18`;
const USER12_URL = `/user/12`;

const USER_AVERAGE = `/average-sessions`;
const USER_PERFORMANCE = `/performance`;
const USER_ACTIVITY = `/activity`;

export {
  BASE_URL,
  USER18_URL,
  USER12_URL,
  USER_AVERAGE,
  USER_PERFORMANCE,
  USER_ACTIVITY,
};