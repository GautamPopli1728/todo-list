import React from 'react';
import '../Component/main.css'
import ReactTable from 'react-table'
import 'react-table/react-table.css'



class App extends React.Component {

    state = {
        isOpen: false,
        arr: [],
        isEditMode: false,
        data: {
            firstname: '',
            lastname: '',
            email: '',
            id: '',
        }
    }

    componentWillMount() {
        localStorage.data = JSON.stringify([])
    }


    inputChangeHandler = (event) => {
        let data = { ...this.state.data }
        data[event.target.id] = event.target.value
        this.setState({ data })
    }

    onSaveHandler = () => {
        let locStrdata = JSON.parse(localStorage.data)
        let arr = JSON.parse(JSON.stringify(this.state.arr))
        if (!this.state.isEditMode) {
            this.setState({ isEditMode: false })
            locStrdata.push(this.state.data)
            arr = locStrdata
        }
        else {
            console.log("editmode");
            arr.splice(this.state.indexToBeEdited, 1, this.state.data)
        }

        localStorage.data = (JSON.stringify(arr))
        this.setState({
            arr,
            isOpen: false,
            isEditMode: false,
            indexToBeEdited: null,
            data: {
                firstname: '',
                lastname: '',
                email: '',
                id: '',
            }
        })
    }

    closeModal = () => {
        this.setState({
            isOpen: false,
            isEditMode: false,
            data: {
                id: '',
                firstname: '',
                lastname: '',
                email: '',
            }
        })
    }

    onDeleteHandler = (id) => {
        let data = this.state.arr.filter(item => item.id !== id);
        this.setState({ arr: data })
        localStorage.data = (JSON.stringify(data))
    }

    onEditHandler = (event, index) => {
        let indexToBeEdited = this.state.arr.findIndex(item => item.id === index);
        let data = this.state.arr[indexToBeEdited]
        this.setState({ data, isOpen: true, isEditMode: true, indexToBeEdited })
    }

    render() {
        const columns = [{
            Header: "User ID",
            accessor: "id",
            style: {
                textAlign: "center"
            }
        },
        {
            Header: "First Name",
            accessor: "firstname",
            sortable: false,
            style: {
                textAlign: "center"
            }
        },
        {
            Header: "Last Name",
            accessor: "lastname",
            sortable: false,
            filterable: false,
            style: {
                textAlign: "center"
            }
        },
        {
            Header: "Email",
            accessor: "email",
            sortable: false,
            filterable: false,
            style: {
                textAlign: "center"
            }
        },
        {
            Header: "Action",
            sortable: false,
            filterable: false,
            Cell: props => {
                return (
                    <React.Fragment>
                        <button onClick={() => {
                            this.onDeleteHandler(props.original.id)
                        }} >Delete</button>&nbsp;&nbsp;

                        <button onClick={(event) => this.onEditHandler(event, props.original.id)} >Edit</button>
                    </React.Fragment>
                )
            },
            style: {
                textAlign: "center"
            }
        }
        ]

        return (
            <React.Fragment>
                <div>
                    <h1 className="heading">Todo List</h1>
                </div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={() => this.setState({ isOpen: true })}>Click</button>
                    {this.state.isOpen &&
                        <div id="myModal" className="modal">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <span className="close" onClick={this.closeModal}>&times;</span>
                                    <h2 className="user-form">{this.state.isEditMode ? "Edit User" : "Add User"}</h2>

                                </div><br /><br />
                                <div className="modal-body">

                                    <form onSubmit={this.onSaveHandler}>
                                        <input className="form-control" type="number" placeholder="Id" onChange={this.inputChangeHandler} value={this.state.data.id} id="id" required /> <br />

                                        <input className="form-control" type="text" placeholder="Firstname" onChange={this.inputChangeHandler} value={this.state.data.firstname} id="firstname" required /> <br />

                                        <input className="form-control" type="text" placeholder="Lastname" onChange={this.inputChangeHandler} value={this.state.data.lastname} id="lastname" required /> <br />

                                        <input className="form-control" type="email" placeholder="Email" onChange={this.inputChangeHandler} value={this.state.data.email} id="email" required /> <br />

                                        <div className="modal-footer">
                                            <button className="btn btn-primary" >Save changes</button>
                                        </div>
                                    </form>     
                                </div>
                            </div>

                        </div>
                    }

                    <ReactTable
                        className="react-table"
                        data={this.state.arr}
                        columns={columns}
                        filterable
                        defaultPageSize={5}
                    />



                </div>
            </React.Fragment>
        )
    }
}

export default App