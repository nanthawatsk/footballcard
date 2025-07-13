import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '700px'
}
const slideImages = [
  {
    url: 'https://gogts.net/wp-content/uploads/2023/03/2022-23-Panini-Prizm-Premier-League-Soccer-Cards-Featured.jpg',
  },
  {
    url: 'https://beckett-www.s3.amazonaws.com/news/news-content/uploads/2023/03/2022-23-Panini-Select-Premier-League-Feature.jpg',
  },
  {
    url: 'https://gogts.net/wp-content/uploads/2022/10/2022-Panini-Prizm-FIFA-World-Cup-Qatar-Soccer-Cards-Featured.jpg',
  },
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default Slideshow;