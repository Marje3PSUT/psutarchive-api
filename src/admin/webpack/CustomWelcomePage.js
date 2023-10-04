/*
 * HomePage
 *
 */

import React, { useMemo } from 'react';

import { Box, Grid, GridItem, Layout, Main } from '@strapi/design-system';
import styled from 'styled-components';

import cornerOrnamentPath from '@strapi/admin/admin/src/pages/HomePage/assets/corner-ornament.svg';

const LogoContainer = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;

  img {
    width: ${150 / 16}rem;
  }
`;

const HomePage = () => (
    <Layout>
        <Main>
            <LogoContainer>
                <img alt="" aria-hidden src={cornerOrnamentPath} />
            </LogoContainer>
            
        </Main>
    </Layout>
);

export default HomePage;