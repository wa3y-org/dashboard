import equal from "fast-deep-equal";
import type { NavModule } from "./NavModules/types";
import { HRModule } from "./NavModules/HR";
import { ProjectsModule } from "./NavModules/Projects";
import { FinanceModule } from "./NavModules/Finance";
import { UsersModule } from "./NavModules/User";
import { ReportsModule } from "./NavModules/Reports";

const MainNavModules: NavModule[] = [HRModule, ProjectsModule, FinanceModule, ReportsModule, UsersModule];

export function useNavModules() {
  const selectedModule: Ref<NavModule | null> = ref(null);

  onMounted(() => {
    if (!selectedModule.value) {
      selectedModule.value = MainNavModules[0];
    }
  });

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
