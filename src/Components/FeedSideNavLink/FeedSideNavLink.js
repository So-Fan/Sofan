import React from 'react'
import "./FeedSideNavLink.css"
const FeedSideNavLink = ({href, svg, alt, title, imgWidth, gap}) => {
  return (
    <a href={href} className='feed-side-navlink-container'>
      <img src={svg} alt={alt} style={{width: imgWidth}} />
      <span style={{paddingLeft: gap}}>{title}</span>
    </a>
  )
}

export default FeedSideNavLink;
