import { todo } from "../model/todo.model"
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals'
import { TodoService } from "../services/todo.service";
import { computed, inject } from "@angular/core";

export type TodoFilter= "all" | "pending" | "completted"

type TodoState={
       todos:todo[];
       loading:boolean;
       filter:TodoFilter
}

const initialState:TodoState={
        todos:[],
        loading:false,
        filter:"all"
}

export const TodoStore= signalStore(
        {providedIn:'root'},
        withState(initialState),
        withMethods(
                (store, todoservice = inject(TodoService))=>({
                         async loadAll(){
                                patchState(store,{loading:true})

                                const todos = await todoservice.getTodos()

                                patchState(store, {todos,loading:false})
                         },

                         async addTodo(title:string){

                                const todo =  await todoservice.addTodo({title, completted:false})

                                patchState(store, (state)=>({
                                        todos:[...state.todos,todo]
                                }))
                         },

                         async deleteTodo(id:string){

                                await todoservice.deleteTodo()

                                patchState(store, (state)=>({
                                        todos:state.todos.filter(todo => todo.id !==id)
                                }))
                         },

                         async updateTodo(id:string, completted:boolean){
                                
                                await todoservice.UpdateTodo(id,completted)

                                patchState(store,(state)=>({
                                        todos:state.todos.map(todo=>
                                                todo.id === id ? {...todo,completted} : todo
                                        )
                                }))
                         },

                         async updatefilter(filter:TodoFilter){

                                patchState(store,{filter})
                         }
                })
        ),
        withComputed((state)=>({
                filteredTodos:computed(()=>{
                        const todos =state.todos()

                        switch(state.filter()){
                                case "all":
                                        return todos
                                case "pending":
                                        return todos.filter(todo=>  !todo.completted)
                                case "completted":
                                        return todos.filter(todo=>  todo.completted)

                        }
                })
        }))
)