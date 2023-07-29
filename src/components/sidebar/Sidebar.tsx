'use client';
import React, { PropsWithChildren } from 'react';

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import Content from '@/components/sidebar/components/Content';
import {
  renderThumb,
  renderTrack,
  renderView,
} from '@/components/scrollbar/Scrollbar';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { IoMenuOutline } from 'react-icons/io5';
import { IRoute } from '@/types/navigation';
import { isWindowAvailable } from '@/utils/navigation';

export interface SidebarProps extends PropsWithChildren {
  routes: IRoute[];
  [x: string]: any;
}

function Sidebar(props: SidebarProps) {
  const { routes, setApiKey } = props;
  // this is for the rest of the collapses
  let variantChange = '0.2s linear';
  let shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset',
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue('white', 'navy.800');
  let sidebarRadius = '14px';
  let sidebarMargins = '0px';
  // SIDEBAR
  return <></>;
}

// FUNCTIONS
export function SidebarResponsive(props: { routes: IRoute[] }) {
  let sidebarBackgroundColor = useColorModeValue('white', 'navy.800');
  let menuColor = useColorModeValue('gray.400', 'white');
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { routes } = props;
  return <></>;
}
// PROPS

export default Sidebar;
