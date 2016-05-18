// require("bootstrap.min.css");
var React = require('react')
var ReactDOM = require('react-dom')
var Cookies = require('js-cookie')



var TasksList = React.createClass({
    loadTasksFromServer: function(){
        // var csrftoken = Cookies.get('csrftoken')
        $.ajaxSetup({
       headers: { "X-CSRFToken": 'NAubuXi9bXzIgC9HttEsHQ36IHGVnXtW' }
   });
        $.ajax({

            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data.results});
            }.bind(this)
        })
    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadTasksFromServer();
        // setInterval(this.loadTasksFromServer,
        //             this.props.pollInterval)
    },
    render: function() {
        if (this.state.data) {
            console.log('DATA!')
            var taskNodes = this.state.data.map(function(task){
                return <li class="list-group-item">{task.status} > {task.priority} > {task.title}: {task.description} </li>
            })
        }
        return (
            <div>
                <h1>Hello Iron Yard!</h1>
                <ul class="list-group">
                    {taskNodes}
                </ul>
            </div>
        )
    }
})

var TasksApp = React.createClass({
    getInitialState: function() {
        return {title: '', description: '', status: '', priority: ''};
    },
    handleTitleChange: function(e){
        this.setState({title: e.target.value});
    },
    handleDescriptionChange: function (e){
        this.setState({description: e.target.value})
    },
    handleStatusChange: function (e){
        this.setState({status: e.target.value})
    },
    handlePriorityChange: function (e){
        this.setState({priority: e.target.value})
    },
    handleSubmit: function(e) {
        e.preventDefault();
        console.log(this.state)
        console.log(this.props)
        // var csrftoken = Cookies.get('csrftoken')
        $.ajaxSetup({
       headers: { "X-CSRFToken": 'NAubuXi9bXzIgC9HttEsHQ36IHGVnXtW' }
   });
        $.ajax({
            url: this.props.url,
            datatype: 'json',
            method: 'POST',
            data: {status: this.state.status,
                    description: this.state.description,
                    title: this.state.title,
                    priority: this.state.priority},

            success: ReactDOM.render(<TasksApp url='/api/tasks/'  />,
                document.getElementById('container'))
    })},
    render: function() {
      return (
        <div>
          <h3>Kanban</h3>
          <TasksList url='/api/tasks/' />
          <form onSubmit={this.handleSubmit}>
            <p><input onChange={this.handleTitleChange} value={this.state.title}
            type="text" placeholder="Title"/></p>
            <p><textarea onChange={this.handleDescriptionChange} value={this.state.description}
             placeholder="Description"/></p>
            <p><select value='Back Burner' onChange={this.handleStatusChange}
            placeholder="Status">
                <option value="Back Burner">Back Burner</option>
                <option value="On Deck">On Deck</option>
                <option value="In Process">In Process</option>
                <option value="Complete">Complete</option></select></p>
            <p><select value="Glacial" onChange={this.handlePriorityChange}
            placeholder="Priority">
                <option value="Glacial">Glacial</option>
                <option value="Sloth">Sloth</option>
                <option value="Snail">Snail</option>
                <option value="Rabbit">Rabbit</option>
                <option value="The Flash">The Flash</option></select></p>
            <button>{'Add Task'}</button>
          </form>
        </div>
      );
    }
})

ReactDOM.render(<TasksApp url='/api/tasks/'  />,
    document.getElementById('container'))
// pollInterval={5000}
