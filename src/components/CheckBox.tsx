import React, {ChangeEvent} from 'react';


type PropsType = {
    checked: boolean
    callBack:(isDone:boolean)=> void

}
const CheckBox = (props: PropsType) => {
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked);
    }

    return (
        <input type = 'checkbox' checked = {props.checked} onChange = {onChangeHandler} />
    );
};

export default CheckBox;
