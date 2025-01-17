import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import SignupModal from '../Header/elements/SignupModal';

const FadeTransitionImage = ({ texturePaths, frameIndex }) => {
    const { invalidate } = useThree();
    const textures = useLoader(TextureLoader, texturePaths);
    const texture = textures[frameIndex] || textures[0];

    useEffect(() => {
        invalidate();
    }, [texture, invalidate]);

    return (
        <mesh scale={[1, 1, 1]}>
            <planeGeometry args={[8, 8]} />
            <meshBasicMaterial map={texture} transparent />
        </mesh>
    );
};

const ThreeScene = () => {
    const [donationAmount, setDonationAmount] = useState(0);
    const [currentDonation, setCurrentDonation] = useState(0);
    const boyTexturePaths = [
        '/textures/boy-sitting.jpg',
        '/textures/boy_halfway_up_1.jpg',
        '/textures/boy_halfway_up_2.jpg',
        '/textures/boy_halfway_up_3.jpg',
        '/textures/boy-standing.jpg',
    ];
    const dripTexturePaths = [
        '/textures/drip_cropped_0_0.png',
        '/textures/drip_cropped_0_1.png',
        '/textures/drip_cropped_0_2.png',
        '/textures/drip_cropped_1_0.png',
        '/textures/drip_cropped_1_1.png',
        '/textures/drip_cropped_1_2.png',
    ];
    const dripFrames = dripTexturePaths.length - 1;
    const [dripFrameIndex, setDripFrameIndex] = useState(0);
    const [boyFrameIndex, setBoyFrameIndex] = useState(0);
    const [registerModal, setRegisterModal] = useState(false)
    const handleRegister = () => {
        setRegisterModal(true)
    };

    const handleAttachCard = () => {
        // Logic to attach a card
    };

    // Update the frame index for the drip based on donation amount
    useEffect(() => {
        const newDripFrameIndex = Math.floor((donationAmount / 100) * dripFrames);
        setDripFrameIndex(newDripFrameIndex);
    }, [donationAmount, dripFrames]);

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

        <Container fluid className="background-image">
            <Row className="my-4 justify-content-center align-items-center">
                <Col xs={4} md={4} lg={2} className='challenge-div'>
                    {/* Card for the challenge */}
                    <Card className="text-left justify-content-start mb-3">
                        <Card.Header className="header-card">TAKE THE CHALLENGE</Card.Header>
                        <Card.Body>
                            <Card.Title className='heading-card mb-3'>How many lives you can impact?</Card.Title>
                            <Card.Text className='mb-2 text-card'>
                                5 Innocents
                            </Card.Text> <Card.Text className='mb-2 text-card'>
                                15 Innocents
                            </Card.Text> <Card.Text className='mb-2 text-card'>
                                25 Innocents
                            </Card.Text>
                            <Button variant="primary" className="reg-btn" onClick={handleRegister}>Register</Button>
                        </Card.Body>
                    </Card>
                </Col>
                {registerModal && (
                <SignupModal show={registerModal}  onHide={()=>setRegisterModal(false)}/>
                ) }
                <Col xs={8} md={8} lg={10} className='character-div'>
                    <Col>
                        {/* Canvas for the donation visual */}
                        <div className="canvas-wrapper mb-3 character-style">
                            <Canvas>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[20, 10, 10]} />
                                <OrbitControls enableZoom={false} />
                                <group >
                                    <FadeTransitionImage
                                        texturePaths={boyTexturePaths}
                                        frameIndex={boyFrameIndex}
                                    />
                                </group>
                            </Canvas>
                        </div>
                    </Col>
                    <Col className="donate-box">
                        {/* Donation form */}
                        <Form className="my-3">
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Col sm={9}>
                                    <Form.Control type="number" placeholder="Enter Amount" onChange={(e) => setCurrentDonation(Number(e.target.value))} />
                                </Col>
                                <Col sm={3}>
                                    <Button variant="outline-primary" className='donate-btn' onClick={(e) => handleDonation(currentDonation)} >Donate</Button>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{ span: 10, offset: 1 }}>
                                    <Button variant="outline-secondary" className='attach-card' onClick={handleAttachCard}>Attach Card</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default ThreeScene;
