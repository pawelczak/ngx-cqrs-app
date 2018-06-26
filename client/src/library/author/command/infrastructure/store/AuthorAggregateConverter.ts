import { Injectable } from '@angular/core';

import { AuthorStoreAnemia } from './AuthorStoreAnemia';
import { AuthorAggregate } from '../../domain/AuthorAggregate';

@Injectable()
export class AuthorAggregateConverter {

	toAnemia(aggregate: AuthorAggregate): AuthorStoreAnemia {
		return new AuthorStoreAnemia(
			aggregate.id,
			aggregate.name,
			aggregate.contributions,
			aggregate.getRating()
		);
	}

	toArrayAnemia(aggregates: Array<AuthorAggregate>): Array<AuthorStoreAnemia> {
		return aggregates.map((aggregate) => this.toAnemia(aggregate));
	}
}