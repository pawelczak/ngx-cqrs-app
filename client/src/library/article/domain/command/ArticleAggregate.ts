export class ArticleAggregate {

	constructor(private id: string,
				private title: string,
				private content: string,
				private yearOfPublication: number) {
	}

	getId(): string {
		return this.id;
	}

	getTitle(): string {
		return this.title;
	}

	getContent(): string {
		return this.content;
	}

	getYearOfPublication(): number {
		return this.yearOfPublication;
	}
}
