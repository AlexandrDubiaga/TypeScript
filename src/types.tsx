export interface ITasks {
    title: string;
    status: boolean
}

export interface ITodolist {
    id: number;
    title: string;
    tasks: Array<ITasks>
}




