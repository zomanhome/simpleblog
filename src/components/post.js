import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost, deletePost, createComment } from "../actions";
import { Link } from "react-router-dom";

class Post extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPost(id);
  }
  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }
  addComment() {
    const { id } = this.props.match.params;
    this.props.createComment(
      {
        postId: id,
        body: "Test comment"
      },
      () => {
        this.props.history.push(`/posts/${id}`);
      }
    );
  }
  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back to All Posts</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <i>
          No comments here because API don't work correctly (comments in
          "/posts/xx?_embed=comments" is always empty). You can add a Test
          comment and see it's working{" "}
          <a
            href="https://simple-blog-api.crew.red/comments"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </i>
        <button
          className="btn btn-secondary pull-xs-right"
          onClick={this.addComment.bind(this)}
        >
          Add a Test comment
        </button>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  { getPost, deletePost, createComment }
)(Post);
