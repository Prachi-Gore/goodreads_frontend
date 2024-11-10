  // slick slider setting
 export const sliderSettings =(data:any[])=>{
  return  {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow:data?.length>=3?3:data?.length,
    slidesToScroll: 3,
    rows: 1,
    // className: "center",
    // centerPadding: "10px",
    // adaptiveHeight: true,
      // centerMode: true,
    responsive: [
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