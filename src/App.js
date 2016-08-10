import React from 'react';
import ReactDOM from 'react-dom';

// var data = [{
//         "id": "1",
//         "response" : "yes"
//     },  {
//         "id": "2",
//         "response" : "no"
//     },  {
//         "id": "3",
//         "response" : "yes"
//     },  {
//         "id": "4",
//         "response" : "yes"
//     },  {
//         "id": "5",
//         "response" : "no"
// }]



var App = React.createClass({
    getInitialState() {
        return {value: 'Hello!', html: '<h3>{this.state.value}</h3>', json: ''};
    },
    handleChange(event) {
        this.setState({value: event.target.value});
    },
    render() {
        return (
            <div>
                <h1>Correlation Coefficient Matrix</h1>
                <p>Demo version: User must manually enter the file location for the jsonURI property value in the source code.</p>
                <input 
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                /> 
                <Responses val="response count:" jsonURI="json!./mockdata1.json"/>
            </div>
        );
    }
});

var Responses = React.createClass({
    propTypes: {
        val: React.PropTypes.string.isRequired,
        jsonURI: React.PropTypes.string.isRequired
    },
    getDefaultProps() {
        return {
            val: '100',
            jsonURI : 'json!./mockdata1.json'
        }
    },
    getInitialState() {
        return {
            x : 0,
            y: 0,
            fx: 0,
            fy: 0,
            fu: 0,
            fd: 0,
            fa: 0,
            fsd: 0,
            results: [[1,2][3,4]],
            vars: ['default'],
            options: ['default'],
            varcount: 0,
            len: 0,
            varlist: ['default'],
            htmlrows: ['default'],
            corrtext: '',
            filter: [],
            dummy: 0,
            filttext: ''
        }
    },
    changeHandlerX(event) {
        this.setState({x: event.target.value});
        var corrtext = 'Correlation between ' + this.state.vars[event.target.value] + ' and '+ this.state.vars[this.state.y] + ': ' + this.state.results[event.target.value][this.state.y];
        this.setState({corrtext: corrtext});
        
        
    },
    changeHandlerY(event) {
        this.setState({y: event.target.value});
        var corrtext = 'Correlation between ' + this.state.vars[this.state.x] + ' and '+ this.state.vars[event.target.value] + ': ' + this.state.results[this.state.x][event.target.value];
        this.setState({corrtext: corrtext});
        
    },
    changeHandlerFX(event) {
        this.setState({fx: event.target.value});
        var filttext = 
        this.setState({filttext: corrtext});
        
        
    },
    changeHandlerFY(event) {
        this.setState({fy: event.target.value});
        var corrtext = 'Correlation between ' + this.state.vars[this.state.x] + ' and '+ this.state.vars[event.target.value] + ': ' + this.state.results[this.state.x][event.target.value];
        this.setState({corrtext: corrtext});
        
    },
    changeHandlerFU(event) {
        this.setState({fu: event.target.value});
        var corrtext = 'Correlation between ' + this.state.vars[event.target.value] + ' and '+ this.state.vars[this.state.y] + ': ' + this.state.results[event.target.value][this.state.y];
        this.setState({corrtext: corrtext});
        
        
    },
    changeHandlerFD(event) {
        this.setState({fd: event.target.value});
        var corrtext = 'Correlation between ' + this.state.vars[this.state.x] + ' and '+ this.state.vars[event.target.value] + ': ' + this.state.results[this.state.x][event.target.value];
        this.setState({corrtext: corrtext});
        
    },
    componentDidMount() {
        var val = this.props.val;
        var json = require('json!./mockdata1.json');
        var len = json.responses.length;
        this.setState({len: len});
        var obj1 = json.responses[0];
        var vars = Object.keys(obj1);
        this.setState({vars: vars});
        var varcount = vars.length;
        var results = [];
        var htmlrows = [];
        var header = [];
        var varlist = [];
        var devs = new Array(varcount);
        var avgs = new Array(varcount);
        for(var i = 0; i < varcount; i++){
            header.push(<th>{i}</th>);
        }
        htmlrows.push(<tr>{header}</tr>);
        var test = 'univ';
        var options = [];
        // building up option dropdown for bold selection
        for (var i = 0; i < varcount; i++) {
            options.push(<option value = {i}>{i}: {vars[i]}</option>);
        }
        for (var i = 0; i < varcount; i++){
            var var1 = vars[i];
            var row = [];
            var htmlrow = [];
            for (var j = 0; j < varcount; j++){
                var var2 = vars[j];
                var data1 = new Array(len);
                var data2 = new Array(len);

                for (var k = 0; k < len; k++){
                    data1[k] = json.responses[k][var1];
                    data2[k] = json.responses[k][var2];

                };
                var sum1 = 0;
                for(var k = 0; k < len; k++){
                    sum1 += data1[k];
                };
                var sum2 = 0;
                for(var k = 0; k < data2.length; k++){
                    sum2 += data2[k];
                }
                var avg1 = sum1 / data1.length;
                avgs[i] = avg1;
                var avg2 = sum2 / data2.length;
                var sqsum1 = 0;
                for(var k = 0; k < data1.length; k++){
                    sqsum1 += ((data1[k] - avg1) * (data1[k] - avg1));
                }
                var sqsum2 = 0;
                for(var k = 0; k < data2.length; k++){
                    sqsum2 += ((data2[k] - avg2) * (data2[k] - avg2));
                }           
                var stddev1 = Math.sqrt(sqsum1 / data1.length);
                devs[i] = stddev1;
                var stddev2 = Math.sqrt(sqsum2 / data2.length);
                var covsum = 0;
                for(var k = 0; k < data1.length; k++){
                    covsum += (data1[k] * data2[k]);
                }
                var covariance = (covsum / data1.length) - (avg1 * avg2);
                var correlation = (covariance / (stddev1 * stddev2));
                var rgb = Math.floor(correlation*255);
                if (isNaN(rgb)) {
                    rgb = 0;
                }
                row.push(correlation);
                var rgbString = '#000000';
                var r = 255;
                var g = 255;
                var b = 255;
                if (rgb < 0) {
                    g = 255+rgb;
                    b = 255+rgb;
                    if(g < 16) {
                        rgbString = '#'+r.toString(16)+'0'+g.toString(16)+'0'+b.toString(16);
                    } else {
                        rgbString = '#'+r.toString(16)+g.toString(16)+b.toString(16);
                    }               
                } else {
                    r = 256-rgb;
                    g = 256-rgb;
                    if(g < 16) {
                        rgbString = '#'+'0'+r.toString(16)+'0'+g.toString(16)+b.toString(16);
                    } else {
                        rgbString = '#'+r.toString(16)+g.toString(16)+b.toString(16);
                    }                  
                }
                var int = Math.floor(rgb / 256 * 100);
                htmlrow.push(<td style={{border: '1px solid black', background: rgbString}}>{int}</td>);
                console.log(this.state.x+' '+this.state.y);               
                // console.log("Correlation between "+var1+" and "+var2+": "+correlation + " color hex: " + rgbString);
            };
            results.push(row);
            htmlrow.push(<th>{i}</th>);
            htmlrows.push(<tr>{htmlrow}</tr>);
        };
        this.setState({results: results});
        this.setState({options: options});
        for (var i = 0; i < varcount; i++){
            var varstring = i + ": " + vars[i];
            var ptext = 'Average: ' + avgs[i] + ', Standard Deviation: ' + devs[i];
            varlist.push(<tr>
                <td style={{border: '1px solid black'}}>{varstring}</td>
                <td style={{border: '1px solid black'}}>{ptext}</td>
                </tr>);
            // varlist.push(<p>{ptext}</p>);
        };
        this.setState({varlist: varlist});
        this.setState({htmlrows: htmlrows});
        this.makeFilter();
    },
    makeFilter() {
        var filter = [];
        var json = require('json!./data.json');
        var opts = [];
        for (var i = 0; i < 100; i++) {
            opts.push(<option value = {i}>{i}</option>);
        }
        this.setState({opts: opts}, function(){
            console.log(this.state.opts);
        });
        var data = [];
        for (var i = 0; i < this.state.len; i++) {
            if ((json.responses[i][vars[this.state.fy]] <= this.state.fu) && (json.responses[i][vars[this.state.fy]] >= this.state.fd)){
                data.push(json.responses[i][vars[this.state.fx]]);
            }     
        }
        var sum = 0;
        for(var k = 0; k < data.length; k++){
            sum += data[k];
        }
        var avg = sum / data.length;
        this.setState({fa: avg});
        var sqsum = 0;
        for(var k = 0; k < data.length; k++){
            sqsum += ((data[k] - avg) * (data[k] - avg));
        }
        var stddev = Math.sqrt(sqsum / data.length);
        this.setState({fsd: stddev});
        filter.push(
            <div>
            <select onChange={this.changeHandlerFX}>{this.state.options}</select>
            <select onChange={this.changeHandlerFY}>{this.state.options}</select>
            <select onChange={this.changeHandlerFU}>{this.state.opts}</select>
            <select onChange={this.changeHandlerFD}>{this.state.opts}</select></div>);
        this.setState({filter: filter}, function() {
            console.log(this.state.filter);
        });
        
        // need: json loaded, sliders to 
    },
    render() {
        return (
            <div>
                <h3>Response count: {this.state.len}</h3>
                <h3>data source: {this.props.jsonURI}</h3>
                
                <p>Select two variables to calculate correlation for:</p>
                <select onChange={this.changeHandlerX}>{this.state.options}</select>
                <select onChange={this.changeHandlerY}>{this.state.options}</select>
                <p>{this.state.corrtext}</p>
                <table style={{border: '2px solid red'}}><tbody>{this.state.htmlrows}</tbody></table>
                <br></br>
                <table style={{border: '2px solid blue'}}><tbody>{this.state.varlist}</tbody></table>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Filter />
            </div>       
        )
    }
});

