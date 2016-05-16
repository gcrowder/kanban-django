// require("bootstrap.min.css");
var React = require('react')
var ReactDOM = require('react-dom')

var TasksList = React.createClass({
    loadTasksFromServer: function(){
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
        setInterval(this.loadTasksFromServer,
                    this.props.pollInterval)
    },
    render: function() {
        if (this.state.data) {
            console.log('DATA!')
            var taskNodes = this.state.data.map(function(task){
                return <li class="list-group-item"> {task.title}: {task.description} </li>
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
        return {data: []};
    },
    onChange: function(e) {

      this.setState({data: {title: e.target.title,
              description: e.target.description,
              status: e.target.status,
              priority: e.target.priority}});
    }.bind(this),
    handleSubmit: function(e) {
        e.preventDefault();
        $.ajax({
            url: this.props.url,
            datatype: 'json',
            method: 'POST',
            data: this.state.data,
        })
    },
    render: function() {
      return (
        <div>
          <h3>Kanban</h3>
          <TasksList />
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.onChange} value={this.state.title} />
            <button>{'Add #' + (this.state.data.length + 1)}</button>
          </form>
        </div>
      );
    }
})

ReactDOM.render(<TasksApp url='/api/tasks' pollInterval={1000} />,
    document.getElementById('container'))
