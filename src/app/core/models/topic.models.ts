export interface Topic {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  linkCount: number;
  createdAt: string;
}

export interface CreateTopicRequest {
  title: string;
  description: string;
  isPublic: boolean;
}
