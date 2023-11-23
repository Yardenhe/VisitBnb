import { Link, useOutletContext } from "react-router-dom";
import { ImageShortGalery } from "../components/ImageShortGalery";
import { StayDescription } from "../components/StayDescription";
import { StayCheckout } from "../components/StayCheckout";


// for now
export const imgUrls = ["https://a0.muscache.com/im/pictures/dc89cf8d-6d45-4db8-acb0-e8331150d725.jpg?im_w=960","https://a0.muscache.com/im/pictures/3ecf9b60-50a1-4a8b-9aa5-7f7c9bd2defa.jpg?im_w=480","https://a0.muscache.com/im/pictures/e362a6b6-ef1e-43c5-9186-ac26abf2994e.jpg?im_w=480","https://a0.muscache.com/im/pictures/c566639d-6444-458e-83e1-2ec903f59e36.jpg?im_w=480","https://a0.muscache.com/im/pictures/miso/Hosting-48086771/original/45f8627a-db65-426e-aab5-8018b4b40e17.jpeg?im_w=1200"]

// 
export function StayDetails() {
  // TODO: get the stay from the store
  const { stayId } = useOutletContext();
  console.log(stayId);

  return (
    <>
      <Link to="/">←back</Link>
      <div className="details-header">
        <h3>stay name {stayId}</h3>
        <div className="action-btn"><button>share</button></div>
        <div className="action-btn"><button>save</button></div>
      </div>
    
      <ImageShortGalery imgUrls={imgUrls} />
      <div className="checkout-container">
        <StayDescription/>
        <StayCheckout/>
      </div>
      
    </>
  );
}
