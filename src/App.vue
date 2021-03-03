<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">検索</router-link> |
      <router-link to="/add">追加</router-link> |
      <router-link to="/update" id="upde">変更</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#upde { display: none; }
#upde.router-link-exact-active { display: inline; }
#nav #upde.router-link-exact-active span { text-decoration: none; color: #2c3e50; }

#nav a.router-link-exact-active {
  color: #42b983;
}

.search > .spBtn, .addArea > .spBtn { 
  color: #FC2121; text-decoration: none; margin-left: 1rem; display: inline-block;
  padding: .4rem; border: 3px solid;
}
.addArea > .spBtn { margin-left: 0; margin-top: 2rem; }
</style>
