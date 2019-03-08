import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createPost } from "../actions";

class PostsNew extends Component {
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}:</label>
        <field.type className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          type="input"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="body"
          type="textarea"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link className="btn btn-danger" to="/">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at leat 3 characters!";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(
  connect(
    null,
    { createPost }
  )(PostsNew)
);
