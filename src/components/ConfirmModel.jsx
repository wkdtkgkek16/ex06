import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmModel = ({ question }) => {
    const {title, message, action} = question;
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const onAction = () => {
        action();
        handleClose();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>onAction}>예</Button>
                    <Button variant="secondary" onClick={handleClose}>아니오</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmModel