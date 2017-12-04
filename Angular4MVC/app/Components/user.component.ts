import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Service/user.service';
import { IUser } from '../Model/user';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { ManageUser } from './manageuser.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { UserFilterPipe } from '../filter/user.pipe'

@Component({
    templateUrl: 'app/Components/user.component.html'
})

export class UserComponent implements OnInit {

    isREADONLY: boolean = false;
    exportFileName: string = "Users_";

    users: IUser[];
    user: IUser;
    msg: string;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    //Grid Vars start
    columns: any[] = [
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
    sorting: any = {
        column: 'FirstName',
        descending: false
    };
    hdrbtns: any[] = [];
    gridbtns: any[] = [];
    initGridButton() {

        this.hdrbtns = [
            {
                title: 'Add',
                keys: [''],
                action: DBOperation.create,
                ishide: this.isREADONLY

            }];
        this.gridbtns = [
            {
                title: 'Edit',
                keys: ['Id'],
                action: DBOperation.update,
                ishide: this.isREADONLY
            },
            {
                title: 'X',
                keys: ["Id"],
                action: DBOperation.delete,
                ishide: this.isREADONLY
            }

        ];

    }
    //Grid Vars end

   
    constructor(private _userService: UserService, private dialog: MdDialog, private userfilter: UserFilterPipe) { }

    openDialog() {
        let dialogRef = this.dialog.open(ManageUser);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.user = this.user;

        dialogRef.afterClosed().subscribe(result => {
            if (result == "success") {
                this.LoadUsers();
                switch (this.dbops) {
                    case DBOperation.create:
                        this.msg = "Data successfully added.";
                        break;
                    case DBOperation.update:
                        this.msg = "Data successfully updated.";
                        break;
                    case DBOperation.delete:
                        this.msg = "Data successfully deleted.";
                        break;
                }
            }
            else if (result == "error")
                this.msg = "There is some issue in saving records, please contact to system administrator!"
            else
                this.msg = result;
        });
    }
    ngOnInit(): void {
        this.LoadUsers();
    }
    LoadUsers(): void {
        this._userService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(users => { this.users = users; this.initGridButton(); }
            );
    }
    addUser() {
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.openDialog();
    }
    editUser(id: number) {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.openDialog();
    }
    deleteUser(id: number) {
        this.dbops = DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.openDialog();
    }
  
    gridaction(gridaction: any): void {

        switch (gridaction.action) {
            case DBOperation.create:
                this.addUser();
                break;
            case DBOperation.update:
                this.editUser(gridaction.values[0].value);
                break;
            case DBOperation.delete:
                this.deleteUser(gridaction.values[0].value);
                break;
        }
    }
}