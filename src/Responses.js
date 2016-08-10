import React from 'react';


class Responses extends React.Component {
constructor(props) {
        super(props);
        this.state = {
            responses: props.responses;
        };
    }
    
    render() {

        return (
            <div> 
            <h1>Test</h1>

            </div>
        )
    }
}

export default Responses;


                <Selector vars={this.vars} results={this.results} options={this.options}/>