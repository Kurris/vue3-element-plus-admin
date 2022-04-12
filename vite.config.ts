import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:[{
     find:'@',
     replacement:resolve(__dirname,'src')
    },{
      find:'@views',
      replacement:resolve(__dirname,'src/views')
    },{
      find:'@styles',
      replacement:resolve(__dirname,'src/styles')
    }]
  }
})
