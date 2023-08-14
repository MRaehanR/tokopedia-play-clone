import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct/CardProduct";
import ReactPlayer from "react-player";
import CardVideo from "../../components/CardVideo/CardVideo";
import CommentMessage from "../../components/CommentMessage/CommentMessage";
import useDataFetch from "../../hooks/useDataFetch";

function VideoDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { videoId, videoUrl } = state;

  const videos = useDataFetch(`${process.env.REACT_APP_SERVER_URL}/videos`);
  const products = useDataFetch(
    `${process.env.REACT_APP_SERVER_URL}/products/${videoId}`
  );
  const comments = useDataFetch(
    `${process.env.REACT_APP_SERVER_URL}/comments/${videoId}`
  );
  const [username, setUsername] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleInputComment = (e) => {
    setCommentMessage(e.target.value);
  };

  const postComment = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/comments/${videoId}`,
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            text: commentMessage,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      comments.push(data.data);
      setCommentMessage("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex justifyContent="space-between">
      <Box h="100vh" w="400px">
        <Flex
          h="100%"
          w="100%"
          flexDirection="column"
          alignItems="center"
          overflowY="scroll"
          css={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {products.map((product, key) => (
            <CardProduct
              key={key}
              title={product.title}
              price={product.price}
              imgUrl={product.imgUrl}
              productUrl={product.productUrl}
            />
          ))}
        </Flex>
      </Box>
      <Box
        h="100vh"
        w="100%"
        overflowY="scroll"
        css={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <ReactPlayer
          url={videoUrl}
          // playing="true"
          controls={true}
          width="100%"
          height="700px"
        />
        <Box marginTop={5}>
          <Text fontSize={18} fontWeight={800} color="white" marginLeft={5}>
            Rekomendasi Video Lainnya
          </Text>
          <Flex flexWrap="wrap">
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
                onClick={() =>
                  navigate("/detail", {
                    state: {
                      videoId: video.id,
                      videoUrl: video.videoUrl,
                    },
                  })
                }
              />
            ))}
          </Flex>
        </Box>
      </Box>
      <Box h="100vh" w="400px">
        <Box
          h="80%"
          width="100%"
          overflow="hidden"
          overflowY="scroll"
          padding={3}
          css={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Flex flexDirection="column">
            {comments.map((comment, key) => (
              <CommentMessage
                key={key}
                username={comment.username}
                text={comment.text}
              />
            ))}
          </Flex>
        </Box>
        <Box h="20%" w="100%" padding={3}>
          <form onSubmit={postComment}>
            <FormControl isRequired>
              <Input
                variant="outline"
                placeholder="Username"
                color="white"
                marginBottom={2}
                marginTop={3}
                size="sm"
                borderRadius={5}
                type="text"
                value={username}
                onChange={handleInputUsername}
              />
              <Input
                variant="outline"
                placeholder="Say something"
                color="white"
                size="md"
                type="text"
                value={commentMessage}
                onChange={handleInputComment}
              />
              <Button
                size="sm"
                marginTop={3}
                color="white"
                bg="tokopedia.green.primary"
                w="100%"
                type="submit"
              >
                Kirim
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default VideoDetail;
