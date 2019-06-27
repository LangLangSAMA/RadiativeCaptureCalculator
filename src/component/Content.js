import React from "react";

// import components
import Form from "./Form";
import FormDisplay from "./FormDisplay";
import Graph from "./Graph";

// import data
import data from "../helper/data";
// import { logicJS } from "../helper/graphLogic";
import { computeResult, computeMaxAngleData } from "../helper/compute";

// import css
import "./Content.scss";

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // input_params
            beam_a: "",
            beam_z: "",
            target_a: "",
            target_z: "",
            e_res: "",
            w_g: "",
            pressure: "",
            stopping_power: "",

            max_angle_data: [],
            max_angle_value: ""
        };
        this.result = [];
    }

    inputOnChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        // TODO:: Update Regular Expression Check
        this.setState({
            [name]: value
        })
    }

    getMaxAngleData = () => {
        const {
            beam,
            target,
            recoil
        } = this.result;

        const max_angle = computeMaxAngleData(beam, target, recoil);

        this.setState({
            max_angle_data: max_angle.data,
            max_angle_value: max_angle.max_value
        })
    }

    render() {

        const {
            beam_a,
            beam_z,
            target_a,
            target_z,
            e_res,
            w_g,
            pressure,
            stopping_power,

            max_angle_data,
            max_angle_value
        } = this.state;

        this.result = computeResult(this.state);

        const {
            beam,
            target,
            recoil,
            resonance,
            kinematics,
        } = this.result;

        const reaction_params = {
            beam_a: beam_a,
            beam_z: beam_z,
            target_a: target_a,
            target_z: target_z,
        };

        const resonance_params = {
            e_res: e_res,
            e_lvl: resonance.e_lvl,
            w_g: w_g,
        }

        const target_gas_params = {
            pressure: pressure,
            stopping_power: stopping_power
        }

        // For Test Only
        // console.log(this.state);

        return (
            <div className="component-content">
                <div className="content-container">
                    <Form
                        className="reaction-params-form const-width m-r-15 m-b-15"
                        FormRow={data.ReactionParamsRow}
                        title="Reaction Parameters"
                        valueList={reaction_params}
                        fieldOnChange={this.inputOnChange}
                    />
                    <Form
                        className="resonance-params-form const-width m-r-15 m-b-15"
                        FormRow={data.ResonanceParamsRow}
                        title="Resonance Parameters"
                        valueList={resonance_params}
                        fieldOnChange={this.inputOnChange}
                    />
                    <Form
                        className="target-gas-params-form const-width m-b-15"
                        FormRow={data.TargetGasParamsRow}
                        title="Target Gas Parameters"
                        valueList={target_gas_params}
                        fieldOnChange={this.inputOnChange}
                    />
                    <Form
                        className="beam-form const-width m-r-15 m-b-15"
                        FormRow={data.BeamRow}
                        title="Beam Atom"
                        valueList={beam}
                    />
                    <Form
                        className="target-form const-width m-r-15 m-b-15"
                        FormRow={data.TargetRow}
                        title="Target Atom"
                        valueList={target}
                    />
                    <Form
                        className="recoil-form const-width m-b-15"
                        FormRow={data.RecoilRow}
                        title="Recoil Atom"
                        valueList={recoil}
                    />
                    <FormDisplay
                        className="kinematics-form full-width m-b-15"
                        FormRowList={data.KinematicsRow}
                        title="Kinematics"
                        valueList={kinematics}
                    />
                    <Graph
                        title="Eres vs Max Angle"
                        data={max_angle_data && max_angle_data}
                        max_value={max_angle_value ? max_angle_value : 0}
                        e_res={e_res ? e_res : 0}
                        max_angle={kinematics.max_angle ? kinematics.max_angle : 0}
                        getMaxAngleData={this.getMaxAngleData}
                    />
                </div>
            </div>
        );
    }
}
export default Content;