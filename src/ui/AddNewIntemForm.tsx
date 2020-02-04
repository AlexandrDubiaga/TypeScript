import React, {ChangeEvent} from 'react';
interface IProps {
    addItem: (value: string) => void
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
            <div><input type="text" onChange={this.onChange} value={this.state.value}/>
                <button onClick={this.onClick}>Add</button>
            </div>
        )

    }
}
export default AddNewIntemForm;

