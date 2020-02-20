import React from 'react';
import style from './Footer.module.css';

interface IProps{
    filterValue:string,
    changeFilterValue:(newFilterValue:any)=>void
}

class Footer extends React.Component<IProps> {
    render() {
        return (
            <div>
                <button className={this.props.filterValue==="All"?style.All:''} onClick={this.props.changeFilterValue} value={"All"}>All</button>
                <button className={this.props.filterValue==="Completed"?style.Completed:''} onClick={this.props.changeFilterValue} value={"Completed"}>Completed</button>
                <button className={this.props.filterValue==="Active"?style.Active:''} onClick={this.props.changeFilterValue} value={"Active"}>Active</button>
                <button className={this.props.filterValue==="New"?style.New:''} onClick={this.props.changeFilterValue} value={"New"}>New</button>
            </div>
        )
    }
}


export default Footer;