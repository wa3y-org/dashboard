import { getAllVolunteers, getOneVolunteer } from "~/app/modules/volunteers/get";
import type { VolunteersRecord } from "~/app/pocketbase-types";

export function useVolunteers() {
  const volunteersList: Ref<VolunteersRecord[]> = ref([]);

  const loading = useLoading();
  async function loadVolunteers() {
    loading.start();
    volunteersList.value = await getAllVolunteers();
    loading.end();
  }

  async function loadOneVolunteer(id: string) {
    loading.start();
    const record = await getOneVolunteer(id);
    loading.end();

    return record;
  }

  return {
    loading,
    volunteersList,
    loadVolunteers,
    loadOneVolunteer,
  };
}
