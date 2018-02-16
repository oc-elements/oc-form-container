namespace OcDataLayer {
	interface IField {
		name: string,
		friendlyName: string,
		type: string,
		inputType: string,
		required: boolean
	}

	interface IRecord {
		name: string,
		friendlyName: string,
		value: string | number,
		type: string,
		inputType: string,
		required: boolean,
	}

	export class OcRecord implements IRecord {
		name: string;
		friendlyName: string;
		value: string | number;
		type: string;
		inputType: string;
		required: boolean;

		constructor(private recordSchema: IField, private data: Object) {
			this.name = recordSchema.name;
			this.friendlyName = recordSchema.friendlyName;
			this.type = recordSchema.type;
			this.inputType = recordSchema.inputType;
			this.required = recordSchema.required;

			this.value = OcRecord.findValue(data, this.name)
		}

		private static findValue(data, name) {
			for (let item in data) {
				if (item === name) {
					return data[item];
				}
			}
		}
	}

	export class OcDataCollection {
		private _records: OcRecord[] = [];
		private dataSchemaFields: IField[];

		constructor(private schema: Object, private data: Object) {
		}

		public init() {
			this.parseSchema();
			this.buildRecords();
		}

		private parseSchema() {
			this.dataSchemaFields = <IField[]>this.schema["fields"];
		}

		private buildRecords() {
			for (let i = 0; i < this.dataSchemaFields.length; i++) {
				const record = new OcRecord(this.dataSchemaFields[i], this.data);
				this._records.push(record);
			}
		}

		get records(): OcRecord[] {
			return this._records;
		}
	}
}
