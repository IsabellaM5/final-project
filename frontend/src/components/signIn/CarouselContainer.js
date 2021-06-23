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

const Image = styled.img`

`


const CarouselContainer = () => {
  return (
    <CarouselWrapper>
      <Carousel 
        autoPlay
        axis="horizontal" 
        showThumbs
        thumbWidth="100px"
      >
        <ImageContainer>
          <Image src="/assets/landing-page-placeholder-image.jpg" />
        </ImageContainer>

        <ImageContainer>
          <Image src="/assets/landing-page-placeholder-image.jpg" />
        </ImageContainer>

        <ImageContainer>
          <Image src="/assets/landing-page-placeholder-image.jpg" />
        </ImageContainer>

        <ImageContainer>
          <Image src="/assets/landing-page-placeholder-image.jpg" />
        </ImageContainer>

        <ImageContainer>
          <Image src="/assets/landing-page-placeholder-image.jpg" />
        </ImageContainer>
      </Carousel>
    </CarouselWrapper>
  )
}

export default CarouselContainer