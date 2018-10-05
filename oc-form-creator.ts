namespace OcForms {
    import customElement = Polymer.decorators.customElement;
    import property = Polymer.decorators.property;
	import OcRecord = OcDataLayer.OcRecord;

    @customElement('oc-form-creator')
	export class OcFormCreator extends Polymer.Element {

        @property({type: Array})
        public records: OcRecord[];
        @property({type: Boolean})
        private isCollapsible: boolean = false;
		@property({type: Boolean})
		private isEditMode: boolean = false;

		private _isCustom(type: string) {
			return type === "custom";
		}

		// Jeremy: This is a hack don't reuse this
		private _buildCustomField(data: {types: any[], id: any}) {
			return `${data.types[0].name} ${data.id}`
		}
	}
}
