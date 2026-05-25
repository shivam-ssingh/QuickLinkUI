export type LinkStatus = 'Pending' | 'Processing' | 'Completed' | 'Failed';

export interface Link {
  id: string;
  url: string;
  title: string;
  userNote: string | null;
  aiSummary: string | null;
  status: LinkStatus;
  topicId: string;
  createdAt: string;
}

export interface CreateLinkRequest {
  url: string;
  userNote: string | null;
  topicId: string;
}
