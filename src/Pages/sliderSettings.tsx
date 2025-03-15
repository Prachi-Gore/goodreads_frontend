  // slick slider setting
 export const sliderSettings =(data:any[])=>{
  return  {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow:data?.length>=4?4:data?.length,
    slidesToScroll: data?.length>=4?4:data?.length,
    rows: 1,
    // className: "center",
    // centerPadding: "10px",
    // adaptiveHeight: true,
      // centerMode: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          // dots: true,
          initialSlide: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          // dots: true,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  }
 }