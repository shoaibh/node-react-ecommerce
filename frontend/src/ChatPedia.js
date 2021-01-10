import React, { Component } from "react";
import PropTypes from "prop-types";
import { Loading } from "react-simple-chatbot";

class ChatPedia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: "",
      link: "",
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    const search = steps.typeToSearch.value.toLowerCase();

    if (search == "sustainable finance scheme" || search == "sfs") {
      self.setState({
        loading: false,
        result:
          "SIDBI has introduced a new scheme called the Sustainable Finance Scheme for funding sustainable development projects that contribute energy efficiency and cleaner production but not covered under the international or bilateral lines of credit. All sustainable development projects such as renewable energy projects, Bureau of Energy Efficiency (BEE) star rating, green microfinance, green buildings and eco-friendly labelling, etc. are applicable for the scope of this scheme.",
      });
      return;
    }
    if (search.includes("subsidy") && search.includes("solar")) {
      self.setState({
        loading: false,
        result: "click here to calculate the subsidy: ",
        link: "https://solarrooftop.gov.in/rooftop_calculator",
      });
      return;
    }
    const queryUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${search}`;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", readyStateChange);

    function readyStateChange() {
      if (this.readyState === 4) {
        const data = JSON.parse(this.responseText);
        const bindings = data.query.pages[Object.keys(data.query.pages)[0]];
        if (bindings.extract) {
          self.setState({
            loading: false,
            result: bindings.extract.slice(0, 600) + "...",
          });
        } else {
          self.setState({ loading: false, result: "Not found." });
        }
      }
    }

    xhr.open("GET", queryUrl);
    xhr.send();
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="dbpedia">
        {loading ? (
          <Loading />
        ) : (
          <span>
            {result}
            {this.state.link ? (
              <a href={this.state.link} target="popup">
                {this.state.link}
              </a>
            ) : null}
          </span>
        )}
        {!loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            {!trigger && (
              <button onClick={() => this.triggetNext()}>Search Again</button>
            )}
          </div>
        )}
      </div>
    );
  }
}

ChatPedia.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

ChatPedia.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

export default ChatPedia;
