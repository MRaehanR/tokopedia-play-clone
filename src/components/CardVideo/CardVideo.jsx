import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { IconEye, IconDiscount2 } from "@tabler/icons-react";
import React from "react";

function CardVideo() {
  return (
    <>
      <Box
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mona_Lisa-restored.jpg/1200px-Mona_Lisa-restored.jpg"
        backgroundSize="cover"
        w="260px"
        h="450px"
        p={2}
        color="white"
        borderRadius={8}
      >
        <Flex h="100%" justifyContent="space-between" flexDirection="column">
          <Box w="100%" h="25px">
            <Flex>
              <Badge variant="solid" bg="tokopedia.red" marginRight="5px">
                live
              </Badge>
              <Box
                bg="grey"
                color="white"
                backgroundColor="blackAlpha.500"
                fontSize={12}
                borderRadius={3}
                paddingRight={1}
                paddingLeft={1}
              >
                <Flex>
                  <Box fontSize={12}>
                    <IconEye size={18} />
                  </Box>
                  <Text fontSize="xs">102</Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Box w="100%" h="100px">
            <Flex alignItems="start" flexDirection="column" h="45px">
              <Badge
                variant="solid"
                bg="tokopedia.red"
                fontSize="10px"
                paddingTop={0.5}
                paddingBottom={1}
              >
                <Text fontSize="9" casing="none">
                  Hanya saat LIVE
                </Text>
              </Badge>
              <Badge
                variant="solid"
                bg="tokopedia.green"
                fontSize="10px"
                paddingTop={0.5}
                paddingBottom={0.5}
              >
                <Flex>
                  <Box fontSize={12}>
                    <IconDiscount2 size={18} />
                  </Box>
                  <Text
                    fontSize="11"
                    marginLeft={1}
                    casing="none"
                    fontWeight={900}
                  >
                    Kupon Spesial
                  </Text>
                </Flex>
              </Badge>
            </Flex>
            <Text
              fontFamily="Open Sans"
              fontWeight={600}
              fontSize={15}
              marginTop={1}
            >
              Celana Kerja Wanita
            </Text>
            <Text
              fontFamily="Open Sans"
              fontWeight={600}
              fontSize={12}
              marginTop={0.5}
            >
              ely thrift shop
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default CardVideo;
