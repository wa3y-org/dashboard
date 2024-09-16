import { backendRequestMultiple } from "~/app/core/BackendRequest";
import type { TProject } from "../projects/index";
import {
  postsPerPage,
  ProjectTimelineCollection,
  type TTimeLinePost,
} from "./index";

export async function getProjectTimelinePosts(
  project: TProject,
  page: number = 1
) {
  return await backendRequestMultiple<TTimeLinePost>(async () => {
    return await ProjectTimelineCollection.getList(page, postsPerPage, {
      filter: `
        project="${project.id}"
      `,
      expand: "creator",
      sort: "-created",
    });
  });
}
