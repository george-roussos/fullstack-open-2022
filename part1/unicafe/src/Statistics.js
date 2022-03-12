import React from "react";

class Statistics extends React.Component {
  renderContent(props) {
    if (
      !this.props.good > 0 &&
      !this.props.bad > 0 &&
      !this.props.neutral > 0
    ) {
      return <div>No feedback yet</div>;
    } else if (
      this.props.good > 0 ||
      this.props.bad > 0 ||
      this.props.neutral > 0
    ) {
      return (
        <div>
          <p>good:&nbsp;{this.props.good}</p>
          <p>neutral:&nbsp;{this.props.neutral}</p>
          <p>bad:&nbsp;{this.props.bad}</p>
          <p>
            all:&nbsp;{this.props.good + this.props.bad + this.props.neutral}
          </p>
          <p>
            average:&nbsp;
            {(1 * this.props.good + -1 * this.props.bad) /
              (this.props.good + this.props.bad + this.props.neutral)}
          </p>
          <p>
            positive:&nbsp;
            {(
              this.props.good /
              (this.props.good + this.props.bad + this.props.neutral)
            )
              .toFixed(2)
              .slice(2)}
            %
          </p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Statistics</h1>
        <div>{this.renderContent()}</div>
      </div>
    );
  }
}

export default Statistics;
