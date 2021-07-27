import React, { Component } from "react";
import { Button, Icon, Input, Modal } from "semantic-ui-react";
import mime from "mime-types";
export default class FileModal extends Component {
  state = {
    file: null,
    autherized: ["image/jpg", "image/png", "image/jpeg"],
  };

  addFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({
        file,
      });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;
    if (file !== null) {
      if (this.isAutherized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      }
    }
  };

  clearFile = () =>
    this.setState({
      file: null,
    });

  isAutherized = (filename) =>
    this.state.autherized.includes(mime.lookup(filename));

  render() {
    const { modal, closeModal } = this.props;
    return (
      <>
        <Modal basic open={modal} onClose={closeModal}>
          <Modal.Header>Select an image file</Modal.Header>
          <Modal.Content>
            <Input
              fluid
              label="File types: jpg, png"
              name="file"
              type="file"
              onChange={this.addFile}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.sendFile} color="green" inverted>
              <Icon name="checkmark" />
              Send
            </Button>

            <Button color="red" inverted onClick={closeModal}>
              <Icon name="remove" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}
