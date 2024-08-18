import equal from "fast-deep-equal";
import type { NavModule } from "./NavModules/types";


import { HRModule } from "./NavModules/hr";
import { FinanceModule } from "./NavModules/finance";
import { ProjectsModule } from "./NavModules/projects";
import { ReportsModule } from "./NavModules/reports";
import { UsersModule } from "./NavModules/users";

const MainNavModules: NavModule[] = [HRModule, ProjectsModule, FinanceModule, ReportsModule, UsersModule];

export function useNavModules() {
  const selectedModule: Ref<NavModule | null> = ref(null);

  // onMounted(() => {
  //   if (!selectedModule.value) {
  //     selectedModule.value = MainNavModules[0];
  //   }
  // });

  function selectModule(module: NavModule) {
    selectedModule.value = module;
  }

  function isSelectedModule(module: NavModule): boolean {
    return equal(module, selectedModule.value);
  }

  return {
    all: MainNavModules,
    selectedModule,
    selectModule,
    isSelectedModule,
  };
}
