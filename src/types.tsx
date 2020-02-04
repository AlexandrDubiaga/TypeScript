export interface ITasks {
    description: string
    title: string
    completed:boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate:string
}

export interface ITodolist {
    id: string;
    title: string;
    addedDate:string;
    order: number;
    tasks: Array<ITasks>
}



