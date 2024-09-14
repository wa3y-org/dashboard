<template>
  <v-autocomplete :loading="loading.isLoading.value" :error-messages="errors" :multiple="false" v-model="model" item-value="id" chips v-bind="props.props" return-object hide-selected
    auto-select-first clearable open-on-clear hide-details="auto" rounded="lg" variant="outlined" :items="visibleMembers"
    class="font-weight-bold" :placeholder="placeholder" :custom-filter="filterByNameAndEmail">
    <template v-slot:prepend-inner>
      <div class="mx-2 text-primary text-no-wrap">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        Select Member :
      </div>
    </template>
    <template v-slot:chip="{ props, item }">
      <v-chip size="large" v-bind="props" class="font-weight-bold bg-white pa-0">
        <v-avatar :image="getAvatarUrl(item.raw)" size="40" class="ma-0 pa-0">
        </v-avatar>
        <span class="mx-3">
          {{ item.raw.name }}
        </span>
        <span class="mx-2"></span>
      </v-chip>
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" title="" :disabled="item.raw.membership_status != 'Active'">
        <div class="d-flex align-center">
          <v-avatar cover size="64" rounded="circle" class="ma-2 elevation-1">
            <v-img :src="getAvatarUrl(item.raw)" alt="Member avatar image" />

          </v-avatar>
          <div class="d-inline-block mx-4">
            <span class="font-weight-bold text-nowrap">{{ item.raw.name }}</span>
            <p class="text-grey-darken-2"> {{ item.raw.email }}</p>

          </div>
          <v-spacer></v-spacer>
          <v-chip size="large" class="font-weight-bold" :color="getStatusColor(item.raw)">
            {{ item.raw.membership_status }}
          </v-chip>

        </div>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
import type { MembersResponse, MembersRecord } from "~/app/pocketbase-types";
import moment from "moment";


const model = defineModel()
const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props', 'items', 'hidden'])

type TMember = MembersRecord | MembersResponse;

const MembersFetcher = useMembers();
const { membersList, loading } = MembersFetcher;
onMounted(() => {
  MembersFetcher.loadMembers();
})

function isHidden(member: TMember) {
  if (member.membership_status != 'Active') return true;

  for (let hiddenMember of props.hidden || []) {
    if (member.id == hiddenMember.id) {
      return true;
    }
  }
  return false;
}

const visibleMembers = computed<TMember[]>(() => {
  let visible = [];
  for (let member of membersList.value) {
    if (!isHidden(member)) {
      visible.push(member)
    }
  }

  return visible;
});



function calcAge(birthDate: string) {
  return moment(birthDate).fromNow(true)
}

function getStatusColor(member: MembersRecord) {
  let color = '';
  switch (member.membership_status) {
    case "Active":
      color = 'success'
      break;
    case "Suspended":
      color = 'error'
      break;
    case "Resigned":
      color = 'black';
      break;
  }
  return color;
};


function getAvatarUrl(member: MembersRecord) {
  return usePocketBase().files.getUrl(member, member.avatar || '');
}

function filterByNameAndEmail(itemTitle: string, queryText: string, item: any) {
  const textOne = item.raw.name.toLowerCase()
  const textTwo = item.raw.email.toLowerCase()
  const searchText = queryText.toLowerCase()
  return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
}

</script>

<style></style>