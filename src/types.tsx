export interface ITasks {
    title?: string;
    status?: boolean
}

export interface ITodolist {
    id: string;
    title: string;
    addedDate:string;
    order: number;
    tasks: Array<ITasks>
}



