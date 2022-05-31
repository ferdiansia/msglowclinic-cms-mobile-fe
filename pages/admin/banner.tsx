import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import FormHeader from '../../components/Headers/FormHeader';
import Header from '../../components/Headers/Header';
import BannerList from '../../container/banner/banner-menu';
import Admin from '../../layouts/Admin';

const Banner = () => {
  return (
    <>
      <Container className="mt--9" fluid>
        <Row>
          <Col xl="3">
            <Card className="shadow mb-4 mb-xl-0">
              <CardHeader className="bg-transparent">
                <Col>
                  <BannerList></BannerList>
                </Col>
              </CardHeader>
            </Card>
          </Col>

          <Col xl="9">
            <Card className="shadow mb-4 mb-xl-0">
              <CardHeader className="bg-transparent">
                <Col>
                  <BannerList></BannerList>
                </Col>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Banner.layout = Admin;

export default Banner;
