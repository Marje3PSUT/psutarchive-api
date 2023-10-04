import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Box, Layout, Main } from "@strapi/design-system";
import { LoadingIndicatorPage, getFetchClient } from "@strapi/helper-plugin";
import cornerOrnamentPath from "@strapi/admin/admin/src/pages/HomePage/assets/corner-ornament.svg";

const LogoContainer = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;

  img {
    width: ${150 / 16}rem;
  }
`;

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { get } = await getFetchClient();
        const { data } = await get(
          "/content-manager/single-types/api::admin-welcome-page.admin-welcome-page"
        );
        setContent(data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <Layout>
      <Main>
        <LogoContainer>
          <img alt="" aria-hidden src={cornerOrnamentPath} />
        </LogoContainer>
        <Box
          background="neutral0"
          hasRadius
          shadow="filterShadow"
          marginTop={7}
          marginBottom={7}
          marginLeft={7}
          marginRight={7}
        >
          {content}
        </Box>
      </Main>
    </Layout>
  );
};

export default HomePage;
