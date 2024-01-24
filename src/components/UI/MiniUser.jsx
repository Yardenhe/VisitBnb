import { useState } from "react";

export function MiniUser({user,type='user' ,isReview = false}) {
  // console.log("🚀 ~ MiniUser ~ user:", user)
  
  
    const {fullname,isSuperhost,[isReview ? 'thumbnailUrl' : 'imgUrl']:img} = user
 

    // console.log("MiniUser",user);
    const [userImg,setUserImg] = useState(img)
    const tempImg = '/public/img/general-icons/user-circle.svg'
    const superhostTag = '/public/img/general-icons/superhost-tag.svg'

    function handleImgError({src}){
      console.log('error in src: ', src);
      setUserImg(tempImg)
    }
  
  return (
    <div className="mini-user">
        <div className="mini-user-img">
            <img
              className="user-img"
              onError={(ev)=>handleImgError(ev.target)}
              src={`${userImg}`}
              alt="user"
              />
            {isSuperhost && <span className="super-host-tag"><img src={superhostTag} alt="" /></span>}
        </div>

        {(type==='host')?
          <div className="host-card">

            <h4>Hosted by {`${fullname}`}</h4>
            <span className="sub-text">{isSuperhost && <span><b>Superhost</b></span>} -years of experience</span>
          </div>
          :
          <div className="user-card">
            <h4>{fullname}</h4>
            <span className="sub-text">{user.location ?user.location: 'no-location-info'  }</span>
          </div>
        }
    </div>
  )
}
