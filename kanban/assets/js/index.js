require("bootstrap.min.css");
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

var TasksAppReact.createClass({
    
})

ReactDOM.render(<TasksList url='/api/tasks' pollInterval={1000} />,
    document.getElementById('container'))
