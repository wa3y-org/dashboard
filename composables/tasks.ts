import { addTask } from "./tasks/create";
import { getEmployeeTasks } from "./tasks/get";
import { removeTask } from "./tasks/remove";
import { updateTask } from "./tasks/update";
import { validateTask } from "./tasks/validate";

export function useEmployeesTasks() {
    return {
        create: addTask,
        update: updateTask,
        getTasks: getEmployeeTasks,
        validate: validateTask,
        remove: removeTask,
    }
}