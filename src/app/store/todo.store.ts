import { todo } from "../model/todo.model"
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals'
import { TodoService } from "../services/todo.service";
import { inject } from "@angular/core";

export type TodoFilter= "all" | "active" | "completted"

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
                         }
                })
        )
)