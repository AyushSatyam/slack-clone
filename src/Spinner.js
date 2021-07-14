import React, { Component } from "react";
import { Loader, Dimmer } from "semantic-ui-react";
export default class Spinner extends Component {
  render() {
    return (
      <>
        <Dimmer active>
          <Loader size="huge" content={"Preparing Chat.."} />
        </Dimmer>
      </>
    );
  }
}
