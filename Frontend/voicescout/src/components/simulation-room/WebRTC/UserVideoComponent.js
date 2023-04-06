import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined && this.props.type === "you" ? (
          <div style={{ width: "0px" }}>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
          </div>
        ) : null}
        {this.props.streamManager !== undefined && this.props.type === "me" ? (
          <div style={{ width: "0px" }}>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
          </div>
        ) : null}
        {this.props.streamManager !== undefined &&
        this.props.type === "multi" ? (
          <div style={{ width: "auto" }}>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
          </div>
        ) : null}
      </div>
    );
  }
}
