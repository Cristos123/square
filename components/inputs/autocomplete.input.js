import React, { Component } from "react";
import PropTypes from "prop-types";
import MyLocationIcon from "@mui/icons-material/MyLocation";
export class Autocomplete extends Component {
  //   static propTypes = {
  //     options: PropTypes.instanceOf(Array).isRequired,
  //   };

  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: "",
    loading: false,
    options: [],
    reveal: false,
    parentData: [],
  };

  reveal = () => {
    this.setState({ reveal: true });
  };

  onChange = (e) => {
    console.log("onChanges");
    this.fetchData();

    // const { options } = this.props;
    const userInput = e.currentTarget.value;

    const filteredOptions = this.state.options.filter(
      (optionName) =>
        optionName?.address?.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
    });
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText.split("~")[0],
      // replaceAll('~',""),
    });
    this.setState({
      reveal: false,
      parentData: e.currentTarget.innerText.split("~"),
    });
    this.props.onPassData(e.currentTarget.innerText.split("~"));
    console.log(e.currentTarget.innerText.split("~"));
  };
  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption],
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  async fetchData() {
    const response = await fetch(this.props.url);
    this.setState({
      loading: true,
    });
    const data = await response.json();
    console.log(data);
    this.setState({
      options: data?.addresses,
    });
    this.setState({ loading: false });
    return data;
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput },
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active";
              }

              return (
                <li
                  className={"flex mb-4 cursor-pointer"}
                  key={optionName?._id}
                  onClick={onClick}
                >
                  <div>
                    {/* <LocationOnIcon /> */}
                    <MyLocationIcon sx={{ fontSize: "0.8rem" }} />
                  </div>
                  <div>
                    <div>
                      {optionName?.address}
                      <span style={{ color: "transparent" }}>~</span>
                    </div>
                    <div className="subtitle">
                      {optionName?.place_id?.place},
                      <span style={{ color: "transparent" }}>~</span>
                      {optionName?.place_id?.ward_id?.ward},
                      <span style={{ color: "transparent" }}>~</span>
                      {optionName?.place_id?.ward_id?.lga_id?.lga},
                      <span style={{ color: "transparent" }}>~</span>
                      {optionName?.place_id?.ward_id?.lga_id?.state_id?.state},
                      <span style={{ color: "transparent" }}>~</span>
                      {
                        optionName?.place_id?.ward_id?.lga_id?.state_id
                          ?.country_id?.country
                      }
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="">
            <em>Type an address!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <input
            type="text"
            className="p-2 border bg-transparent border-b-0 border-gray-800 rounded-t-md focus:outline-none w-full"
            onChange={onChange}
            onKeyDown={onKeyDown}
            onClick={this.fetchData}
            onFocus={this.reveal}
            value={userInput}
            placeholder={this.props.placeholder}
          />
          {/* <input type="submit" value="" className="search-btn" /> */}
        </div>
        {this.state.reveal && (
          <div className={"border-gray-800  border p-4"}>{optionList}</div>
        )}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
