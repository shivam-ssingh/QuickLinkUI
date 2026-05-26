import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Link, CreateLinkRequest } from '../models/link.models';

@Injectable({ providedIn: 'root' })
export class LinkService {
  constructor(private api: ApiService) {}

  getLinksByTopic(topicId: string) {
    return this.api.get<Link[]>(`/api/links/topic/${topicId}`);
  }

  getLinkById(id: string) {
    return this.api.get<Link>(`/api/links/${id}`);
  }

  createLink(request: CreateLinkRequest) {
    return this.api.post<Link>('/api/links', request);
  }

  deleteLink(id: string) {
    return this.api.delete(`/api/links/${id}`);
  }
}
