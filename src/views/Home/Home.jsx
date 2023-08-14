import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CardVideo from "../../components/CardVideo/CardVideo";
import CategoryList from "../../components/CategoryList/CategoryList";

function Home() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  const clickHandle = ({ id, videoUrl }) => {
    navigate("/detail", {
      state: {
        videoId: id,
        videoUrl: videoUrl,
      },
    });
  };

  const getDataFromCategoryList = (data) => {
    setVideos(data);
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/videos`
      );
      const data = await response.json();
      setVideos(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Box padding={3}>
      <Box marginTop={5}>
        <CategoryList getData={getDataFromCategoryList} />
      </Box>
      <Box>
        {videos.map((video, key) => (
          <CardVideo
            key={key}
            onlyAtLive={video.onlyAtLive}
            discountCoupon={video.discountCoupon}
            isLive={true}
            title={video.title}
            store={video.storeName}
            views={video.totalView}
            image={video.imgUrl}
            onClick={() => clickHandle(video)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Home;
