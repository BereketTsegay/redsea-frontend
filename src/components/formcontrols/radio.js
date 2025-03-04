import React, { Component } from 'react'

export default class radio extends Component {

    constructor(props){
        super(props);
        this.state = {
            option : this.props.option,
            label : this.props.label,
            name: this.props.name,
        }
        
    }

    eventChange = (e) => {

        this.props.radioChange(e.target.name, e.target.value);
    }
    
    render() {

        let {option, label, name} = this.state;
        let error = this.props.error ? this.props.error : '';

        let ErrorStyle = {
            color: 'red',
        };

        let selected1 = this.props.selected;

        return (
            <div className="form-group">
                <label>{label}</label>
                {option.map((a, index) => {

                    if(a.value === selected1){
                        return (
                       
                            <div class="custom-control custom-radio mb-3" key={index}>
                                <input type="radio" checked onChange={(e) => this.eventChange(e)} name={name} value={a.value} class="custom-control-input" id={a.value}/>
                                <label class="custom-control-label font-weight-normal" for={a.value}>{a.value} </label>
                            </div>
                        )
                    }
                    else{
                        return (
                       
                            <div class="custom-control custom-radio mb-3" key={index}>
                                <input type="radio" onChange={(e) => this.eventChange(e)} name={name} value={a.value} class="custom-control-input" id={a.value}/>
                                <label class="custom-control-label font-weight-normal" for={a.value}>{a.value} </label>
                            </div>
                        )
                    }
                })}
                {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' }
            </div>
        )
    }
}
