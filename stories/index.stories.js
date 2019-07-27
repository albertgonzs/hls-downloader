import { Router } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Col, Grid } from "react-styled-flexboxgrid";
import styled, { injectGlobal, ThemeProvider } from "styled-components";
import DownloadRow from "../src/components/DownloadRow";
import PlaylistRow from "../src/components/PlaylistRow";
import Table from "../src/components/Table";
import Tabs from "../src/components/Tabs";
import { theme } from "../src/theme";
import { memoryHistory } from "../src/modules/router/history";
import RequestRow from "../src/components/RequestRow";
import AboutView from "../src/views/AboutView";

const Main = styled(Grid)`
  min-width: 450px;
  width: 450px;
  color: ${props => props.theme.colors.gray700};
  background-color: ${props => props.theme.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 400px;
`;

const Body = styled(Col)`
  background-color: ${props => props.theme.colors.white};
  max-height: 400px;
  height: 300px;
`;

injectGlobal`
  html {
    font-weight: 300;
    font-size: 16px;
  }
  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
  }
`;

storiesOf("Tabs", module)
  .add("PlaylistRow", () => (
    <ThemeProvider theme={theme}>
      <Main>
        <Router history={memoryHistory}>
          <Tabs />
        </Router>
        <Body>
          <Table
            items={[
              { finished: 22 },
              { finished: 4 },
              { finished: 45 },
              { finished: 100 }
            ]}
            renderRow={({ finished }, idx) => (
              <PlaylistRow
                key={idx}
                playlist={{
                  attributes: {
                    RESOLUTION: {
                      width: 320,
                      height: 320
                    },
                    BANDWIDTH: 657398
                  }
                }}
                onDownloadClick={() => {}}
              />
            )}
          />
        </Body>
      </Main>
    </ThemeProvider>
  ))
  .add("RequestRow", () => (
    <ThemeProvider theme={theme}>
      <Router history={memoryHistory}>
        <Main>
          <Tabs />
          <Body>
            <Table
              items={[
                { finished: 22 },
                { finished: 4 },
                { finished: 45 },
                { finished: 100 }
              ]}
              renderRow={({ finished }, idx) => (
                <RequestRow
                  request={{
                    timeStamp: Date.now(),
                    requestId: "a",
                    url:
                      "https://wow.it/is.awesome.com/is.awesome.com/is.awesome.com/is.awesome.com/is.awesome.com/"
                  }}
                  key={idx}
                />
              )}
            />
          </Body>
        </Main>
      </Router>
    </ThemeProvider>
  ))

  .add("DownloadRow", () => (
    <ThemeProvider theme={theme}>
      <Main>
        <Router history={memoryHistory}>
          <Tabs />
        </Router>
        <Body>
          <Table
            items={[
              {
                title: "https://www.example.com/approval",
                finished: 22,
                created: new Date(2018, 3, 12, 12, 34, 47)
              },
              {
                title: "https://berry.example.org/achiever/bath.php",
                finished: 4,
                created: new Date(2018, 3, 12, 11, 3, 7)
              },
              {
                title: "http://www.example.org/acoustics?boundary=brake",
                finished: 45,
                created: new Date(2018, 3, 11, 2, 42, 1)
              },
              {
                title:
                  "https://www.example.com/bait.php?bedroom=book&breath=bottle",
                finished: 100,
                created: new Date(2018, 2, 1, 1, 4, 7)
              }
            ]}
            renderRow={({ finished, title, created }) => (
              <DownloadRow
                download={{
                  finished,
                  total: 100,
                  created,
                  title,
                  id: 23,
                  link: "https://wow.it/is.awesome.com"
                }}
              />
            )}
          />
        </Body>
      </Main>
    </ThemeProvider>
  ))
  .add("About", () => (
    <ThemeProvider theme={theme}>
      <Main>
        <Router history={memoryHistory}>
          <Tabs />
        </Router>
        <AboutView />
      </Main>
    </ThemeProvider>
  ));
