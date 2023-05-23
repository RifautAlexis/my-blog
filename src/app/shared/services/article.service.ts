import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article';

@Injectable({providedIn: 'root'})
export class ArticleService {
    constructor(private readonly httpClient: HttpClient) { }
    
    getArticles(): Observable<Article[]> {
        return this.httpClient.get<Article[]>(environment.apiUrl + '/articles');
    }
    
    getArticleById(id: number): Observable<Article> {
        return this.httpClient.get<Article>(environment.apiUrl + '/articles/' + id);
    }

}