var Selector = React.createClass({
    propTypes: {
        vars: React.PropTypes.array.isRequired,
        results: React.PropTypes.array.isRequired
    },
    getDefaultProps(){
        return {
            vars: [],
            results: []
        }
    },
    getInitialState() {
        return {
            x : 0,
            y: 0
        }
    },
    changeHandlerX(event) {
        this.state.x = event.target.value;
        console.log(this.state.x);
    },
    changeHandlerY(event) {
        this.state.y = event.target.value;
        console.log(this.state.y);
        console.log(vars);
    },
    render() {
        var options = [];
        // building up option dropdown for bold selection
        for (var i = 0; i < vars.length; i++) {
            options.push(<option value = {i}>{vars[i]}</option>);
        }
        return(
            <div>
                <select onChange={this.changeHandlerX}>{options}</select>
                <select onChange={this.changeHandlerY}>{options}</select>
                <p>Correlation between {vars[this.state.x]} and {vars[this.state.y]}: {results[this.state.x][this.state.y]}</p>
            </div>
        );
    }
});

var Filter = React.createClass({
    render() {
        return(
            <div>;)</div>
        );
    }
});

var Cell = React.createClass({
    propTypes: {
        val: React.PropTypes.number.isRequired
    },
    render() {
        return(
            <table border="1">
            <tbody>
              <tr>
                <th>Month</th>
                <th>Savings</th>
              </tr>
              <tr>
                <td>January</td>
                <td>$100</td>
              </tr>
              <tr>
                <td>February</td>
                <td>$50</td>
              </tr>
            </tbody>
            </table>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));