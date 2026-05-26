import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Topic, CreateTopicRequest } from '../models/topic.models';

@Injectable({ providedIn: 'root' })
export class TopicService {
  constructor(private api: ApiService) {}

  getTopics() {
    return this.api.get<Topic[]>('/api/topics');
  }

  getTopicById(id: string) {
    return this.api.get<Topic>(`/api/topics/${id}`);
  }

  createTopic(request: CreateTopicRequest) {
    return this.api.post<Topic>('/api/topics', request);
  }

  deleteTopic(id: string) {
    return this.api.delete(`/api/topics/${id}`);
  }
}
