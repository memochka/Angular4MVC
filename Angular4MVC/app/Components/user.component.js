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
var user_service_1 = require("../Service/user.service");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var manageuser_component_1 = require("./manageuser.component");
var material_1 = require("@angular/material");
var user_pipe_1 = require("../filter/user.pipe");
var UserComponent = (function () {
    //Grid Vars end
    function UserComponent(_userService, dialog, userfilter) {
        this._userService = _userService;
        this.dialog = dialog;
        this.userfilter = userfilter;
        this.isREADONLY = false;
        this.exportFileName = "Users_";
        //Grid Vars start
        this.columns = [
            {
                display: 'First Name',
                variable: 'FirstName',
                filter: 'text',
            },
            {
                display: 'Last Name',
                variable: 'LastName',
                filter: 'text'
            },
            {
                display: 'Gender',
                variable: 'Gender',
                filter: 'text'
            },
            {
                display: 'Date of Birth',
                variable: 'DOB',
                filter: 'date'
            },
            {
                display: 'City',
                variable: 'City',
                filter: 'text'
            },
            {
                display: 'Country',
                variable: 'Country',
                filter: 'text'
            }
        ];
        this.sorting = {
            column: 'FirstName',
            descending: false
        };
        this.hdrbtns = [];
        this.gridbtns = [];
    }
    UserComponent.prototype.initGridButton = function () {
        this.hdrbtns = [
            {
                title: 'Add',
                keys: [''],
                action: enum_1.DBOperation.create,
                ishide: this.isREADONLY
            }
        ];
        this.gridbtns = [
            {
                title: 'Edit',
                keys: ['Id'],
                action: enum_1.DBOperation.update,
                ishide: this.isREADONLY
            },
            {
                title: 'X',
                keys: ["Id"],
                action: enum_1.DBOperation.delete,
                ishide: this.isREADONLY
            }
        ];
    };
    UserComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(manageuser_component_1.ManageUser);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.user = this.user;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "success") {
                _this.LoadUsers();
                switch (_this.dbops) {
                    case enum_1.DBOperation.create:
                        _this.msg = "Data successfully added.";
                        break;
                    case enum_1.DBOperation.update:
                        _this.msg = "Data successfully updated.";
                        break;
                    case enum_1.DBOperation.delete:
                        _this.msg = "Data successfully deleted.";
                        break;
                }
            }
            else if (result == "error")
                _this.msg = "There is some issue in saving records, please contact to system administrator!";
            else
                _this.msg = result;
        });
    };
    UserComponent.prototype.ngOnInit = function () {
        this.LoadUsers();
    };
    UserComponent.prototype.LoadUsers = function () {
        var _this = this;
        this._userService.get(global_1.Global.BASE_USER_ENDPOINT)
            .subscribe(function (users) { _this.users = users; _this.initGridButton(); });
    };
    UserComponent.prototype.addUser = function () {
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.openDialog();
    };
    UserComponent.prototype.editUser = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.user = this.users.filter(function (x) { return x.Id == id; })[0];
        this.openDialog();
    };
    UserComponent.prototype.deleteUser = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(function (x) { return x.Id == id; })[0];
        this.openDialog();
    };
    UserComponent.prototype.gridaction = function (gridaction) {
        switch (gridaction.action) {
            case enum_1.DBOperation.create:
                this.addUser();
                break;
            case enum_1.DBOperation.update:
                this.editUser(gridaction.values[0].value);
                break;
            case enum_1.DBOperation.delete:
                this.deleteUser(gridaction.values[0].value);
                break;
        }
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/user.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, material_1.MdDialog, user_pipe_1.UserFilterPipe])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map