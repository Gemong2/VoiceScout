import { OpenVidu } from "openvidu-browser";
import { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";

// const APPLICATION_SERVER_URL = "https://j8a404.p.ssafy.io/";
const APPLICATION_SERVER_URL = "http://localhost:4433/";

class VideoCam extends Component {
  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: this.props.sessionId,
      myUserName: this.props.name,
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isVideo !== this.props.isVideo) {
      this.state.publisher.publishVideo(this.props.isVideo);
    }

    if (prevProps.isMic !== this.props.isMic) {
      this.state.publisher.publishAudio(this.props.isMic);
    }

    if (prevProps.isIn !== this.props.isIn) {
      this.leaveSession();
    }
  }

  onbeforeunload() {
    this.leaveSession();
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    this.OV = new OpenVidu();
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        mySession.on("streamCreated", (event) => {
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);
          this.setState({
            subscribers: subscribers,
          });
        });
        mySession.on("streamDestroyed", (event) => {
          this.deleteSubscriber(event.stream.streamManager);
        });
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });
        this.getToken().then((token) => {
          console.log(this.state.mySessionId);
          console.log(this.state.myUserName);
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: !this.props.onlyConsult ? "560x600" : "560x400", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });
              mySession.publish(publisher);
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "",
      myUserName: "",
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  render() {
    return <div></div>;
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Token": sessionStorage.getItem("access-token"),
        },
      }
    );
    console.log(response.data);
    console.log(response.data);
    console.log(localStorage.getItem("historySeq"));
    console.log("!!!!!!!!!!!!!!!!!!!!!");

    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    console.log(sessionId);
    console.log(sessionId);
    let temp = localStorage.getItem("historySeq");
    console.log(temp);

    const response = await axios
      .post(
        APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Token": sessionStorage.getItem("access-token"),
            "History-Seq": localStorage.getItem("historySeq"),
          },
        }
      )
      .catch((error) => {
        if (error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "",
            text: "권한 없는 접근입니다!",
            confirmButtonText: "닫기",
          })
            .then(() => {
              window.close();
              window.history.back();
            })
            .catch((error) => console.log(error));
        }
      })
      .finally(() => {
        localStorage.clear("historySeq");
      });

    console.log("@@@@@@@@@@@@@@@@@@@");
    console.log(response.data);
    console.log(response.data);
    console.log(response.data);
    return response.data; // The token
  }
}

export default VideoCam;
