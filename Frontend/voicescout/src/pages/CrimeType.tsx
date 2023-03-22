import React from "react";
import style from "./CrimeType.module.css";
import { useState } from "react";

export default function CrimeType() {

  const [toggleState, setToggleState] = useState(1);
    
    const toggleTab = (index:number) => {
      setToggleState(index);
    }
  return (
    <>
      <div className={style.container}>
        <div className={style.imgfolder}></div>
          <div className="buttonsquare"></div>
      </div> 
      {/* <div className={style.container}>
        <ul>
          <li><div 
            className= { toggleState === 1 ? style.tabs + " " + style.active_tabs : style.tabs}
            onClick={() => toggleTab(1)}>수법 소개</div></li>
          <li>  
            <div 
            className={ toggleState === 2 ? style.tabs + " " + style.active_tabs : style.tabs}
            onClick={() => toggleTab(2)}>피해 문자</div></li>
          <li>
            <div 
            className={ toggleState === 3 ? style.tabs + " " + style.active_tabs : style.tabs}
            onClick={() => toggleTab(3)}>예방법</div></li>
          <li>
            <div 
            className={ toggleState === 4 ? style.tabs + " " + style.active_tabs : style.tabs}
            onClick={() => toggleTab(4)}>구제방법</div></li>
      </ul>
        <div 
            className={style.content_tabs}>

            <div className={ toggleState === 1 ? style.content + " " + style.active_content : style.content }>
              <h2>Content 1</h2>
              <hr />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Nesciunt optio debitis ipsa quo at. Rerum tempore libero maiores quae, 
                laboriosam adipisci. Pariatur, 
                cumque! Sit quas quia ab magnam veritatis! Nobis.
              </p>
            </div>


            <div className={ toggleState === 2 ? style.content + " " + style.active_content : style.content }>
              <h2>Content 2</h2>
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
              <h2>Content 3</h2>
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
              <h2>Content 4</h2>
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
      </div> */}
    </>
  );
}
