<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <router-link class="navbar-brand" :to="{ name: 'BattleView' }">King Of Bots</router-link>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-8 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="{ name: 'BattleView' }">Battle</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="{ name: 'RecordView' }">Battle list</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="{ name: 'RanklistView' }">Ranking</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Julius
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <router-link class="dropdown-item" :to="{ name: 'UserBotsView' }">My Bots</router-link>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <router-link class="dropdown-item" :to="{ name: 'UserBotsView' }">Exit</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<script>
// import { useRoute } from 'vue-router'
// import { computed } from 'vue'

// export default {
//     setup() {
//         const route = useRoute();
//         let route_name = computed(() => route.name)
//         return {
//             route_name
//         }
//     }
// }

</script>

<style scoped>

</style>