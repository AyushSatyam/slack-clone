import React, { Component } from "react";
import { Button, Divider, Menu, Sidebar } from "semantic-ui-react";

export default class ColorPanel extends Component {
  render() {
    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
      >
        <Divider />
        <Button icon="add" size="small" color="blue" />
      </Sidebar>
    );
  }
}
