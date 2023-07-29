'use client';
/*eslint-disable*/

import MessageBoxChat from '@/components/MessageBox';
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdAutoAwesome, MdBolt, MdEdit, MdPerson } from 'react-icons/md';
import AutoScroll from '@brianmcallister/react-auto-scroll';

export default function Chat(props: { apiKeyApp: string }) {
  // *** If you use .env.local variable for your API key, method which we recommend, use the apiKey variable commented below
  const { apiKeyApp } = props;
  // Input States
  const [inputOnSubmit, setInputOnSubmit] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  // Response message
  const [outputCode, setOutputCode] = useState<string>('');
  const [messages, setMessages] = useState<[{ input: string; output: string }]>(
    [{ input: '', output: '' }],
  );
  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // API Key
  // const [apiKey, setApiKey] = useState<string>(apiKeyApp);
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const inputColor = useColorModeValue('navy.700', 'white');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgIcon = useColorModeValue(
    'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
    'whiteAlpha.200',
  );
  const brandColor = useColorModeValue('brand.500', 'white');
  const buttonBg = useColorModeValue('white', 'whiteAlpha.100');
  const gray = useColorModeValue('gray.500', 'white');
  const buttonShadow = useColorModeValue(
    '14px 27px 45px rgba(112, 144, 176, 0.2)',
    'none',
  );
  const textColor = useColorModeValue('navy.700', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' },
  );
  const handleTranslate = async () => {
    const inputElement = document.getElementById('input_element');
    if (inputElement) {
      inputElement.nodeValue = '';
    }

    handleMessages();
    setInputOnSubmit(inputCode);
    setInputCode('');
    const input = inputCode;
    if (!input) {
      alert('Please enter your message.');
      return;
    }

    setOutputCode(' ');
    setLoading(true);

    const inputs = {
      past_user_inputs: [],
      generated_responses: [],
      text: input,
    };

    // -------------- Fetch --------------
    const response = await fetch(
      'https://api-inference.huggingface.co/models/phucnq1591999/SolanaChatBot',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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',
        },
        // signal: controller.signal,
        body: JSON.stringify({ inputs }),
      },
    );

    if (!response.ok) {
      setLoading(false);
      if (response) {
        alert(
          'Something went wrong went fetching from the API. Make sure to use a valid API key.',
        );
      }
      return;
    }

    const data = response.body;
    if (!data) {
      setLoading(false);
      alert('Something went wrong');
      return;
    }

    const { generated_text } = await response.json();
    const speed = 20;
    let textPosition = 0;

    const typeWrite = () => {
      setOutputCode(generated_text.substring(0, textPosition));
      if (textPosition++ < generated_text.length) {
        setTimeout(typeWrite, speed);
      } else {
        setLoading(false);
      }
    };
    typeWrite();
  };

  const handleOnChange = (Event: any) => {
    setInputCode(Event.target.value);
  };

  const handleKeyDown = (Event: any) => {
    if (Event.keyCode === 13) {
      handleTranslate();
    }
  };

  const handleMessages = () => {
    const input = inputOnSubmit;
    const output = outputCode;
    const message = { input, output };
    const newMessages = [...messages, message];
    setMessages(newMessages);
  };

  return (
    <Flex
      w="100%"
      pt={{ base: '70px', md: '0px' }}
      direction="column"
      position="relative"
    >
      <Flex
        direction="column"
        mx="auto"
        w={{ base: '100%', md: '100%', xl: '100%' }}
        minH={{ base: '70vh', '2xl': '85vh' }}
        maxH={{ base: '100vh', '2xl': '85vh' }}
        maxW="1000px"
        pt={'60px'}
      >
        <AutoScroll showOption={false}>
          <Box
            maxH={{ base: '80vh', '2xl': '85vh' }}
            minH={{ base: '70vh', '2xl': '85vh' }}
          >
            {messages &&
              messages.map((item: any, idx: number) => {
                return (
                  <MessageElement
                    input={item.input}
                    output={item.output}
                    key={idx}
                  />
                );
              })}
            {/* Model Change */}
            <Flex
              direction={'column'}
              w="100%"
              mt={outputCode ? '20px' : 'auto'}
              mb={outputCode ? '20px' : 'auto'}
            >
              <Flex
                direction="column"
                w="100%"
                mx="auto"
                display={outputCode ? 'flex' : 'none'}
                mb={'auto'}
              >
                <Flex w="100%" align={'center'} mb="10px">
                  <Flex
                    borderRadius="full"
                    justify="center"
                    align="center"
                    bg={'transparent'}
                    border="1px solid"
                    borderColor={borderColor}
                    me="20px"
                    h="40px"
                    minH="40px"
                    minW="40px"
                  >
                    <Icon
                      as={MdPerson}
                      width="20px"
                      height="20px"
                      color={brandColor}
                    />
                  </Flex>
                  <Flex
                    p="22px"
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="14px"
                    w="100%"
                    zIndex={'2'}
                  >
                    <Text
                      color={textColor}
                      fontWeight="600"
                      fontSize={{ base: 'sm', md: 'md' }}
                      lineHeight={{ base: '24px', md: '26px' }}
                    >
                      {inputOnSubmit}
                    </Text>
                    <Icon
                      cursor="pointer"
                      as={MdEdit}
                      ms="auto"
                      width="20px"
                      height="20px"
                      color={gray}
                    />
                  </Flex>
                </Flex>
                <Flex w="100%">
                  <Flex
                    borderRadius="full"
                    justify="center"
                    align="center"
                    bg={
                      'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'
                    }
                    me="20px"
                    h="40px"
                    minH="40px"
                    minW="40px"
                  >
                    <Icon
                      as={MdAutoAwesome}
                      width="20px"
                      height="20px"
                      color="white"
                    />
                  </Flex>
                  <MessageBoxChat output={outputCode} />
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </AutoScroll>
        <Flex
          ms={{ base: '0px', xl: '60px' }}
          mt="20px"
          justifySelf={'flex-end'}
        >
          <Input
            id="input_element"
            minH="54px"
            h="100%"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="45px"
            p="15px 20px"
            me="10px"
            fontSize="sm"
            fontWeight="500"
            _focus={{ borderColor: 'none' }}
            color={inputColor}
            _placeholder={placeholderColor}
            placeholder="Type your message here..."
            onKeyDown={handleKeyDown}
            value={inputCode}
            onChange={handleOnChange}
          />
          <Button
            variant="primary"
            py="20px"
            px="16px"
            fontSize="sm"
            borderRadius="45px"
            ms="auto"
            w={{ base: '160px', md: '210px' }}
            h="54px"
            _hover={{
              boxShadow:
                '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
              bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
              _disabled: {
                bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              },
            }}
            onClick={handleTranslate}
            isLoading={loading ? true : false}
          >
            Submit
          </Button>
        </Flex>
        <Flex
          justify="center"
          mt="20px"
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
        >
          <Text fontSize="xs" textAlign="center" color={gray}>
            We are Leopard
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

const MessageElement = (props: { input: string; output: string }) => {
  const { input, output } = props;
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const inputColor = useColorModeValue('navy.700', 'white');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgIcon = useColorModeValue(
    'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
    'whiteAlpha.200',
  );
  const brandColor = useColorModeValue('brand.500', 'white');
  const buttonBg = useColorModeValue('white', 'whiteAlpha.100');
  const gray = useColorModeValue('gray.500', 'white');
  const buttonShadow = useColorModeValue(
    '14px 27px 45px rgba(112, 144, 176, 0.2)',
    'none',
  );
  const textColor = useColorModeValue('navy.700', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' },
  );
  return (
    <Flex
      direction="column"
      w="100%"
      mx="auto"
      display={output ? 'flex' : 'none'}
      mb={'auto'}
    >
      <Flex w="100%" align={'center'} mb="10px">
        <Flex
          borderRadius="full"
          justify="center"
          align="center"
          bg={'transparent'}
          border="1px solid"
          borderColor={borderColor}
          me="20px"
          h="40px"
          minH="40px"
          minW="40px"
        >
          <Icon as={MdPerson} width="20px" height="20px" color={brandColor} />
        </Flex>
        <Flex
          p="22px"
          border="1px solid"
          borderColor={borderColor}
          borderRadius="14px"
          w="100%"
          zIndex={'2'}
        >
          <Text
            color={textColor}
            fontWeight="600"
            fontSize={{ base: 'sm', md: 'md' }}
            lineHeight={{ base: '24px', md: '26px' }}
          >
            {input}
          </Text>
          <Icon
            cursor="pointer"
            as={MdEdit}
            ms="auto"
            width="20px"
            height="20px"
            color={gray}
          />
        </Flex>
      </Flex>
      <Flex w="100%">
        <Flex
          borderRadius="full"
          justify="center"
          align="center"
          bg={'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'}
          me="20px"
          h="40px"
          minH="40px"
          minW="40px"
        >
          <Icon as={MdAutoAwesome} width="20px" height="20px" color="white" />
        </Flex>
        <MessageBoxChat output={output} />
      </Flex>
    </Flex>
  );
};
