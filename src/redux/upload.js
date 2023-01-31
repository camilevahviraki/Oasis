import linkURL from './link';
import axios from 'axios';

const Upload = (props) => {
    
    const {
      endPoint,
      data,
      dispatchResponse,
      getProgress,
      dispatcthAuthResponse,
      method,
      token,
    } = props

    let axiosMethod;
    if(method){
      axiosMethod = method;
    }else{
      axiosMethod = axios.post;
    }
    
    axiosMethod(`${linkURL}/${endPoint}`, data,
    {
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        if(getProgress){
          getProgress(progress)
        }
      }
    }).then((response) => {
      if(response.data.store_id && dispatchResponse){
        dispatchResponse(response.data);
      }

      if(dispatcthAuthResponse && response.data.token){
        dispatcthAuthResponse(response.data);
      }

        console.log('response =>', response.data);
      }).catch((err) => {
        console.log('error =>', err);
      })
      
}

export default Upload