/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../polymer-decorators/polymer-decorators.d.ts" />
/// <reference path="../iron-collapse/iron-collapse.d.ts" />
/// <reference path="../iron-form/iron-form.d.ts" />
namespace OcForms {
	import customElement = Polymer.decorators.customElement;
	import property = Polymer.decorators.property;
	import observe = Polymer.decorators.observe;
	import Event = OcEvent.Event;
	import query = Polymer.decorators.query;

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

		@query('#form')
		form: any;

		@query('#formCreator')
		ocFormCreator: OcFormCreator;

		@query('#ironCollapse')
		ironCollapse: IronCollapseElement;

		private readonly addIcon = "add";
		private readonly removeIcon = "remove";
		// For now we make the default icon the remove icon, because its opened by default this will change
		private collapseIcon: string = "remove";

		// This will be used at a later stage when we include the buttons
		public onSaveEvent: Event = new Event();

		constructor() {
			super();
		}

		ready() {
			super.ready();

			this.form.addEventListener('keydown', (event) => this.onEnter(event));
		}

		@observe('schema', 'data')
		private onDataLoaded() {
			if (this.schema && this.data) {
				const dataLayer = new OcDataLayer.OcDataCollection(this.schema, this.data);
				dataLayer.init();

				this.ocFormCreator.records = dataLayer.records;
			}
		}

		private onEnter(event) {
			if (event.keyCode === 13) {
				const currentElementIndex = +event.target.getAttribute("tabindex"); // Get current selected element index
				const nextIndexElement = event.currentTarget.querySelector("slot") // Get form content
					.assignedNodes()[1] // 1 Will fetch the form content item
					.querySelectorAll(`[tabindex="${currentElementIndex + 1}"]`)[0]; // Search for element with tab index
				
				if (nextIndexElement)
					nextIndexElement.focus(); // We should maybe add a try and catch in case component does not have focus
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
