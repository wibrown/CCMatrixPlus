import React from 'react';
import ReactDOM from 'react-dom';


var App = React.createClass({
    getInitialState() {
        return {value: 'mockdata1.json'};
    },
    handleChange(event) {
        this.setState({value: event.target.value});
    },
    render() {
        return (
            <div>
                <h3>CCMatrixPlus is a web application for statistical analysis of JSON data, built on React.js and Node.</h3>
                <p>In this demo version of the application, data sources are hard-coded in the App.js file. The option to upload data to the web from a local file may be added in a later version.</p>
                <p>Data source: mockdata1.json</p>
                <Responses jsonURI="json!./mockdata1.json"/>
            </div>
        );
    }
});

var Responses = React.createClass({
    propTypes: {
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
            fu: 100,
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
            filttext: '',
            json: require('json!./mockdata1.json')
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
        var json = this.state.json;
        var vars = this.state.vars;
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
        // console.log(data);
        console.log(vars);
    },
    changeHandlerFY(event) {
        this.setState({fy: event.target.value});
        var json = this.state.json;
        var vars = this.state.vars;
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
        
    },
    changeHandlerFU(event) {
        this.setState({fu: event.target.value});
        var json = this.state.json;
        var vars = this.state.vars;
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
        
    },
    changeHandlerFD(event) {
        this.setState({fd: event.target.value});
        var json = this.state.json;
        var vars = this.state.vars;
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
        console.log(this.state.fa);

    },
    componentDidMount() {
        var val = this.props.val;
        var json1 = require('json!./mockdata1.json');
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
                var rgb = Math.round(correlation*255);
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
                var int = Math.round(rgb / 256 * 100);
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
        var filter = [];
        var json = require('json!./mockdata1.json');
        var opts = [];
        for (var i = 0; i <= 100; i++) {
            opts.push(<option value={i}>{i}</option>);
        }
        this.setState({opts: opts});
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
        console.log(data);
    },
    render() {
        return (
            <div class="container">
            <div class="row">
                <p>Number of rows analyzed: {this.state.len}</p>
                <h5>CCMatrixPlus provides a number of tools for analyzing your data -- a correlation coefficient calculator, a correlation coefficient matrix, a table of variable statistics, and a filtering system that uses one variable to constrain the row set of another.</h5>
            </div>
            <br></br>
            <h3>Correlation Calculator</h3>
            <p>This tool allows you to determine the statistical correlation between any two variables in your data set.
            A correlation of 1 represents a perfect positive relationship, a correlation of -1 represents a perfect negative relationship, and a correlation of 0 represents the lack of a relationship.  
            The formula for the Pearson product-movement correlation coefficient is used to determine the results.</p>
                <p>Select two variables to calculate the correlation between:</p>
                <select onChange={this.changeHandlerX}>{this.state.options}</select>
                <select onChange={this.changeHandlerY}>{this.state.options}</select>
                <p>{this.state.corrtext}</p>
                <br></br>
            <div class="row">
            <div class="col-sm-1">
            <h3>Correlation Coefficient Matrix</h3>
            <p>This tool visually depicts the correlation coefficients for all pairs of variables in the data set. Numbers on the top and right side correspond to the index of each variable, which can be referenced via the dropdowns in the above calculators, or via the stat table below.
            Coefficients are normalized between -100 and 100, which roughly indicates the percentage of correlation between the variables. 
            Shades of blue represent positive values while shades of red represent negative values. 
            It is worth noting that all variables have a perfect correlation with themselves, which explains the solid blue diagonal on the matrix.</p>
                <table style={{border: '2px solid red'}}><tbody>{this.state.htmlrows}</tbody></table>
            </div>
            <br></br>
            <h3>Statistics Table</h3>
            <p>This table displays the average and standard deviation for each variable.</p>
            <div class="col-sm-1">
                <table style={{border: '2px solid blue'}}><tbody>{this.state.varlist}</tbody></table>
            </div>
            <h3>Filter</h3>
            <p>Currently broken. Trying to fix.</p>
            <select onChange={this.changeHandlerFX}>{this.state.options}</select>
            <select onChange={this.changeHandlerFY}>{this.state.options}</select>
            <select onChange={this.changeHandlerFD}>{this.state.opts}</select>
            <select onChange={this.changeHandlerFU} value='100'>{this.state.opts}</select>
            <p>{this.state.fa}, {this.state.fsd}</p>
            <br></br>
            </div>
            </div>    
        )
    }
});

ReactDOM.render(<App />, document.getElementById('app'));