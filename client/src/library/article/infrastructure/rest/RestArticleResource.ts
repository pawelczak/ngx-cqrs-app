import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ArticleResource } from '../../domain/command/ArticleResource';
import { ArticleAggregate } from '../../domain/command/ArticleAggregate';
import { RestArticleConverter } from './RestArticleConverter';

import * as rawArticles from './articles.json';

@Injectable()
export class RestArticleResource extends ArticleResource {

	constructor(private restArticleConverter: RestArticleConverter) {
		super();
	}

	fetchAll(): Observable<Array<ArticleAggregate>> {
		return of(
				this.restArticleConverter.convertArray((rawArticles as any).articles)
			)
			.pipe(
				delay(3000)
			);
	}
}