import { Link, useOutletContext } from "react-router-dom";
import { ImageShortGalery } from "../components/ImageShortGalery";


// for now
export const imgUrls = ["https://a0.muscache.com/im/pictures/dc89cf8d-6d45-4db8-acb0-e8331150d725.jpg?im_w=960","https://a0.muscache.com/im/pictures/3ecf9b60-50a1-4a8b-9aa5-7f7c9bd2defa.jpg?im_w=480","https://a0.muscache.com/im/pictures/e362a6b6-ef1e-43c5-9186-ac26abf2994e.jpg?im_w=480","https://a0.muscache.com/im/pictures/c566639d-6444-458e-83e1-2ec903f59e36.jpg?im_w=480"]

// 
export function StayDetails() {
  const { stayId } = useOutletContext();
  console.log(stayId);

  return (
    <>
      <Link to="/">←back</Link>
      <div className="details-header full">
        <h2>stay name {stayId}</h2>
        <div>share/save</div>
      </div>
      <ImageShortGalery imgUrls={imgUrls} />
      
    </>
  );
}
