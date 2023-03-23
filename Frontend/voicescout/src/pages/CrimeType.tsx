import React from "react";
import style from "./CrimeType.module.css";
import { useState } from "react";

export default function CrimeType() {

  const [toggleState, setToggleState] = useState(0);
    
    const toggleTab = (index:number) => {
      setToggleState(index);
    }
  return (
    <>
      <div className={style.container}>
        <div className={style.button_container}>
          <button className={toggleState === 1 ? style.button_on  + " " + style.button + " " + style.button_size_s : 
          style.button + " " + style.button_size_s}
          onClick={() => toggleTab(1)}>
            수법소개
          </button>

          <button className= {toggleState === 2 ? style.button_on  + " " + style.button + " " + style.button_size_s : 
          style.button + " "+ style.button_size_s}
          onClick={() => toggleTab(2)}>
            범인발송문자
          </button>
      
          <button className={toggleState === 3 ? style.button_on  + " " +style.button + " " + style.button_size_s : 
          style.button + " "+ style.button_size_s}
          onClick={() => toggleTab(3)}>
            예방법
          </button>

          <button className={toggleState === 4 ? style.button_on  + " " +style.button + " " + style.button_size_s : 
          style.button + " "+ style.button_size_s}
          onClick={() => toggleTab(4)}>
            구제방법
          </button>

        </div>
        <div className={style.square}>
          <div className={style.context_square}>

            <div className={ toggleState === 1 ? style.content + " " + style.active_content : style.content }>
              <h2>수법소개</h2>
              <hr />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Nesciunt optio debitis ipsa quo at. Rerum tempore libero maiores quae, 
                laboriosam adipisci. Pariatur, 
                cumque! Sit quas quia ab magnam veritatis! Nobis.
              </p>
            </div>


            <div className={ toggleState === 2 ? style.content + " " + style.active_content : style.content }>
              <h2>범인발송문자</h2>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Odio quasi soluta quibusdam, nam molestias veritatis reiciendis. 
                Natus asperiores, 
                officiis aliquid dolor commodi voluptates incidunt itaque 
                fuga sapiente illum accusantium quibusdam!
              </p>
            </div>


            <div className={ toggleState === 3 ? style.content + " " + style.active_content : style.content }>
              <h2>예방법</h2>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Odio quasi soluta quibusdam, nam molestias veritatis reiciendis. 
                Natus asperiores, 
                officiis aliquid dolor commodi voluptates incidunt itaque 
                fuga sapiente illum accusantium quibusdam!
              </p>
            </div>


            <div className={ toggleState === 4 ? style.content + " " + style.active_content : style.content }>
              <h2>구제방법</h2>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Odio quasi soluta quibusdam, nam molestias veritatis reiciendis. 
                Natus asperiores, 
                officiis aliquid dolor commodi voluptates incidunt itaque 
                fuga sapiente illum accusantium quibusdam!
              </p>
            </div>
          </div>
        </div>
      </div> 
        
    </>
  );
}
