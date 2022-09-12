import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hooks';


const UserPlaces = (props) => {
    const {isLoading, error, sendResquest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();
    const userId = useParams().userId;

    useEffect(()=>{
       const fetchPlaces = async() => {
       try{
        const responseData = await sendResquest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
        
       }catch(err){}
       };

       fetchPlaces();
    }, [sendResquest, userId]);

    const placeDeleteHandler = (deletedPlaceId) =>{
        setLoadedPlaces(prevPlace => prevPlace.filter(place => place.id !== deletedPlaceId));
    };
    return (
       
      <>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && <div className='center'>
        <LoadingSpinner asOverlay/>
        </div>}
       {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler}/>}
      </>
    );
};

export default UserPlaces;