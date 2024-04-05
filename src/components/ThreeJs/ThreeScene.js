import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import SignupModal from '../Header/elements/SignupModal';
import LoginModal from '../Header/elements/LoginModal';
import "../../../node_modules/uikit"
import 'uikit/dist/css/uikit.min.css'; // uikit CSS
import UIkit from 'uikit'; // uikit JavaScript
import Image from 'next/image';


const FadeTransitionImage = ({ texturePaths, frameIndex }) => {
  const { invalidate } = useThree();
  const textures = useLoader(TextureLoader, texturePaths);
  const texture = textures[frameIndex] || textures[0];

  useEffect(() => {
    invalidate();
  }, [texture, invalidate]);

  return (
    <mesh scale={[2, 2, 2]}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

const ThreeScene = () => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [currentDonation, setCurrentDonation] = useState(0);
  const boyTexturePaths = [
    '/textures/pic1.png',
    '/textures/pic2.png',
    '/textures/pic3.png',
    '/textures/pic4.png',
    '/textures/pic5.png',
    '/textures/pic6.png',
    '/textures/pic7.png'
  ];
 
  
  const [boyFrameIndex, setBoyFrameIndex] = useState(0);
  const [registerModal, setRegisterModal] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const[Wardrobe , togglewardrobe] = useState(false)
  const handleRegister = () => {
    setRegisterModal(true)
    setLoginModal(false)

  };
  const handleLogin = () => {
    setLoginModal(true)
    setRegisterModal(false)

  };

  const items = [
    { name: 'Apple', price: 5 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },
    { name: 'Rice', price: 55 },


    // Add more items with their respective prices
  ];
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleItemSelect = (item) => {
    const updatedItems = [...selectedItems, item];
    setSelectedItems(updatedItems);

    const total = updatedItems.reduce((acc, curr) => acc + curr.price, 0);
    setTotalPrice(total);
  };

  const handleAttachCard = () => {
    // Logic to attach a card
  };



  // Update the frame index for the boy after reaching $100
  useEffect(() => {
    let interval;
    if (donationAmount >= 100 && boyFrameIndex < boyTexturePaths.length - 1) {

      interval = setInterval(() => {
        setBoyFrameIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= boyTexturePaths.length - 1) {
            clearInterval(interval);
          }
          return nextIndex;
        });
      }, 500); // Time in ms between frame changes
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [donationAmount, boyFrameIndex, boyTexturePaths.length]);

  const handleDonation = (amount) => {
    console.log(amount)
    setDonationAmount(donationAmount + amount);
  };

  return (
    <>
      <Container fluid className="  background-image ">
        <Row className=" justify-content-center align-items-center">
          <Col xs={4} md={4} lg={1} className="challenge-div">
            {/* Card for the challenge */}
            <Card className="text-left justify-content-start mb-3">
              <Card.Header className="header-card">
                TAKE THE CHALLENGE
              </Card.Header>
              <Card.Body>
                <Card.Title className="heading-card mb-3">
                  How many lives you can impact?
                </Card.Title>
                <Card.Text className="mb-2 text-card text-black">
                  5 Innocents
                </Card.Text>{" "}
                <Card.Text className="mb-2 text-card text-black">
                  15 Innocents
                </Card.Text>{" "}
                <Card.Text className="mb-2 text-card text-black">
                  25 Innocents
                </Card.Text>
                <Button
                  variant="primary"
                  className="reg-btn"
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </Card.Body>
            </Card>
            <div className="">
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                onChange={(e) => setCurrentDonation(Number(e.target.value))}
              />
              <button
                onClick={(e) => handleDonation(currentDonation)}
                className="uk-button uk-button-danger "
              >
                {" "}
                Donate{" "}
              </button>
              {/* <button  onClick={handleAttachCard} className="uk-button uk-button-secondary">
                  {" "}
                  Attach Card{" "}
                </button> */}
            </div>
          </Col>
          {registerModal && (
            <SignupModal
              show={registerModal}
              onHide={() => setRegisterModal(false)}
              createLogin={() => handleLogin()}
            />
          )}
          {loginModal && (
            <LoginModal
              show={loginModal}
              onHide={() => setLoginModal(false)}
              createAccount={() => handleRegister()}
            />
          )}
          <Col xs={4} md={6} lg={6} className="character-div">
            <Col>
              {/* Canvas for the donation visual */}
              <div className="canvas-wrapper mb-3 character-style">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[20, 10, 10]} />
                  <OrbitControls enableZoom={false} />
                  <group>
                    <FadeTransitionImage
                      texturePaths={boyTexturePaths}
                      frameIndex={boyFrameIndex}
                    />
                  </group>
                </Canvas>
              </div>
            </Col>
            <Col className="  ">
              {/* Donation form */}

              {/* musfar replaced the form here  */}

              {/* <Form className="my-3">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Col sm={9}>
                    <Form.Control
                      type="number"
                      placeholder="Enter Amount"
                      onChange={(e) =>
                        setCurrentDonation(Number(e.target.value))
                      }
                    />
                  </Col>
                  <Col sm={3}>
                    <Button
                      variant="outline-primary"
                      className="donate-btn"
                      onClick={(e) => handleDonation(currentDonation)}
                    >
                      Donate
                    </Button>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 10, offset: 1 }}>
                    <Button
                      variant="outline-secondary"
                      className="attach-card"
                      onClick={handleAttachCard}
                    >
                      Attach Card
                    </Button>
                  </Col>
                </Form.Group>
              </Form> */}

              {/* <div className="uk-card-body">
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  onChange={(e) => setCurrentDonation(Number(e.target.value))}
                />
                <button onClick={(e) => handleDonation(currentDonation)} className="uk-button uk-button-danger ">
                  {" "}
                  Donate{" "}
                </button>
                <button  onClick={handleAttachCard} className="uk-button uk-button-secondary">
                  {" "}
                  Attach Card{" "}
                </button>
              </div> */}
            </Col>
          </Col>
          <Col lg={3}>
            
            <button
              className="uk-button uk-button-secondary"
              onClick={() => togglewardrobe(!Wardrobe)}
            >
              {" "}
              Open Wardrobe{" "}
            </button>

            <div className='wardrobe-container' >
              
              {/* wardrobe variable ki base per image render hogi aur uski image position absolute hai uper toggle wardrobe ka button hai */}
              <img className='wardrobe-img' src={`${Wardrobe? 'assets/images/close.png'  : "assets/images/opencloset.png" }`} />
              
              <div
                className=    ' uk-grid uk-child-width-1-4 items-grid uk-grid-collapse '
                uk-grid=""
              >
                {items.map((item, index) => (
                  <div   key={index} onClick={() => handleItemSelect(item)}>
                    <Image
                      src={`/assets/images/${item.name}.png`}
                      height={5}
                      width={5}
                      className="imageDiv"
                      alt={item.name}
                    />
                    <p className="pricetag">
                      {item.name} - ${item.price}
                    </p>
                  </div>
                ))}
              </div>
              </div>
            


            {/* <div className='uk-grid uk-child-width-1-4 items-grid uk-grid-collapse' uk-grid="">
              {items.map((item, index) => (
                <div key={index} onClick={() => handleItemSelect(item)}
                
                >
                   <Row>
                    <Image src={`/assets/images/${item.name}.png`} height={5} width={5} className='imageDiv' alt={item.name} />
                    <p className='pricetag'>{item.name} - ${item.price}</p>
                  </Row>
                </div>
              ))}
            </div> */}

            <div className="pt-4 items-donate-box ">
              <p className="totalprice">Total Price: ${totalPrice}</p>

              <Button
                variant="outline-secondary"
                className="attach-card"
                onClick={() => setTotalPrice(0)}
              >
                Donate
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* <section className="donate-sec">
        <div className="gradient">
          <div className="uk-container  uk-padding ">
            <div className="content ">
              <div className="uk-child-width-1-2@m  uk-child-width-1-1@s">
                <h1>
                  {" "}
                  Your donation could be the lifeline for a Palestinian child{" "}
                </h1>
              </div>

              <div className="uk-card uk-card-default uk-card-body">
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  onChange={(e) => setCurrentDonation(Number(e.target.value))}
                />
                <button className="uk-button uk-button-danger ">
                  {" "}
                  Donate{" "}
                </button>
                <button className="uk-button uk-button-secondary">
                  {" "}
                  Attach Card{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="register-sec uk-container">
        <div className="uk-grid " uk-grid="" style={{ marginBottom: "20px" }}>
          <div
            className="ssss uk-width-1-2@m uk-width-1-1@s "
            style={{ height: "500px" }}
          ></div>

          <div
            className=" uk-flex uk-flex-middle uk-width-1-2@m uk-width-1-1@s"
            style={{ height: "500px" }}
          >
            <div className="register-title uk-padding ">
              <h1 className="header-card2">TAKE THE CHALLENGE</h1>
              <h2> How many lives you can impact? </h2>

              <Button
                variant="primary"
                className="uk-button uk-button-secondary"
                onClick={handleRegister}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThreeScene;
