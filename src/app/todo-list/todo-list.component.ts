import { Component, OnInit, inject } from '@angular/core';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { TodoStore } from '../store/todo.store';
import { MatIcon } from '@angular/material/icon';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatSuffix,
    MatLabel,
    MatIcon,
    MatListOption,
    MatSelectionList,
    MatButtonToggle,
    MatButtonToggleGroup,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit{
  store = inject(TodoStore);

  ngOnInit(): void {
      console.log(this.store.todos());
      
  }
}
