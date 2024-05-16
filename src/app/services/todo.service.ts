import { Injectable } from "@angular/core";
import { TODOS } from "../model/mock.data";
import { todo } from "../model/todo.model";

@Injectable({
        providedIn:'root'
})

export class TodoService {

        async getTodos(){
                await sleep(1000)
                return TODOS
        }

        async addTodo(todos:Partial<todo>){
                await sleep(1000);
                return {
                        id:Math.random().toString(36).substr(2,9),
                        ...todos
                } as todo
        }

        async deleteTodo(){
                await sleep(300)

        }

        async UpdateTodo(id:string,completted:boolean){
                await sleep(500)

        }


        
}
async function  sleep(ms:number) {
        return new Promise(resolve =>
                setTimeout(resolve,ms)
        )
}