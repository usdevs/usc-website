import React, { Component } from 'react'
import { compose } from 'redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Dropzone from 'react-dropzone'
import { Button, Alert } from 'reactstrap';
import { getFile } from '../../actions/FilesActions'
import { firebaseConnect } from 'react-redux-firebase';

class ImageUploader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image: null,
    }
  }

  componentDidMount() {
    const { fieldState, firebase } = this.props
    this.mounted = true

    if(fieldState.value && fieldState.value !== '' && !(fieldState.value.startsWith("http://") || fieldState.value.startsWith("https://"))) {
      getFile(firebase, fieldState.value, (url) => {
        if(this.mounted) {
          this.setState({
            image: url,
          })
        }
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const { image } = this.state
    const { onDrop, onDelete, fieldState, errortext } = this.props

    const hasImage = fieldState.value ? true : false

    return (
      <div>
        <div className="d-flex justify-content-center flex-wrap">
          {
            image ?
              <img src={ image } className="img-fluid d-inline" alt="poster" style={{maxHeight: '200px'}} />
            : hasImage ?
              <img src={ fieldState.value } className="img-fluid d-inline" alt="poster" style={{maxHeight: '200px'}} />
            : ''
          }
          '    '
          <Dropzone
            accept="image/jpeg, image/png"
            multiple={false}
            onDrop={(files) => {
              this.setState({
                image: null
              })
              onDrop(files[0].preview)
            }}>
            <div className="w-100 h-100 d-flex justify-content-center">
              <span className="w-100 h-100 fa-layers fa-fw" style={{marginTop: '.7em'}}>
                <FontAwesomeIcon icon="upload" size="4x" transform="up-15"/>
                <span className="fa-layers-text w-75 lead" style={{marginTop: '1em'}}><h4 style={{fontWeight: 300}}>Click to Select, or Drag File Here (*.jpg, *.png)</h4></span>
              </span>
            </div>
          </Dropzone>
        </div>
        <div className="d-flex justify-content-center">
          { fieldState.error ? <Alert color="danger">{ errortext ? errortext : fieldState.error}</Alert> : null }
          { hasImage ? <Button outline color="danger" onClick={() => {
            this.setState({
              image: null
            })
            onDelete()
          }}>Delete Image</Button> : '' }
        </div>
      </div>)
    }
}

export default compose(
  firebaseConnect()
)(ImageUploader)
