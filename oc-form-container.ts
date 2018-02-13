/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../polymer-decorators/polymer-decorators.d.ts" />
/// <reference path="../iron-collapse/iron-collapse.d.ts" />
import customElement = Polymer.decorators.customElement;
import property = Polymer.decorators.property;

@customElement('oc-form-container')
class OcFormContainer extends Polymer.Element {

    @property({type: String})
    private header: string;
    @property({type: Boolean})
    private isCollapsible: boolean = false;

    @Polymer.decorators.query('#ironCollapse')
    ironCollapse: IronCollapseElement;

    private readonly addIcon = "add";
    private readonly removeIcon = "remove";
    // For now we make the default icon the remove icon, because its opened by default this will change
    private collapseIcon: string = "remove";

    constructor() {
        super();
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
