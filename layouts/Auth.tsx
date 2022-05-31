import React from 'react';
import { Container, Row } from 'reactstrap';

export default function Auth(props: any) {
  React.useEffect(() => {
    document.body.classList.add('bg-default');
    return function cleanup() {
      document.body.classList.remove('bg-default');
    };
  }, []);

  return (
    <>
      <div className="main-content">
        <div className="header bg-gradient-info py-7 py-lg-8">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        <Container>
          <Row className="justify-content-center">{props.children}</Row>
        </Container>
      </div>
    </>
  );
}
