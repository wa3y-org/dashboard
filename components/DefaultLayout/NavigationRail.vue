<template>
  <v-navigation-drawer permanent touchless app rail-width="96" rail class="fill-height position-fixed pa-4">
    <div class="d-flex justify-space-between align-center flex-column fill-height">
      <div class="w-100 text-center">
        <v-card class="pa-0 ma-0" rounded="lg" height="60" width="60" to="/">
          <v-img cover :aspect-ratio="1 / 1" src="@/assets/images/wa3y-logo.png"></v-img>
        </v-card>
        <v-btn v-if="drawerIsShown" icon="mdi-arrow-left" style="position: fixed; right: 30px;" class="my-2" @click="closeDrawer" size="small" variant="text"></v-btn>
      </div>
      <div>
        <div class="rounded-lg text-center modules-bar py-2 px-1 ">
          <v-btn @click="navigationModules.selectModule(navMod); showDrawer()"
            :variant="navigationModules.isSelectedModule(navMod) ? 'elevated' : 'plain'" size="50"
            class="my-1 rounded-lg" color="purple-darken-4" v-for="navMod of navigationModules.all"
            @dblclick="goToRoute(navMod.route)">
            <v-icon size="28">{{ navMod.icon }}</v-icon>
          </v-btn>
        </div>
      </div>
      <div></div>
    </div>
    <template v-slot:append>
      <default-layout-user-card />
    </template>
  </v-navigation-drawer>
  <v-navigation-drawer permanent touchless app class="fill-height position-fixed" v-if="drawerIsShown">
    <v-list class="pa-2" color="purple">

      <v-list-item variant="plain" :to="selectedModule?.route" class="my-2 text-purple" rounded="lg"
        :prepend-icon="selectedModule?.icon">
        <v-list-item-title class="font-weight-bold">
          {{ selectedModule?.name }}
        </v-list-item-title>
      </v-list-item>
      <div v-for="navGroup in selectedModule?.children">
        <v-divider class="my-4"></v-divider>
        <v-list-item :to="navRoute.route" class="my-2" v-for="navRoute in navGroup" :title="navRoute.name" rounded="lg"
          :value="navRoute.route" :prepend-icon="navRoute.icon"></v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const navigationModules = useNavModules();

const selectedModule = computed(() => navigationModules.selectedModule.value);

function goToRoute(route: string) {
  useRouter().push(route);
}

const drawerIsClosed = ref(false);
function closeDrawer() {
  drawerIsClosed.value = true;
}
function showDrawer() {
  drawerIsClosed.value = false;
}
const drawerIsShown = computed<boolean>(() => {
  return (!drawerIsClosed.value && selectedModule.value && selectedModule.value.children.length >= 0)
})
</script>

<style>
.modules-bar {
  background-color: #F3E5F5;
}
</style>