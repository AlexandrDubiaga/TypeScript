import React from 'react';

let age: number = 10;
let firstName: string = 'Alex';

interface IHuman{
    name:string;
    age:number;
    isMaried?:boolean;
}

let human:IHuman = {
    name:'Alex',
    age:32,
    isMaried:true

}





export default human;