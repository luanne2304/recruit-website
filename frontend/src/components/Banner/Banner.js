import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import Banner1 from '../../assets/images/Banner1.jpg'
import Banner2 from '../../assets/images/Banner3.jpg'



const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [
    Banner1, // Thay thế '/path/to/your/image1.jpg' bằng đường dẫn thực tế
    Banner2,
  ];

  return (
    <Box sx={{ maxWidth: 1340, mx: "auto" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Dùng để đảm bảo ảnh không bị méo khi thay đổi kích thước
            }}
            src={image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </Slider>
    </Box>
  );
};
export default Banner;
