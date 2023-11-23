export function ImageShortGalery({ imgUrls }) {
  // get images from store
  // const imgUrls
  return (
    <>
      
      <div className="Image-galery-small">
        {imgUrls.map((url, id) => (
          <img key={id} src={url} alt="" />
        ))}
        <div className="button-overlay">
          <button>view galery</button>
        </div>
      </div>
    </>
  );
}
