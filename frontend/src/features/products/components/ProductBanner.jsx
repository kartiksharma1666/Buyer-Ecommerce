import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Box, MobileStepper } from '@mui/material';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import banner images (fallback images if none provided)
import { banner1, banner2, banner3, banner4 } from '../../../assets';

const fallbackImages = [banner1, banner2, banner3, banner4];

const ProductBanner = ({ product }) => {
  const images = product?.images?.length ? product.images : fallbackImages;
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        onSlideChange={(swiper) => handleStepChange(swiper.activeIndex)}
        loop={true}
        style={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              {Math.abs(activeStep - index) <= 2 && (
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                  src={image}
                  alt={`Banner Image ${index + 1}`}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{ alignSelf: 'center', marginTop: '10px' }}>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            backgroundColor: 'transparent',
          }}
        />
      </div>
    </div>
  );
};

export default ProductBanner;
