import { Button } from "../UI/Button";
import { TbGridDots as Dots } from "react-icons/tb";

export function ImageShortGalery({ imgUrls }) {
  // get images from store
  // const imgUrls
  return (
    <>
      <section className="Image-galery-small">
        {imgUrls.map((url, id) => (
          <img key={id} src={url} alt="" />
        ))}
        <div className="button-overlay">
          <Button icon={<Dots />} text={"Show all photos"} className="galery-btn" />
        </div>
      </section>
    </>
  );
}
