import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceItem.css';

const PlaceItem = (props) => {
  const authCtx = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendResquest, clearError } = useHttpClient();

  const openAndCloseMapHandler = () => {
    setShowMap((prevStae) => {
      return !prevStae;
    });
  };

  const showAndCloseDeleteWarningHandler = () => {
    setShowConfirmModal((prevState) => {
      return !prevState;
    });
  };

  const confirmDeleteHandler = async () => {
  
    setShowConfirmModal(false);
    try {
      
      await sendResquest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        'DELETE',
        null,
        {
          'Authorization' : 'Bearer ' + authCtx.token
        }
      );
 
      props.onDelete(props.id);
     
    } catch (err) {}
  };

  return (
    <>
    <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={openAndCloseMapHandler}
        header={props.address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={openAndCloseMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={showAndCloseDeleteWarningHandler}
        header='Are you sure?'
        footerClass='place-item__modal-actions'
        footer={
          <>
            <Button inverse onClick={showAndCloseDeleteWarningHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>Do you really want to delete this place?</p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          {isLoading && <LoadingSpinner asOverlay/>}
          <div className='place-item__image'>
            <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openAndCloseMapHandler}>
              VIEW ON MAP
            </Button>
            {authCtx.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {authCtx.userId === props.creatorId && (
              <Button danger onClick={showAndCloseDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
