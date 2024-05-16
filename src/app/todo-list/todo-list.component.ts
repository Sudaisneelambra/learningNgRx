import { Component, OnInit, effect, inject, viewChild } from '@angular/core';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { TodoFilter, TodoStore } from '../store/todo.store';
import { MatIcon } from '@angular/material/icon';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [
    CommonModule,
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

  filter = viewChild.required(MatButtonToggleGroup)

  constructor(){
    effect(()=>{
      const filter = this.filter()
      filter.value=this.store.filter()
    })
  }

  ngOnInit(): void {
      console.log(this.store.todos());
      
  }

  async addtodo(title:string){
       await this.store.addTodo(title)
  }

  async OndeleteTodo(id:string,event: MouseEvent){
      event.stopPropagation()

      await this.store.deleteTodo(id)

  }

  async onTodotoggle(id:string,completted:boolean){
    await this.store.updateTodo(id,completted)
  }

  onFilterTodos(event:MatButtonToggleChange){

    const filter = event.value as TodoFilter
    console.log(filter);
    
    this.store.updatefilter(filter)

  }
}
