import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'article-details',
    standalone: true,
    templateUrl: 'article-details.component.html',
    styleUrls: ['./article-details.component.scss']
})

export class ArticleDetailsComponent implements OnInit {

    articleId!: string;

    constructor(private readonly route: ActivatedRoute){}

    ngOnInit(): void {
        this.articleId = this.route.snapshot.paramMap.get('id')!;
    }
}