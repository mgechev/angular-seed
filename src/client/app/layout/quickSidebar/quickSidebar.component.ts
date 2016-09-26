import { Component, OnInit} from '@angular/core';
import {ToDoListService} from './services/myToDoList.service'
import {TODOList} from './model/ToDoList';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MasterData, ResponseFromAPI} from  './../../shared/model/index';
import { MastersService } from '../../shared/services/masters.service';
import { APIResult } from  '../../shared/constantValue/index';
@Component({
  moduleId: module.id,
  selector: 'quick-sidebar',
  templateUrl: 'quickSidebar.component.html',
  providers: [ToDoListService, ToastsManager, MastersService]
})
export class QuickSidebarComponent implements OnInit {
  MyTodoList: Array<TODOList> = new Array<TODOList>();
  errorMessage: string;
  toDoTask: TODOList = new TODOList;
  currentUser: MasterData = new MasterData();
  isNewTask: boolean = false;

  ngOnInit(): void {
    QuickSidebar.init();
    this.getLoggedInUser();
    this.getMyToDoList();
  }
  constructor(private _todoservice: ToDoListService, private _masterService: MastersService,
    private toastr: ToastsManager) { }

  getMyToDoList() {
    this._todoservice.GetMyToDoList()
      .subscribe(
      (results: any) => {
        if (results.length !== undefined && results.length > 0) {
          this.MyTodoList = results;
        } //else { this.NORECORDSFOUND = true; }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }

  getLoggedInUser() {
    this._masterService.getCurrentLoggedInUser()
      .subscribe(
      (results: MasterData) => {
        this.currentUser = results;
      },
      error => this.errorMessage = <any>error);
  }

  setCurrentTask(task: TODOList) {
    this.toDoTask.ID = task.ID;
    this.toDoTask.Title = task.Title;
    this.isNewTask = false;

  }
  clearData() {
    this.toDoTask = new TODOList;
  }

  updateTask(task: TODOList) {

    /* CALL service method to update Current item*/
    this._todoservice.UpdateToDoTask(task)
      .subscribe(
      (results: ResponseFromAPI) => {
        if (results.StatusCode === APIResult.Success) {
          this.toastr.success((<ResponseFromAPI>results).Message);
          this.getMyToDoList();
        } else {
          this.toastr.error((<ResponseFromAPI>results).Message);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }

  AddTask(task: TODOList) {
    task.Owner.Id = this.currentUser.Id;
    task.Owner.Value = this.currentUser.Value;
    /* CALL service method to add item*/
    this._todoservice.AddToDoTask(task)
      .subscribe(
      (results: ResponseFromAPI) => {
        if (results.StatusCode === APIResult.Success) {
          this.toastr.success((<ResponseFromAPI>results).Message);
          this.getMyToDoList();
          this.clearData();
        } else {
          this.toastr.error((<ResponseFromAPI>results).Message);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  RemoveTask(taskId: string) {
    /* CALL service method to Remove Current item*/
    this._todoservice.RemoveToDoTask(taskId)
      .subscribe(
      (results: ResponseFromAPI) => {
        if (results.StatusCode === APIResult.Success) {
          this.toastr.success((<ResponseFromAPI>results).Message);
          this.getMyToDoList();
        } else {
          this.toastr.error((<ResponseFromAPI>results).Message);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.toastr.error(<any>error);
      });
  }
  addNewTask() {
    this.clearData();
    this.toDoTask.Owner.Id = this.currentUser.Id;
    this.toDoTask.Owner.Value = this.currentUser.Value;
    this.isNewTask = true;
  }
}
