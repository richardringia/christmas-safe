import './App.css';
import React from "react";

class App extends React.Component {

    code = [1, 2, 3, 4, 5] // the code the crack!

    code_number_state_before = "input-" // the before string for the input

    success_text = "Gefeliciteerd de code is goed geraden! Je cadeautje is te vinden in ......"

    failed_text = "Helaas de code is fout, probeer opnieuw!"

    constructor(props) {
        super(props);

        this.state = {
            success: undefined
        }
    }

    /**
     * Check if there is only one value and keeps backspace working
     *
     * @param event
     */
    onKeyDown(event) {
        if (
            event.target.value.length > 0 &&
            (event.key === "0" || event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" || event.key === "5" || event.key === "6" || event.key === "7" || event.key === "8" || event.key === "9")) {
            event.preventDefault();
        }
    }

    /**
     * Set the given value of input to the state
     *
     * @param event
     */
    onKeyUp(event) {
        let value = event.target.value;
        let name = event.target.name;

        this.setState({
            [name]: value
        })
    }

    /**
     * Check if the given code is correct
     *
     * @param event
     */
    check(event) {
        event.preventDefault();
        let correct = true;

        this.code.forEach((number, index) => {
            if (number !== parseInt(this.state[this.code_number_state_before + index])) {
                correct = false;
            }
        })

        this.setState({
            success: correct
        })
    }

    /**
     * Check if the button is disabled by looping through the numbers in the state
     *
     * @returns {boolean}
     */
    checkDisabled() {
        let disabled = false;
        this.code.forEach((number, index) => {
            if (this.state[this.code_number_state_before + index] === undefined) {
                disabled = true;
            }
        })
        return disabled;
    }

    render() {

        if (this.state.success !== undefined) {
            return (
                <div className={"app message"}>
                    {
                        this.state.success ?
                            <iframe src="https://giphy.com/embed/l2Jhnggoa3LDBqWpG" width="320"
                                    frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                            :
                            <iframe src="https://giphy.com/embed/BMlwRsAQhpEm2Graz6" width="320" height="320"
                                    frameBorder="0"
                                    className="giphy-embed" allowFullScreen></iframe>
                    }


                    <p className={"sub-title"}>{this.state.success ? this.success_text : this.failed_text}</p>

                    {
                        !this.state.success ?
                            (
                                <button onClick={() => {
                                    window.location.reload();
                                }}>Opnieuw</button>
                            )
                            : null
                    }
                </div>
            )
        } else {
            return (
                <div className={"app"}>
                    <h1>Kraak de kerst kluis!</h1>
                    <p className={"sub-title"}>Vind de juiste code door cadeautjes te openen!</p>

                    <div className={"inputs-wrapper"}>
                        <div className={"inputs"}>
                            {
                                this.code.map((number, index) => {
                                    return <input type={"number"} name={this.code_number_state_before + index}
                                                  onKeyDown={event => this.onKeyDown(event)}
                                                  onKeyUp={event => this.onKeyUp(event)}/>
                                })
                            }
                        </div>
                        <button className={this.checkDisabled() ? "disabled" : ""} onClick={event => this.check(event)} disabled={this.checkDisabled()}>Controleren
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default App;
