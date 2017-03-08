var React = require('react');

require('react-foundation');

/*class Correo extends Component{
	construct(props){
	this.name = props.name;
	this.handleChange = this.handleChange.bind(this);
	 this.thisPrincipal = props.AppThat;

	}
}*/

var Email = React.createClass({
  render: function() {
    return (
      <div className="email">
        <dl className="meta dl-horizontal">
          <dt>From</dt>
          <dd>{this.props.from}</dd>

          <dt>To</dt>
          <dd>{this.props.to}</dd>

          <dt>Subject</dt>
          <dd>{this.props.subject}</dd>
        </dl>
        <div className="emailBody">
        	{this.props.body}
        </div>
      </div>
    );
  }
});


var EmailListItem = React.createClass({
  render: function() {
    return (
      <tr onClick={this.props.on_click.bind(null)}>
        <td>{this.props.subject}</td>
        <td>{this.props.from}</td>
        <td>{this.props.to}</td>
      </tr>
    );
  }
});

var EmailList = React.createClass({
  render: function() {
    var email_list = this.props.emails.map(function(mail) {
      return (
        <EmailListItem key={mail.id}
                       from={mail.from}
                       to={mail.to}
                       subject={mail.subject}
                       on_click={this.props.onSelectEmail.bind(null, mail.id)} />
      );
    }.bind(this));

    return (
      <table className="email-list table table-striped table-condensed">
        <thead>
          <tr>
            <th>Subject</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {email_list}
        </tbody>
      </table>
    );
  }
});

var NoneSelected = React.createClass({
  render: function() {
    return (
      <div className="none-selected alert alert-warning" role="alert">
        <span>No {this.props.text} selected.</span>
      </div>
    );
  }
});

var Correo = React.createClass({
  getInitialState: function(){
    return { email_id: null };
  },

  handleSelectEmail: function(id) {
    this.setState({ email_id: id });
  },

  render: function() {
    var email_id = this.state.email_id;
    var selected_email;
    if (email_id) {
      var mail = this.props.emails.filter(function(mail) {
        return mail.id == email_id;
      })[0];
      selected_email = <Email id={mail.id}
                              from={mail.from}
                              to={mail.subject}
                              body={mail.body} />;
    } else {
      selected_email = <NoneSelected text="email" />;
    }

    return (
      <div className="inbox">
        <EmailList emails={this.props.emails}
                     onSelectEmail={this.handleSelectEmail} />
        <div className="email-viewer">
        	{selected_email}
        </div>
      </div>
    );
  }
});

var exampleEmails = [
  
      {
        id: 1,
        from: "albamontero@ucm.es",
        to: "juanmontiel@ucm.es",
        subject: "Primer email Mutokamwoyo",
        body: "Este el el primer email de la aplicacion"
      },

      {
        id: 2,
        from: "albamontero@ucm.es",
        to: "juanmontiel@ucm.es",
        subject: "Segundo mail",
        body: "Este es el segundo"
      },

      {
        id: 3,
        from: "sergiosemedi@ucm.es",
        to: "juanmontiel@ucm.es",
        subject: "reunion TFG",
        body: "Oye que el jueves hay reuinon"
      }
];

module.export = Correo;