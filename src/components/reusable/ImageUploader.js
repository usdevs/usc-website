import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Dropzone from 'react-dropzone'
import { Button } from 'reactstrap';

class ImageUploader extends Component {
  static contextTypes = {
    imageSrc: PropTypes.string.isRequired,
    onDrop: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  render() {
    const { imageSrc, onDrop, onDelete } = this.props

      return (
        <div>
          <div className="d-flex justify-content-center flex-wrap">
            {
              imageSrc ?
                <img src={imageSrc} className="img-fluid d-inline" alt="poster" style={{maxHeight: '200px'}} />
              : ''
            }
            '    '
            <Dropzone
              accept="image/jpeg, image/png"
              onDrop={(files) => onDrop(files[0])}>
              <div className="w-100 h-100 d-flex justify-content-center">
                <span className="w-100 h-100 fa-layers fa-fw" style={{marginTop: '.7em'}}>
                  <FontAwesomeIcon icon="upload" size="4x" transform="up-15"/>
                  <span className="fa-layers-text w-75 lead" style={{marginTop: '1em'}}><h4 style={{fontWeight: 300}}>Click to Select, or Drag File Here (*.jpg, *.png)</h4></span>
                </span>
              </div>
            </Dropzone>
          </div>
            {
              imageSrc ?
                <div className="d-flex justify-content-center">
                  <Button outline color="danger" onClick={onDelete}>Delete Image</Button>
                </div>
              : ''
            }
        </div>
      )
    }
}

export default ImageUploader
