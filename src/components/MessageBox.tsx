import ReactMarkdown from 'react-markdown';
import { useColorModeValue } from '@chakra-ui/react';
import Card from '@/components/card/Card';
import { useEffect, useState } from 'react';

interface NodeText {
  type: string;
  value: string;
}

export default function MessageBox(props: { output: string }) {
  const { output } = props;
  const textColor = useColorModeValue('navy.700', 'white');
  const [data, setData] = useState<Array<NodeText>>([]);

  return (
    <Card
      display={output ? 'flex' : 'none'}
      px="22px !important"
      pl="22px !important"
      color={textColor}
      fontSize={{ base: 'sm', md: '15px' }}
      lineHeight={{ base: '24px', md: '26px' }}
      fontWeight="500"
    >
      <ReactMarkdown className="font-medium">
        {output ? output : ''}
      </ReactMarkdown>
    </Card>
  );
}
