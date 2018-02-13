/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../polymer-decorators/polymer-decorators.d.ts" />
const {customElement, property} = Polymer.decorators;
@customElement('oc-form-container')
class OcFormContainer extends Polymer.Element {

    @property({type: String})
    private header: string;

    constructor() {
        super();
    }
}
