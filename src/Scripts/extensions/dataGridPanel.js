const DATAGRID_CONFIG = {
    columns: [ // Definition of individual grid columns (see http://tabulator.info for more details)
        { title: 'السبب', field: 'Message', widthGrow: 3, cssClass: "wrap-text" },
        { title: 'الاشتراط', field: 'desc', widthGrow: 4, cssClass: "wrap-text" },
        { title: 'م', field: 'code', widthGrow: 1, cssClass: "wrap-text" }
    ],
    createRow: (conditionResult) => {
        const code = conditionResult.Code;
        const desc = conditionResult.Description;
        const Message = conditionResult.Message;
        return { code, desc, Message };
    },
    onRowClick: (row) => {
        selectElementsByRevitIds(getErrorElementsIds(getConditionResultByCode(row.code).ErrorElementsIds));
    }
};

class DataGridPanel extends Autodesk.Viewing.UI.DockingPanel {
    constructor(extension, id, title, options) {
        super(extension.viewer.container, id, title, options);

        this.extension = extension;
        this.container.style.width = (options.width || 500) + 'px';
        this.container.style.height = 11 + 49.8 + 19.2 + 27 * failedConditions.length + 'px';
        //this.container.style.height = (options.height || 200) + 'px';
        this.container.style.left = (options.x || 0) + 'px';
        this.container.style.top = (options.y || 0) + 'px';
        // this.container.style.left = '66.7%';
        // this.container.style.top = '33%';
        //this.container.style.resize = 'none';
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
        this.table = new Tabulator('.datagrid-container', {
            height: '500px',
            layout: 'fitColumns',
            variableHeight: true,
            layoutColumnsOnNewData: true,
            columns: DATAGRID_CONFIG.columns,
            rowClick: (e, row) => DATAGRID_CONFIG.onRowClick(row.getData(), this.extension.viewer)
        });

    }
    counter = 0
    rowsOffsets = [];
    update(model, dbids) {
        this.table.replaceData(failedConditions.map((cond) => DATAGRID_CONFIG.createRow(cond)));
        let menu = document.getElementById('dashboard-datagrid-panel');
        let totalRowHeight = 0;
        let rows = this.table.getRows();
        if (this.counter == 0) {
            for (let i = 0; i < rows.length; i++) {
                this.rowsOffsets.push(rows[i].getElement().offsetHeight);
            }
        }
        else {
            for (let i = 0; i < rows.length; i++) {
                rows[i].getElement().style.height = this.rowsOffsets[i];
            }
        }
        rows.forEach(row => {
            const offset = row.getElement().offsetHeight;
            totalRowHeight += offset;
        });
        console.log(menu.style.height);
        menu.style.height = 11 + 49.8 + 19.2 + totalRowHeight + 'px';
        console.log(menu.style.height);
        this.counter++;
    }
}

