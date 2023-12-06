
export default function MiniUser({user,type='user'}) {
    const {fullname,isSuperhost,thumbnailUrl:img} = user
    console.log("user",user);
    const tempImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-2d9_t-RCT8ScVQ7MJAtZRcZdcmwPGMzEGmj-kOL0KBikwQgQQeN6cSyr3hOZu9aiooc&usqp=CAU'
    
  
  return (
    <div className="mini-user">
        <div className="mini-user-img">

            <img
              className="user-img"
              src={`${img ? img : tempImg}`}
              alt="user"
              />
            {isSuperhost && <span className="super-host-tag">Superhost tag</span>}
        </div>

        {(type==='host')?
          <>
            <h4>hosted by {`${fullname}`}</h4>
            <span>{isSuperhost && <span><b>Superhost</b></span>} -years of experience</span>
          </>
          :
          <>
            <h4>{fullname}</h4>
            <span>{user.location}</span>
          </>
        }
    </div>
  )
}
