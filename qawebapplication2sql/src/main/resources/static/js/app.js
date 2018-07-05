var Navbar = React.createClass({
    render: function () {
        return( <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">AccountApp</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#" onClick={ (f) => dashboardClick(f)} >DashBoard <span className="sr-only">(current)</span>  </a>
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Accounts
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#" onClick={ (g) => addAccountClick(g)}>Add Account</a>
        <a className="dropdown-item" href="#" onClick={ (e) => handleClick(e)}>Get Accounts</a>

        </div>
        </li>
        </div>
        </div>
        </nav>
    ) }
});

var Employee = React.createClass({
    getInitialState: function() {
        return {display: true };
    },
    handleDelete() {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/app/remove/" + this.props.employee.id,
            type: 'DELETE',
            success: function(result) {
                self.setState({delete: true});
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error('An error has occurred');
            }
        });
    },

    render: function() {
        if (!this.state.delete) return (
            <tr>
            <td>{this.props.employee.firstName}</td>
            <td>{this.props.employee.lastName}</td>
            <td>{this.props.employee.email}</td>
            <td>{this.props.employee.password}</td>
            <td>
            <button type="submit" className="btn btn-primary" id = "employeeDelete" onClick={this.handleDelete}>Delete</button>
            </td>
             <td>
                 <EditTable employee={this.props.employee}/>
             </td>
            </tr>
             );
        else return null;

    }

});

var EditTable = React.createClass({
    getInitialState: function() {
        return {
            firstName: this.props.employee.firstName,
            lastName: this.props.employee.lastName,
            email: this.props.employee.email,
            password: this.props.employee.password
        }
    },
    renderUpdates: function(){

        ReactDOM.render(
            <DashBoard />, document.getElementById('accounts')
        );

        ReactDOM.render(
            <DatabaseAccounts />, document.getElementById('accounts')
        )
    },
    componentWillMount:function() {
        const id = "modal-" + this.props.employee.id;
        this.setState({id: id, dataTarget : "#" + id})
    },

    render: function() {
        return(
            <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={this.state.dataTarget}>
                Edit
            </button>


            <div className="modal fade" id={this.state.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div className="modal-body">
            <EditForm employee={this.props.employee} onClick={this.props.onClick}/>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.renderUpdates}>Close</button>
        </div>
    </div>
    </div>
    </div>
            </div>
        )}
    });
var EditForm = React.createClass({
    getInitialState: function(){
        return {
            firstName: this.props.employee.firstName,
            lastName: this.props.employee.lastName,
            email: this.props.employee.email,
            password: this.props.employee.password
    }
    },
    fNameEdit: function(f) {
        this.setState({ firstName: f.target.value})
    },
    lNameEdit: function(f) {
        this.setState({lastName: f.target.value})
    },
    emailEdit: function(f) {
        this.setState({email: f.target.value})
    },
    pWordEdit: function(f) {
        this.setState({password: f.target.value})
    },

    submitEdit: function(f) {
        var self= this;
        f.preventDefault();
        const data = {
            "id": this.props.employee.id,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password
        };
        if(typeof this.props.employee.id !== "undefined") data.id = this.props.employee.id;
        const jsonData = JSON.stringify(data);
        console.log(jsonData);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8080/app/add",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "31466fbf-961e-d87f-5591-08e1b963cb8b"
            },
            "processData": false,
            "data": jsonData
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    },
    render: function() {
        return (
            <div className= "container">
            <form onSubmit={this.submitEdit}>
                <div className="form-group">
                    <label htmlFor="fNameInput">First Name:</label>
                    <input type="text" className="editform-control" placeholder="Edit First Name" onChange={this.fNameEdit} value={this.state.firstName} defaultValue={this.props.employee.firstName} />
                </div>
                <div className="form-group">
                    <label htmlFor="lNameInput">Last Name:</label>
                    <input type="text" className="editform-control" placeholder="Edit Last Name" onChange={this.lNameEdit} value={this.state.lastName} defaultValue={this.props.employee.lastName} />
                </div>

                <div className="form-group">
                    <label htmlFor="inputEmail">Email address:</label>
                    <input type="email" className="editform-control" aria-describedby="emailHelp" placeholder="Edit Enter email" onChange={this.emailEdit} value={this.state.email} defaultValue={this.props.employee.email}/>
                </div>

                <div className="form-group">
                    <label htmlFor="inputPassword">Password:</label>
                    <input type="password" className="editform-control" placeholder="Edit Password" onChange={this.pWordEdit} value={this.state.password} defaultValue={this.props.employee.password}/>
                </div>
                <div>
                <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
            </form>
            </div>

        )
        }
        });


var EmployeeTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.employees.forEach(function(employee) {
            rows.push(<Employee employee={employee} />);
        });
        return (

            <div className="container">
            <Navbar />
            <table className="table table-striped">
            <thead>
            <tr>
            <th>First Name</th>
        <th>Last Name</th>
        <th>E-mail</th>
        <th>Password</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
        </table>
        </div>
    )}
});

var DatabaseAccounts = React.createClass({

    loadEmployeesFromServer: function () {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/app/all"
        }).then(function (data) {
            self.setState({employees: data});
        });
    },

    getInitialState: function () {
        return {employees: []};
    },

    componentDidMount: function () {
        this.loadEmployeesFromServer();
    },
    componentWillMount: function () {
        this.loadEmployeesFromServer();
    },
    statics:{
        update: function() {
            self.loadEmployeesFromServer();
            this.render();
        }
    },

    render() {
        return ( <EmployeeTable employees={this.state.employees}/> );
    }
});

var DashBoard = React.createClass({
    render: function(){
        return (
            <div id = "dashboard" className="jumbotron">
            <Navbar />
            <h1 className="display-4">Hello, User!</h1>
        <p className="lead">Welcome to the dashboard of QA's user control app!</p>
        <h1 className="my-4">
            <p>Please select a tab from "Accounts" to perform the action you wish.</p>
        </h1>
        </div>
    )

    }
});
var AddAccountForm = React.createClass({
    getInitialState: function() {
        return {typed: ''};
    },
    fNameChange: function(e) {
       this.setState({ firstName: e.target.value})
    },
    lNameChange: function(e) {
        this.setState({lastName: e.target.value})
    },
    emailChange: function(e) {
        this.setState({email: e.target.value})
    },
    pWordChange: function(e) {
        this.setState({password: e.target.value})
    },
    onSubmit: function(e){
        e.preventDefault();

        const data = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password
        };
        e.target.reset();
        const jsonData = JSON.stringify(data);
        console.log(jsonData);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8080/app/add",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "4628a28a-dd9a-578b-1c17-6f236d673c92"
            },
            "processData": false,
            "data": jsonData
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    },
    render: function(){
        return(
            <form onSubmit={this.onSubmit}>
    <Navbar />
        <div className="form-group">
            <label htmlFor="fNameInput">First Name:</label>
        <input type="text" className="form-control" id="fNameInput" placeholder="First Name" onChange={this.fNameChange}></input>
        </div>
        <div className="form-group">
            <label htmlFor="lNameInput">Last Name:</label>
        <input type="text" className="form-control" id="lNameInput" placeholder="Last Name" onChange={this.lNameChange}></input>
        </div>

        <div className="form-group">
            <label htmlFor="inputEmail">Email address:</label>
        <input type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.emailChange}></input>
        </div>

        <div className="form-group">
            <label htmlFor="inputPassword">Password:</label>
        <input type="password" className="form-control" id="inputPassword1" placeholder="Password" onChange={this.pWordChange}></input>
        </div>

        <button type="submit" class
                Name="btn btn-primary">Add Account</button>
        </form>

    )
    }
});

function handleClick(e){
    e.preventDefault();
    ReactDOM.render(
    <DatabaseAccounts />, document.getElementById('accounts')
)
}
function dashboardClick(f){
    f.preventDefault();
    ReactDOM.render(
    <DashBoard />, document.getElementById('accounts')
)
}
function addAccountClick(g){
    g.preventDefault();
    ReactDOM.render(
    <AddAccountForm />, document.getElementById('accounts')
)
}

ReactDOM.render(
<DashBoard />, document.getElementById('accounts')
);