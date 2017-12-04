"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var Format = (function () {
    function Format() {
        this.datePipe = new common_1.DatePipe('yMd');
    }
    Format.prototype.transform = function (input, args) {
        if (input == null)
            return '';
        var format = '';
        var parsedFloat = 0;
        var pipeArgs = args.split(':');
        for (var i = 0; i < pipeArgs.length; i++) {
            pipeArgs[i] = pipeArgs[i].trim(' ');
        }
        switch (pipeArgs[0].toLowerCase()) {
            case 'text':
                return input;
            case 'date':
                return this.getDate(input);
            case 'csv':
                if (input.length == 0)
                    return "";
                if (input.length == 1)
                    return input[0].text;
                var finalstr = "";
                for (var i_1 = 0; i_1 < input.length; i_1++) {
                    finalstr = finalstr + input[i_1].text + ", ";
                }
                return finalstr.substring(0, finalstr.length - 2);
            default:
                return input;
        }
    };
    Format.prototype.getDate = function (date) {
        return new Date(date).toLocaleDateString();
    };
    return Format;
}());
Format = __decorate([
    core_1.Pipe({
        name: 'format'
    }),
    core_1.Injectable()
], Format);
exports.Format = Format;
//# sourceMappingURL=format.js.map