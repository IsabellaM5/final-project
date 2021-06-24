import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import styled from 'styled-components/macro'

const CarouselWrapper = styled.div`
  width: 50%;
`

const ImageContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
`

const CarouselContainer = () => {
  return (
    <CarouselWrapper>
      <Carousel 
        autoPlay
        interval="4000"
        axis="horizontal" 
        showThumbs
        thumbWidth="100px"
      >
        <ImageContainer>
          <img src="/assets/carousel/carousel-img-4.jpg" alt="logo"/>
        </ImageContainer>

        <ImageContainer>
          <img src="/assets/carousel/carousel-img-1.png" alt="preview projects overview"/>
        </ImageContainer>

        <ImageContainer>
          <img src="/assets/carousel/carousel-img-2.png" alt="preview tasks overview"/>
        </ImageContainer>

        <ImageContainer>
          <img src="/assets/carousel/carousel-img-3.png" alt="preview new project"/>
        </ImageContainer>

        <ImageContainer>
          <img src="/assets/carousel/carousel-img-6.png" alt="information about creators"/>
        </ImageContainer>
      </Carousel>
    </CarouselWrapper>
  )
}

export default CarouselContainer