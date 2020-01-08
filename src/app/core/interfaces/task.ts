export interface Task {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  taskTypeId: number;
  taskTypeName: string;
  statusId: number;
  statusName: string;
  statusRgb: string;
  priorityId: number;
  priorityName: string;
  serviceId: number;
  serviceName: string;
  resolutionDatePlan: Date;
  initiatorId: number;
  initiatorName: string;
  executorId: number;
  executorName: string;
  executorGroupId: number;
  executorGroupName: string;
  tags: Tag[];
  lifetimeItems: LifetimeItem[];
}

interface Tag {
  id: number;
  name: string;
}

interface LifetimeItem {
  id:	number;
  userName:	string;
  lifetimeType:	number;
  createdAt: Date;
  comment: string;
  fieldName: string;
  oldFieldValue: string;
  newFieldValue: string;
}
