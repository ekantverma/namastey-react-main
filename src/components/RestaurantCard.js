import {CDN_URL} from "../utils/constants"

const RestaurantCard = (props) => {
    const {resData} = props;
    const {cloudinaryImageId, name, avgRating, sla, cuisines} = resData?.info;
    return (
      <div className='res-card' style={{ 
        backgroundColor: 'f0f0f0'
      }}>
          <img 
          className='res-logo'
          alt='res-logo' 
          src={CDN_URL + cloudinaryImageId}></img>
          <h3 className='rest-name'>{name}</h3>
          <h4 className='rest-stars'>{avgRating} Stars</h4>
          <h4 className="rest-time">{sla.slaString}</h4>
          <h4 className='cuisines'>{cuisines.join(", ")}</h4> 
        </div>
    )
  }

  export default RestaurantCard;