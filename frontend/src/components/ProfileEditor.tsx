import React, { createRef, useState, ChangeEvent } from 'react';
import defaultUserPic from '../images/default-profile-pic.jpg';
import Tooltip from './Tooltip';

interface ProfileEditorProps {
  imageUpload(event: ChangeEvent<HTMLInputElement>): void;
  handleSubmit(): void;
  setShowProfileEditor: (value: boolean) => void; // Add the 'setShowProfileEditor' prop
  image: File | null;
  userSelectedImage: string; // Add the 'userSelectedImage' prop
}

export function ProfileEditor(props: ProfileEditorProps) {
  // Edit Profile states
  const [image, _setImage] = useState<string | null>(null);
  const inputFileRef = createRef<HTMLInputElement>();

  // Cleanup function
  const cleanup = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  const setImage = (newImage: string | null) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target.files && event.target.files[0];
    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
    props.imageUpload(event);
  };

  const handleCameraClick = () => {
    // Trigger the hidden input element to select a file
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  // handle text input changes

  const handleSubmit = () => {

  }

  return (
    <div className="profile-editor">
      <div className="display-f align-center pt-1 pb-3">
        <svg
          onClick={() => props.setShowProfileEditor(false)}
          style={{ cursor: 'pointer' }}
          width="15"
          height="15"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 8.07L8.072 1M1 1L8.072 8.07"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <h4>Change Profile Picture</h4>
        <button className="save-btn" onClick={props.handleSubmit}>Save</button>
      </div>
      <div className="upload-btn-wrapper">
        <div className="user-avatar">
          <button className="btn-upload-img" onClick={handleCameraClick}>
            <svg className='camera-icon'
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 17H3C2.46957 17 1.96086 16.7893 1.58579 16.4142C1.21071 16.0391 1 15.5304 1 15V6C1 5.46957 1.21071 4.96086 1.58579 4.58579C1.96086 4.21071 2.46957 4 3 4H4C4.53043 4 5.03914 3.78929 5.41421 3.41421C5.78929 3.03914 6 2.53043 6 2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H13C13.2652 1 13.5196 1.10536 13.7071 1.29289C13.8946 1.48043 14 1.73478 14 2C14 2.53043 14.2107 3.03914 14.5858 3.41421C14.9609 3.78929 15.4696 4 16 4H17C17.5304 4 18.0391 4.21071 18.4142 4.58579C18.7893 4.96086 19 5.46957 19 6V9.5M14 16H20M17 13V19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 10C7 10.7956 7.31607 11.5587 7.87868 12.1213C8.44129 12.6839 9.20435 13 10 13C10.7956 13 11.5587 12.6839 12.1213 12.1213C12.6839 11.5587 13 10.7956 13 10C13 9.20435 12.6839 8.44129 12.1213 7.87868C11.5587 7.31607 10.7956 7 10 7C9.20435 7 8.44129 7.31607 7.87868 7.87868C7.31607 8.44129 7 9.20435 7 10Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <img src={image || props.userSelectedImage || defaultUserPic} alt="user-profile-picture" />

        </div>
        <input
          type="file"
          ref={inputFileRef}
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div>      <label htmlFor="username">Username</label>
          <input type='text' name='username'></input>
        </div>


        <div className='pbl-2'>      <label htmlFor="favourite-food">Favourite food</label>
          <input type='text' name='favourite-food'></input></div>


        <div>      <label htmlFor="favourite-Cuisine">Favourite Cuisine</label>
          <input type='text' name='favourite-Cuisine'></input></div>


      </form>
    </div>
  );
}

export default ProfileEditor;
