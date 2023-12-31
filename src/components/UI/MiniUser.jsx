import { useState } from "react";

export function MiniUser({user,type='user'}) {
    const {fullname,isSuperhost,thumbnailUrl:img} = user
    // console.log("MiniUser",user);
    const [userImg,setUserImg] = useState(img)
    const tempImg = '/public/img/Icons/user-circle.svg'
    const superhostTag = '/public/img/Icons/superhost-tag.svg'

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

            <h4>hosted by {`${fullname}`}</h4>
            <span>{isSuperhost && <span><b>Superhost</b></span>} -years of experience</span>
          </div>
          :
          <>
            <h4>{fullname}</h4>
            <span>{user.location}</span>
          </>
        }
    </div>
  )
}
