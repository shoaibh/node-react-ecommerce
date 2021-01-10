import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useSelector, useDispatch } from "react-redux";
import { Jumbotron, Container } from "reactstrap";
import CarouselHomepage from "../components/CarouselHomepage";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { listProducts } from "../actions/productActions";
import { useHistory } from "react-router-dom";
import "./Home.css";

const styles = {
  bannerCoverPc: {
    backgroundImage: 'url("/images/Essentials.jpeg")',
    backgroundSize: "cover",
  },
  bannerCoverMobile: {
    backgroundImage: 'url("/images/banner-cover-mobile.jpg")',
    backgroundSize: "cover",
  },
  textBanner: {
    textShadow: "3px 3px 3px grey",
    textAlign: "center",
    color: "white",
  },
  centerButtons: {
    textAlign: "center",
    padding: "30px",
  },
  titleH1Pc: {
    fontSize: "80px",
  },
  titleH1Mobile: {
    fontSize: "60px",
  },
};

const {
  bannerCoverPc,
  bannerCoverMobile,
  textBanner,
  centerButtons,
  titleH1Mobile,
  titleH1Pc,
} = styles;
let first = "";

const Home = () => {
  const history = useHistory();
  const [isListening, setIsListening] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState();
  const dispatch = useDispatch();

  const commands = [
    {
      command: "search *",
      callback: (product) => {
        setSearchKeyword(product);
        SpeechRecognition.stopListening();
        const productSearch = product
          .toLowerCase()
          .split(" ")
          .join("_");
        if (productSearch == "energy" || productSearch == "essentials")
          history.push(`/category/${productSearch}`);
        else history.push(`/productList/${productSearch}`);
      },
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  const submitHandler = (e) => {
    e.preventDefault();
    const productSearch = searchKeyword
      .toLowerCase()
      .split(" ")
      .join("_");
    if (productSearch == "energy" || productSearch == "essentials")
      history.push(`/category/${searchKeyword}`);
    else history.push(`/productList/${productSearch}`);
  };
  let speech = new SpeechSynthesisUtterance();
  useEffect(() => {
    if (!first) {
      //   SpeechRecognition.startListening({ continuous: true })
      //   setIsListening(true)
      // speech.lang = "en-US";
      // speech.text = 'Welcome to Paryavaran. Say Search and then the product you want to buy';
      // speech.volume = 1;
      // speech.rate = 1;
      // speech.pitch = 1;
      // window.speechSynthesis.speak(speech);
      // first = 'done'
    }
  }, []);
  const onStop = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };
  const onStart = () => {
    SpeechRecognition.startListening();
    setIsListening(true);
  };
  return (
    <div>
      <Jumbotron fluid style={isMobile ? bannerCoverMobile : bannerCoverPc}>
        <Container fluid style={{ height: "500px" }}>
          <div style={textBanner}>
            <h1
              className="display-3"
              style={isMobile ? titleH1Mobile : titleH1Pc}
            >
              Paryavaran
            </h1>
            <p>One Shop destination for Green Products</p>
          </div>
          <div style={centerButtons}>
            <form onSubmit={submitHandler}>
              <input
                name="searchKeyword"
                placeholder="search or tap on mic"
                style={{ width: "320px", height: "50px" }}
                onChange={(e) => setSearchKeyword(e.target.value)}
                value={searchKeyword}
              />
              {isListening ? (
                <span
                  style={{
                    position: "absolute",
                    transform: "translate(-30px, 14px)",
                    cursor: "pointer",
                  }}
                  className="blink"
                  title="stop"
                  onClick={onStop}
                >
                  🛑
                </span>
              ) : (
                <span
                  style={{
                    position: "absolute",
                    transform: "translate(-30px, 10px)",
                    cursor: "pointer",
                  }}
                  className="w3-xlarge"
                  onClick={onStart}
                >
                  <i class="fa fa-microphone"></i>
                </span>
              )}
              <span
                style={{ cursor: "pointer", width: "20px", height: "20px" }}
                className="w3-xlarge"
                type="submit"
                onClick={submitHandler}
              >
                <i class="fa fa-search"></i>
              </span>
            </form>
          </div>
        </Container>
      </Jumbotron>
      <div style={{ marginTop: "-33px" }}>
        <CarouselHomepage />
      </div>
    </div>
  );
};

export default Home;
