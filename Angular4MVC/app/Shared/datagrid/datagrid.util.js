"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataGridUtil = (function () {
    function DataGridUtil() {
    }
    DataGridUtil.downloadcsv = function (data, exportFileName) {
        var csvData = this.convertToCSV(data);
        var blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, this.createFileName(exportFileName));
        }
        else {
            var link = document.createElement("a");
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", this.createFileName(exportFileName));
                //link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };
    DataGridUtil.convertToCSV = function (objarray) {
        var array = typeof objarray != 'object' ? JSON.parse(objarray) : objarray;
        var str = '';
        var row = "";
        for (var index in objarray[0]) {
            //Now convert each value to string and comma-separated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '')
                    line += ',';
                line += JSON.stringify(array[i][index]);
            }
            str += line + '\r\n';
        }
        return str;
    };
    DataGridUtil.createFileName = function (exportFileName) {
        var date = new Date();
        return (exportFileName +
            date.toLocaleDateString() + "_" +
            date.toLocaleTimeString()
            + '.csv');
    };
    return DataGridUtil;
}());
exports.DataGridUtil = DataGridUtil;
//# sourceMappingURL=datagrid.util.js.map