import React,{ChangeEvent} from 'react';
interface IProps {
    addItem: (value: string) => void
}
interface IState {
    value: string
    error: string | null
}


class AddNewIntemForm extends React.Component<IProps, IState> {
    state: IState = {value: '', error: ''}
    onClick = () => {
        if (this.state.error === "") {
            this.setState({error: 'Value cant be empty'});
        } else {
            this.setState({error: null, value: ''})
            this.props.addItem(this.state.value);
        }
    }
    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({error: null, value: e.currentTarget.value})
    }

    render() {
        return (
            <div><input type="text" onChange={this.onChange} value={this.state.value}/>
                <button onClick={this.onClick}>Add New Todolist</button>
                {this.state.error &&
                <div>
                    {this.state.error}
                </div>
                }
            </div>
        )
    }
}
export default AddNewIntemForm;