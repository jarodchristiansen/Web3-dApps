import {useState} from "react";
import {Button, Modal, Col, Row} from "react-bootstrap";
import UsernameForm from "./username-form";
import fetch from "unfetch";

// async function changePasswordHandler(passwordData) {
//     const response = await fetch("/api/auth/change-password/", {
//         method: "PATCH",
//         body: JSON.stringify(passwordData),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//
//     const data = await response.json();
//     console.log(data);
// }


async function changeUsernameHandler(userNameData) {
    const response = await fetch("/api/auth/change-username/", {
        method: "PATCH",
        body: JSON.stringify(userNameData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    return data;
}


function UsernameChangeModal(props) {

    const {show, setShow} = props

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!

                <UsernameForm onChangeUsername={changeUsernameHandler}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/*<Button variant="primary" onClick={handleClose}>*/}
                    {/*    Save Changes*/}
                    {/*</Button>*/}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UsernameChangeModal;