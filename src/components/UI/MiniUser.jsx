import { useState } from "react";
import { getRandomUserPhoto } from "../../services/util.service";

export function MiniUser({ user, type = 'user', isReview = false }) {


  const { fullname, isSuperhost, [isReview ? 'imgUrl' : 'pictureUrl']: img } = user
  // console.log("🚀 ~ MiniUser ~ img:", img)

  const [userImg, setUserImg] = useState(img) 
  const tempImg = getRandomUserPhoto()
  const superhostTag = '../img/general-icons/superhost-tag.svg'


  function handleImgError({ src }) {
    console.log('error in src: ', src);
    setUserImg(tempImg)
  }

  return (
    <div className="mini-user">
      <div className="mini-user-img">
        <img
          className="user-img"
          onError={(ev) => handleImgError(ev.target)}

          src={`${(userImg === tempImg) ? getRandomUserPhoto() : userImg}`}
          alt="user"
        />
        {isSuperhost && <span className="super-host-tag"><img src={superhostTag} alt="" /></span>}
      </div>

      {(type === 'host') ?
        <div className="host-card">

          <h4>Hosted by {`${fullname}`}</h4>
          {isSuperhost ? 
          <span className="sub-text">{isSuperhost && <span>Superhost</span>}</span>:
          <span className="sub-text">Experienced host</span>
          }
        </div>
        :
        <div className="user-card">
          <h4>{fullname}</h4>
          <span className="sub-text">{user.location ? user.location : 'no-location-info'}</span>
        </div>
      }
    </div>
  )
}



