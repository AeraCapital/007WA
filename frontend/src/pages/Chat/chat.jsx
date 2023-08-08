import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import { chats, messages } from "./mock-data";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";

import classnames from "classnames";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import avatar1 from "../../assets/images/users/avatar-1.jpg";

// import {
//   getChats as onGetChats,
// getGroups as onGetGroups,
// getContacts as onGetContacts,
// getMessages as onGetMessages,
// addMessage as onAddMessage,
// } from "../../slices/chats/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Chat = () => {
  const dispatch = useDispatch();

  // const selectProperties = createSelector(
  //   (state) => state.chats,
  //   (chats) => ({
  //     chats: chats.chats,
  //     groups: chats.groups,
  //     contacts: chats.contacts,
  //     messages: chats.messages,
  //   })
  // );

  // const { chats, groups, contacts, messages } = useSelector(selectProperties);

  const [messageBox, setMessageBox] = useState(null);
  const [msgData, setMsgData] = useState();
  // const Chat_Box_Username2 = "Henry Wells"
  const [currentRoomId, setCurrentRoomId] = useState(1);
  const currentUser = {
    name: "Henry Wells",
    isActive: true,
  };

  const [menu1, setMenu1] = useState(false);
  const [search_Menu, setsearch_Menu] = useState(false);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [other_Menu, setother_Menu] = useState(false);
  const [activeTab, setactiveTab] = useState("1");
  const [Chat_Box_Username, setChat_Box_Username] = useState("Stevn Franklin");
  // eslint-disable-next-line no-unused-vars
  const Chat_Box_User_Status = "Active Now";

  const [curMessage, setcurMessage] = useState("");

  // useEffect(() => {
  //   dispatch(onGetChats());
  //   // dispatch(onGetGroups());
  //   // dispatch(onGetContacts());
  //   dispatch(onGetMessages(currentRoomId));
  // }, [dispatch, currentRoomId]);

  const scrollToBottom = useCallback(() => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  }, [messageBox]);

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [scrollToBottom]);

  useEffect(() => {
    setMsgData(messages);
  }, []);

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu);
  };

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  const toggleOther = () => {
    setother_Menu(!other_Menu);
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  //Use For Chat Box
  const userChatOpen = (id, name, status, roomId) => {
    // setChat_Box_Username(name);
    // setCurrentRoomId(roomId);
    // dispatch(onGetMessages(roomId));
  };

  // const addMessage = (roomId, sender) => {
  //   const message = {
  //     id: Math.floor(Math.random() * 100),
  //     roomId,
  //     sender,
  //     message: curMessage,
  //     createdAt: new Date(),
  //   };
  //   setcurMessage("");
  //   // dispatch(onAddMessage(message));
  // };

  // const onKeyPress = (e) => {
  //   const { key, value } = e;
  //   if (key === "Enter") {
  //     setcurMessage(value);
  //     addMessage(currentRoomId, currentUser.name);
  //   }
  // };

  //serach recent user
  const searchUsers = () => {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-user");
    filter = input.value.toUpperCase();
    ul = document.getElementById("recent-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };

  const [deleteMsg, setDeleteMsg] = useState("");
  const toggle_deleMsg = (ele) => {
    setDeleteMsg(!deleteMsg);
    ele.closest("li").remove();
  };

  const copyMsg = (ele) => {
    var copyText = ele.closest(".conversation-list").querySelector("p").innerHTML;
    navigator.clipboard.writeText(copyText);
  };

  return (
    <Row>
      <Col lg={12}>
        <div className="d-lg-flex">
          <div className="chat-leftsidebar me-lg-4">
            <div>
              <div className="search-box chat-search-box pb-4">
                <div className="position-relative">
                  <Input
                    onKeyUp={searchUsers}
                    id="search-user"
                    type="text"
                    placeholder="Search..."
                  />
                  <i className="bx bx-search-alt search-icon" />
                </div>
              </div>

              <div className="chat-leftsidebar-nav">
                <div>
                  <ul className="list-unstyled chat-list" id="recent-list">
                    <PerfectScrollbar style={{ height: "450px" }}>
                      {map(chats, (chat) => (
                        <li
                          key={chat.id + chat.status}
                          className={currentRoomId === chat.roomId ? "active" : ""}>
                          <Link
                            to="#"
                            onClick={() => {
                              console.log("Chat clicked");
                              userChatOpen(chat.id, chat.name, chat.status, chat.roomId);
                            }}>
                            <div className="d-flex">
                              <div className="avatar-xs align-self-center me-3">
                                <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                  {chat.name[0]}
                                </span>
                              </div>

                              <div className="flex-grow-1 overflow-hidden">
                                <h5 className="text-truncate font-size-14 mb-1">{chat.name}</h5>
                                <p className="text-truncate mb-0">{chat.description}</p>
                              </div>
                              <div className="font-size-11">{chat.time}</div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </PerfectScrollbar>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 user-chat">
            <Card>
              <div className="p-4 border-bottom ">
                <h5 className="font-size-15 mb-1">{Chat_Box_Username}</h5>
                <p className="text-muted mb-0">
                  <i
                    className={
                      Chat_Box_User_Status === "Active Now"
                        ? "mdi mdi-circle text-success align-middle me-2"
                        : Chat_Box_User_Status === "intermediate"
                        ? "mdi mdi-circle text-warning align-middle me-1"
                        : "mdi mdi-circle align-middle me-1"
                    }
                  />
                  {Chat_Box_User_Status}
                </p>
              </div>
              <div>
                <div className="chat-conversation p-3">
                  <ul className="list-unstyled">
                    <PerfectScrollbar
                      style={{ height: "300px" }}
                      containerRef={(ref) => setMessageBox(ref)}>
                      <li>
                        <div className="chat-day-title">
                          <span className="title">Today</span>
                        </div>
                      </li>
                      {msgData &&
                        map(msgData, (message) => (
                          <li
                            key={"test_k" + message.id}
                            className={message.sender === currentUser.name ? "right" : ""}>
                            <div className="conversation-list">
                              <UncontrolledDropdown>
                                <DropdownToggle href="#" tag="a" className="dropdown-toggle">
                                  <i className="bx bx-dots-vertical-rounded" />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem onClick={(e) => copyMsg(e.target)} href="#">
                                    Copy
                                  </DropdownItem>
                                  <DropdownItem onClick={(e) => toggle_deleMsg(e.target)} href="#">
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>

                              <div className="ctext-wrap">
                                <div className="conversation-name">{message.sender}</div>
                                <p>{message.message}</p>
                                <p className="chat-time mb-0">
                                  <i className="bx bx-time-five align-middle me-1"></i>{" "}
                                  {message.time}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                    </PerfectScrollbar>
                  </ul>
                </div>
                <div className="p-3 chat-input-section">
                  <Row>
                    <Col>
                      <div className="position-relative">
                        <Input
                          type="text"
                          value={curMessage}
                          onKeyPress={(data) => console.log(data)}
                          onChange={(e) => setcurMessage(e.target.value)}
                          className="chat-input"
                          placeholder="Enter Message..."
                        />
                      </div>
                    </Col>
                    <Col className="col-auto">
                      <Button
                        type="button"
                        color="primary"
                        onClick={() => console.log("Clicked")}
                        className="btn btn-primary btn-rounded chat-send w-md ">
                        <span className="d-none d-sm-inline-block me-2">Send</span>
                        <i className="mdi mdi-send" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
