import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatusesService, TasksService, UsersService } from '../../core/services';
import { Status, Task, User } from '../../core/interfaces';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnDestroy, OnInit {

  isNewRequest = false;
  isEditRequest = false;
  selectedTask: Task;
  tasks: Task[] = [];
  statuses: Status[] = [];
  users: User[] = [];
  selectedStatus: Status;
  isPending = false;
  isEdited = false;

  newRequestFormGroup: FormGroup;
  editRequestFormGroup: FormGroup;

  private _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private _tasksService: TasksService,
    private _statusesService: StatusesService,
    private _usersService: UsersService,
    private _formBuilder: FormBuilder,
  ) {
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    this._initNewRequestFormGroup();
    this._initEditRequestFormGroup();
    this._handleStatus();
    this._getTasks();
    this._getStatuses();
    this._getUsers();
  }

  selectTask(task: Task): void {
    this.isPending = true;

    this._tasksService.getTaskById(task.id)
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((res: Task) => {
        this.isPending = false;
        this.selectedTask = res;
        this._setSelectedStatusAndExecutor(res.statusId, res.executorId);
        this.isNewRequest = false;
        this.isEditRequest = true;
      }, () => this.isPending = false);
  }

  closeEditRequest(): void {
    this.isNewRequest = false;
    this.isEditRequest = false;
    this.newRequestFormGroup.reset();
    this.editRequestFormGroup.reset();

    if (this.isEdited) {
      this._getTasks();
    }
  }

  openNewRequest(): void {
    this.isEditRequest = false;
    this.isNewRequest = true;
  }

  createNewRequest(): void {
    if (this.newRequestFormGroup.invalid) {
      return;
    }

    this.isPending = true;

    this._tasksService.createTask(this.newRequestFormGroup.value)
      .pipe(
        switchMap((res: number) => this._tasksService.getTaskById(res)),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((res: Task) => {
        this.isPending = false;
        this.tasks.unshift(res);
        this.selectedTask = res;
        this._setSelectedStatusAndExecutor(res.statusId, res.executorId);
        this.isNewRequest = false;
        this.isEditRequest = true;
      }, () => this.isPending = false);
  }

  editRequest(): void {
    const data: any = {
      id: this.selectedTask.id,
      taskTypeId: this.selectedTask.taskTypeId,
      priorityId: this.selectedTask.priorityId,
      serviceId: this.selectedTask.serviceId,
      initiatorId: this.selectedTask.initiatorId,
    };
    const formGroupValue = this.editRequestFormGroup.value;

    for (const key in formGroupValue) {
      if (formGroupValue.hasOwnProperty(key) && formGroupValue[key] !== undefined && formGroupValue[key] !== '') {
        data[key] = formGroupValue[key];
      }
    }

    this.isPending = true;

    this._tasksService.editTask(data)
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe(() => {
        this.isPending = false;
        this.isEdited = true;
      }, () => this.isPending = false);
  }

  private _initNewRequestFormGroup(): void {
    this.newRequestFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private _initEditRequestFormGroup(): void {
    this.editRequestFormGroup = this._formBuilder.group({
      comment: '',
      statusId: null,
      executorId: null,
    });
  }

  private _getTasks(): void {
    this._tasksService.getTasks()
      .pipe(
        tap(() => this.isEdited = false),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((res: Task[]) => this.tasks = res);
  }

  private _getStatuses(): void {
    this._statusesService.getStatuses()
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((res: Status[]) => this.statuses = res);
  }

  private _getUsers(): void {
    this._usersService.getUsers()
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((res: User[]) => this.users = res);
  }

  private _handleStatus(): void {
    this.editRequestFormGroup.get('statusId').valueChanges
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((res: string) => {
        this.selectedStatus = this.statuses.find(status => status.id === +res);
      });
  }

  private _setSelectedStatusAndExecutor(statusId: number, executorId: number): void {
    this.selectedStatus = this.statuses.find(status => status.id === statusId);
    this.editRequestFormGroup.get('statusId').setValue(statusId);
    this.editRequestFormGroup.get('executorId').setValue(executorId);
  }

}
