const DATAGRID_CONFIG = {
    requiredProps: ['name', 'Volume', 'Level'], // Which properties should be requested for each object
    columns: [ // Definition of individual grid columns (see http://tabulator.info for more details)
        { title: 'السبب', field: 'Message' },
        { title: 'الاشتراط', field: 'desc', width: 150 },
        { title: 'م', field: 'code' }
    ],
    //groupBy: 'level', // Optional column to group by
    createRow: (conditionResult) => {
        const code = conditionResult.Code;
        const desc = conditionResult.Description;
        const Message = conditionResult.Message;
        return { code, desc, Message };
    },
    onRowClick: (row, viewer) => {
        console.log(getConditionResultByCode(row.code));
        selectElementsByRevitIds(getErrorElementsIds(getConditionResultByCode(row.code).ErrorElementsIds));
    }
};

class DataGridPanel extends Autodesk.Viewing.UI.DockingPanel {
    constructor(extension, id, title, options) {
        super(extension.viewer.container, id, title, options);
        this.extension = extension;
        this.container.style.left = (options.x || 0) + 'px';
        this.container.style.top = (options.y || 0) + 'px';
        this.container.style.width = (options.width || 500) + 'px';
        this.container.style.height = (options.height || 400) + 'px';
        this.container.style.resize = 'none';
    }

    initialize() {
        this.title = this.createTitleBar(this.titleLabel || this.container.id);
        this.initializeMoveHandlers(this.title);
        this.container.appendChild(this.title);
        this.content = document.createElement('div');
        this.content.style.height = '350px';
        this.content.style.backgroundColor = 'white';
        this.content.innerHTML = `<div class="datagrid-container" style="position: relative; height: 350px;"></div>`;
        this.container.appendChild(this.content);
        // See http://tabulator.info
        this.table = new Tabulator('.datagrid-container', {
            height: '100%',
            layout: 'fitColumns',
            columns: DATAGRID_CONFIG.columns,
            groupBy: DATAGRID_CONFIG.groupBy,
            rowClick: (e, row) => DATAGRID_CONFIG.onRowClick(row.getData(), this.extension.viewer)
        });
    }

    update(model, dbids) {
        this.table.replaceData(failedConditions.map((cond) => DATAGRID_CONFIG.createRow(cond)));
    }

    updateOld(model, dbids) {
        model.getBulkProperties(dbids, { propFilter: DATAGRID_CONFIG.requiredProps }, (results) => {
            this.table.replaceData(results.map((result) => DATAGRID_CONFIG.createRow(result.dbId, result.name, result.properties)));
        }, (err) => {
            console.error(err);
        });
    }
}