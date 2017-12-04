"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var datagrid_util_1 = require("./datagrid.util");
var format_1 = require("./format");
var DataGrid = (function () {
    function DataGrid() {
        //Output Variable
        this.btnclick = new core_1.EventEmitter();
        //Local Variable
        this.pdata = this.data;
        this.searchTitle = "Search:";
    }
    DataGrid.prototype.ngOnChanges = function (changes) {
        if (JSON.stringify(changes).indexOf("data") != -1)
            this.pdata = this.data;
        this.criteriaChange(this.listFilter);
    };
    DataGrid.prototype.selectedClass = function (columnName) {
        return columnName == this.sort.column ? 'sort-' + this.sort.descending : false;
    };
    DataGrid.prototype.changeSorting = function (columnName) {
        var sort = this.sort;
        if (sort.column == columnName) {
            sort.descending = !sort.descending;
        }
        else {
            sort.column = columnName;
            sort.descending = false;
        }
    };
    DataGrid.prototype.convertSorting = function () {
        return this.sort.descending ? '-' + this.sort.column : this.sort.column;
    };
    DataGrid.prototype.click = function (btn, row) {
        var keyds = {};
        keyds.action = btn.action;
        if (row != null) {
            keyds.values = [];
            btn.keys.forEach(function (key) {
                keyds.values.push({ key: key, value: row[key] });
            });
        }
        this.btnclick.emit(keyds);
    };
    DataGrid.prototype.criteriaChange = function (value) {
        if (this.filter != null) {
            if (value != '[object Event]') {
                this.listFilter = value;
                this.pdata = this.filter.transform(this.data, this.listFilter);
            }
        }
    };
    DataGrid.prototype.exporttoCSV = function () {
        var _this = this;
        var exprtcsv = [];
        JSON.parse(JSON.stringify(this.data)).forEach(function (x) {
            var obj = new Object();
            var frmt = new format_1.Format();
            for (var i = 0; i < _this.columns.length; i++) {
                var transfrmVal = frmt.transform(x[_this.columns[i].variable], _this.columns[i].filter);
                obj[_this.columns[i].display] = transfrmVal;
            }
            exprtcsv.push(obj);
        });
        datagrid_util_1.DataGridUtil.downloadcsv(exprtcsv, this.exportFileName);
    };
    return DataGrid;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DataGrid.prototype, "columns", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DataGrid.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataGrid.prototype, "sort", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DataGrid.prototype, "gridbtns", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DataGrid.prototype, "hdrbtns", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataGrid.prototype, "isshowfilter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataGrid.prototype, "isExporttoCSV", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataGrid.prototype, "exportFileName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataGrid.prototype, "filter", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataGrid.prototype, "btnclick", void 0);
DataGrid = __decorate([
    core_1.Component({
        selector: 'data-grid',
        styleUrls: ['app/shared/datagrid/datagrid.style.css'],
        templateUrl: 'app/shared/datagrid/datagrid.component.html'
    })
], DataGrid);
exports.DataGrid = DataGrid;
//# sourceMappingURL=datagrid.component.js.map