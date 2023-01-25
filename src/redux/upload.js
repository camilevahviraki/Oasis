import linkURL from './link';
import axios from 'axios';

const Upload = (props) => {

    const {
      endPoint,
      data,
      dispatchResponse,
      getProgress
    } = props

    axios.post(`${linkURL}/${endPoint}`, data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        if(getProgress){
          getProgress(progress)
        }
      }
    }).then((response) => {
      if(response.data.store_id){
        dispatchResponse(response.data);
      }
      });
      
}

export default Upload