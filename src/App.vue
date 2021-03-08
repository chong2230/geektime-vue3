<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <div id="app">
    <h1>Hello, 箩筐！</h1>
    <p>
      <router-link to="/">Go to home</router-link>
      <router-link to="/about">Go to about</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 12px;
  margin-top: 60px;
}
</style>