import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CardVideo from "../../components/CardVideo/CardVideo";
import CategoryList from "../../components/CategoryList/CategoryList";

function ModalLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState();

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleInputPhoto = (e) => {
    setPhoto(e.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username,
        photo: photo,
      })
    );
  };

  return (
    <>
      <Button
        variant="outline"
        color="tokopedia.green.primary"
        borderColor="tokopedia.green.primary"
        bg="tokopedia.green.second"
        borderRadius={16}
        _hover={{ bg: "none" }}
        onClick={onOpen}
      >
        Sign In
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ModalHeader></ModalHeader>
            <Stack spacing={4}>
              <form onSubmit={handleSubmit}>
                <FormControl id="email" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    onChange={handleInputUsername}
                    placeholder="username"
                  />
                </FormControl>
                <FormControl id="password" marginTop={5}>
                  <FormLabel>Photo</FormLabel>
                  <Input
                    type="text"
                    onChange={handleInputPhoto}
                    placeholder="paste link here"
                  />
                </FormControl>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  w="100%"
                  marginTop={5}
                  type="submit"
                >
                  Sign in
                </Button>
              </form>
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function UserProfile(props) {
  return (
    <Flex alignItems={"center"}>
      <Stack direction={"row"} spacing={7}>
        <Text color="white">{props.username ?? "MRaehanR"}</Text>
        <Avatar
          size={"sm"}
          src={
            props.photo ?? "https://avatars.dicebear.com/api/male/username.svg"
          }
        />
      </Stack>
    </Flex>
  );
}

function Home() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState();
  const [photo, setPhoto] = useState();

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVideos();
  };

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
      const url = search
        ? `${process.env.REACT_APP_SERVER_URL}/videos?search=${search}`
        : `${process.env.REACT_APP_SERVER_URL}/videos`;
      const response = await fetch(url);
      const data = await response.json();
      setVideos(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setPhoto(user.photo);
      setUsername(user.username);
      setIsLogin(true);
    }
  };

  useEffect(() => {
    getUserFromLocalStorage();
    fetchVideos();
  }, []);

  return (
    <Box padding={3}>
      <Box bg="transparent">
        <Flex h="100%" alignItems={"center"} justifyContent={"space-between"}>
          <form onSubmit={handleSubmit}>
            <Input
              variant="outline"
              placeholder="Search"
              color="white"
              marginBottom={2}
              marginTop={3}
              size="md"
              borderRadius={5}
              type="text"
              onChange={handleInputSearch}
              w="500px"
            />
          </form>
          {isLogin ? (
            <UserProfile username={username} photo={photo} />
          ) : (
            <ModalLogin />
          )}
        </Flex>
      </Box>
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
