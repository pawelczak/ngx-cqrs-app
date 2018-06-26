export class ArticleAggregate {

	constructor(private id: string,
				private title: string,
				private content: string) {
	}

	getId(): string {
		return this.id;
	}
}
