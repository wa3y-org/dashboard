import { getAllMembers, getOneMember } from "~/app/modules/members/get";
import type { MembersRecord } from "~/app/pocketbase-types";

export function useMembers() {
  const membersList: Ref<MembersRecord[]> = ref([]);

  const loading = useLoading();
  async function loadMembers() {
    loading.start();
    membersList.value = await getAllMembers();
    loading.end();
  }

  async function loadOneMember(id: string) {
    loading.start();
    const record = await getOneMember(id);
    loading.end();

    return record;
  }

  return {
    loading,
    membersList,
    loadMembers,
    loadOneMember,
  };
}
