import React, { Component } from 'react'

export default class date extends Component {
    
    constructor(props){
        super(props);
    }

    handleChange = e => {

        this.props.handleChange(e.target.name, e.target.value)
    }

    render() {

        let name = this.props.name;
        let readonly = this.props.readonly;
        let value = this.props.value;

        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <input type="date" name={name} value={value} onChange={(e) => this.handleChange(e)} className="form-control" placeholder={this.props.placeholder} readOnly={readonly} />
            </div>
        )
    }
}
