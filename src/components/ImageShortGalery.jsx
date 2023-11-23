
export function ImageShortGalery({imgUrls}) {
    // get images from store
    // const imgUrls
  return (
    <div className="Image-galery-small">
      {imgUrls.map((url,id)=> 
      // id===0 ? 
      // <img className="first-image-in-galery" key={id} src={url} alt=""/>
      // : 
      <img key={id} src={url} alt=""/>
      
      )}
    </div>
  )
}
