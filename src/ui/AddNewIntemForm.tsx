import React, {ChangeEvent} from 'react';
import  style from './AddNewItemForm.module.css'
interface IProps {
    addItem: (value: string) => void,
    nameValue: string,
}
interface IState {
    value: string
}

class AddNewIntemForm extends React.Component<IProps, IState> {
    state: IState = {value: ''}
    onClick = () => {
        this.setState({value: ''})
        this.props.addItem(this.state.value)
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({value: e.currentTarget.value})
    }

    render() {
        return (
            <div className={style.AddNewItemBlock}>
                <h4 className={style.nameBlock}>{this.props.nameValue}</h4>
                <div>
                    <input className={style.input} type="text" onChange={this.onChange} value={this.state.value}/>
                    <button className={style.AddNewItemButton} disabled={this.state.value === ''}
                            onClick={this.onClick}>{this.state.value === '' ? 'Disabled' : "Add"}</button>
                </div>
                <div className={style.ErrorLenght}>

                </div>

            </div>
        )

    }
}
export default AddNewIntemForm;

