import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import UserPanel from "./UserPanel";
export default class SidePanel extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2 rem" }}
      >
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser}/>
        <DirectMessages currentUser={currentUser}/>
      </Menu>
    );
  }
}
