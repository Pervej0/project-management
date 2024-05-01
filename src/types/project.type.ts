export type TTask = {
  tasksId: string;
  name: string;
  dueDate: string;
  assignee: string;
  teamMembers?: string[];
  recentActivities: string;
};

export type TProject = {
  id: string;
  title: string;
  tasks: TTask[];
  teamMembers: string[];
};
