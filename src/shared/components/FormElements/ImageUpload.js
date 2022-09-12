import React, { useRef, useState, useEffect} from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRed = useRef();

  useEffect(()=>{
    if(!file){
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
    setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  },[file]);

  let pickedFile;
  let fileIsValid = isValid;

  const pickedHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRed.current.click();
  };

  return (
    <div className='form-control'>
      <input
        type='file'
        id={props.id}
        ref={filePickerRed}
        style={{ display: 'none' }}
        accept='.jpg, .png, .jpeg'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt='Preview' />}
          {!previewUrl && <p>Please pick an Image!</p>}
        </div>
        <Button type='button' onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
