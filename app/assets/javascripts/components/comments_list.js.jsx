var CommentList = React.createClass({
  getInitialState(){
    let message = JSON.parse(this.props.message);
    return {message: message};
  },

  render() {
    let comments = this.state.message.comments.map((comment) => {
      return this.renderComment(comment);
    });

    return (
        <div>{comments}</div>
    );
  },

  renderComment(comment){
    return (
        <article key={comment.id}>
          <h3>Comment by { comment.user.name } </h3>
          <p>{ comment.content }</p>
        </article>
    );
  },

  componentDidMount(){
    this.setupSubscription();
  },

  updateCommentList(comment) {
    let message = JSON.parse(comment);
    this.setState({message: message});
  },

  setupSubscription(){

    App.comments = App.cable.subscriptions.create("CommentsChannel", {
      message_id: this.state.message.id,

      connected: function () {
        setTimeout(() => this.perform('follow', {message_id: this.message_id}), 1000);
      },

      received: function (data) {
        this.updateCommentList(data.comment);
      },

      updateCommentList: this.updateCommentList

    });

  }

});
