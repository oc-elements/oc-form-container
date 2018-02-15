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
    }
}
