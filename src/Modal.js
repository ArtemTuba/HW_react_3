import React from 'react';
import "./PostStyle.css"

class Modal extends React.Component{
 
    render(){
        return(
            <div className='modal'>
                {this.props.modalEdit && (
                    <div>
                        <p>Редактирование</p>
                        <div>
                            <input type="text" value={this.props.editPostTitle} onChange={this.props.handleChange} />
                            <button onClick={this.props.editTitleGlobal}>Сохранить</button>
                            <button onClick={this.props.cancelEdit}>Отмена</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Modal;