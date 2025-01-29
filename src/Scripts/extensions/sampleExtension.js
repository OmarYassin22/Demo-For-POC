
class SampleExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this.selectedIds = [];
        this.selectionSet = new Set();
    }

    load() {
        //console.debug('Extension loaded');
        return true;
    }

    /**
     * Called when extension is unloaded by the viewer.
     */
    unload() {
        return true;
    }

    /**
     * Virtual method - is called when toolbar is created.
     */
    onToolbarCreated() {
        this.createToolbar();
    }

    createToolbar() {
        this._btnSample = new Autodesk.Viewing.UI.Button('SampleExtension.Sample');
        this._btnSample.setIcon('adsk-icon-bug');
        this._btnSample.setToolTip('Sample command');
        this._btnSample.onClick = async (e) => {
            await this.showErrors(e);
        };
        // add button to the goup
        const ctrlGroup = new Autodesk.Viewing.UI.ControlGroup('SampleExtension.ControlGroup');

        ctrlGroup.addControl(this._btnSample);
        // add group to main toolbar
        this.viewer.toolbar.addControl(ctrlGroup);
    }

    async showErrors(e) {
        const conditionResult = getConditionResultByCode(500.3);
        const errorIds = getErrorElementsIds(conditionResult.ErrorElementsIds);
        await selectElementsByRevitIds(errorIds);
    }
}

// Register extension in the viewer
Autodesk.Viewing.theExtensionManager.registerExtension('SampleExtension', SampleExtension);