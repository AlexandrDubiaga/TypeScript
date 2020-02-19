import React, {ChangeEvent} from 'react';
interface IProps {
    addItem: (value: string) => void,
    nameValue: string
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
            <div className="AddNewItemBlock">
                <h4 className="nameBlock">{this.props.nameValue}</h4>
                <div>
                    <input className="input" type="text" onChange={this.onChange} value={this.state.value}/>
                    <button className="AddNewItemButton" disabled={this.state.value==''} onClick={this.onClick}>Add</button>
                </div>
            </div>
        )

    }
}
export default AddNewIntemForm;

