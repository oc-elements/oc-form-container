/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../polymer-decorators/polymer-decorators.d.ts" />
/// <reference path="../iron-collapse/iron-collapse.d.ts" />
namespace OcForms {
	import customElement = Polymer.decorators.customElement;
	import property = Polymer.decorators.property;
	import observe = Polymer.decorators.observe;

	@customElement('oc-form-container')
	class OcFormContainer extends Polymer.Element {

		@property({type: String})
		private header: string;
		@property({type: Boolean})
		private isCollapsible: boolean = false;
		@property({type: Object})
		private data: Object;
		@property({type: Object})
		private schema: Object;

		@Polymer.decorators.query('#formCreator')
		ocFormCreator: OcFormCreator;

		@Polymer.decorators.query('#ironCollapse')
		ironCollapse: IronCollapseElement;

		private readonly addIcon = "add";
		private readonly removeIcon = "remove";
		// For now we make the default icon the remove icon, because its opened by default this will change
		private collapseIcon: string = "remove";

		constructor() {
			super();
		}

		@observe('schema', 'data')
		private onDataLoaded() {
			if (this.schema && this.data) {
				const dataLayer = new OcDataLayer.OcDataCollection(this.schema, this.data);
				dataLayer.init();

				this.ocFormCreator.records = dataLayer.records;
			}
		}


		private onHeaderClick() {
			if (!this.isCollapsible) return;

			this.toggleCollapse();
		}

		private toggleCollapse() {
			this.ironCollapse.opened = !this.ironCollapse.opened;

			if (this.ironCollapse.opened)
				this.collapseIcon = this.removeIcon;
			else
				this.collapseIcon = this.addIcon
		}
	}
}
