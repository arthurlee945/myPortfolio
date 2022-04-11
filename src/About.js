import React from 'react';
import firstCreditImg from "./Assets/AboutFirst.png";
import secondCreditImg from "./Assets/AboutSecond.png";


class About extends React.Component{
    constructor(props){
      super(props);
      this.state={
        photo:firstCreditImg,
        photoChange:false
      }
      this.handleTitle = this.handleTitle.bind(this);
      this.handleLeave = this.handleLeave.bind(this);
      this.handleImgEnter = this.handleImgEnter.bind(this);
      this.handleImgLeave = this.handleImgLeave.bind(this);
    }
    componentDidMount(){
      this.props.loading();
      document.querySelector(".about").style.opacity =1;
  
      let titleContainer = document.querySelector(".titleContainer");
      titleContainer.addEventListener("mouseenter", this.handleTitle);
      titleContainer.addEventListener("mouseleave", this.handleLeave);
      titleContainer.addEventListener("touchstart", this.handleTitle);
      titleContainer.addEventListener("touchend", this.handleLeave);
  
      let aboutImg = document.querySelector(".imgContainer");
      aboutImg.addEventListener("mouseenter", this.handleImgEnter);
      aboutImg.addEventListener("mouseleave", this.handleImgLeave);
      aboutImg.addEventListener("touchstart", this.handleImgEnter);
      aboutImg.addEventListener("touchend", this.handleImgLeave);
    }
    componentWillUnmount(){
      document.querySelector(".about").style.opacity =0;
  
      let titleContainer = document.querySelector(".titleContainer");
      titleContainer.removeEventListener("mouseenter", this.handleTitle);
      titleContainer.removeEventListener("mouseleave", this.handleLeave);
      titleContainer.removeEventListener("touchstart", this.handleTitle);
      titleContainer.removeEventListener("touchend", this.handleLeave);
  
      let aboutImg = document.querySelector(".imgContainer");
      aboutImg.removeEventListener("mouseenter", this.handleImgEnter);
      aboutImg.removeEventListener("mouseleave", this.handleImgLeave);
      aboutImg.removeEventListener("touchstart", this.handleImgEnter);
      aboutImg.removeEventListener("touchend", this.handleImgLeave)
    }
  
    handleTitle(e){
      let titleContainer = document.querySelector(".titleContainer");
      titleContainer.style.letterSpacing = "0.8rem";
      setTimeout(()=>{
        let exclaim = document.getElementById("exclaim");
        exclaim.style.transform = "rotate(65deg)"
      },100);
      e.preventDefault();
    }
    handleLeave(e){
      let titleContainer = document.querySelector(".titleContainer");
      let exclaim = document.getElementById("exclaim");
      titleContainer.style.letterSpacing = "0.2rem";
      setTimeout(()=>{
        exclaim.style.transform = "rotate(0deg)"
      },100)
          e.preventDefault();
    }
  
    handleImgEnter(e){
      this.setState({photo:secondCreditImg, photoChange:true});
      e.preventDefault()
    }
    handleImgLeave(e){
      this.setState({photo:firstCreditImg, photoChange:false});
      e.preventDefault()
    }
  
    render(){
      return(
        <div className = "about">
          <div className = "aboutmeBox">
            <div className = "titleContainer">
              <h1>A</h1>
              <h1>b</h1>
              <h1>o</h1>
              <h1>u</h1>
              <h1>t</h1>
              <h1>M</h1>
              <h1>e</h1>
              <h1 id = "exclaim">!</h1>
            </div>
            <p>I'm a <span>developer</span>, <span>creator</span>, and most importantly a <span>learner</span>. My creative journey in web development started as a photographer/editor creating websites using WordPress in 2017. Turns out, I enjoyed the creation process more than I anticipated!</p>
            <p>Using that experience, I worked for a production company as an intern, producing websites for multiple projects used for promotional purposes. Later, I actively started learning coding languages, starting with C# and began to expand my knowledge in front-end development.</p>
            <p>Fast forward to today, I create/develop websites that are both informative and fun!</p>
            <p><span>Here are some languages I use:</span></p>
            <div className ="aboutLogoBox">
                <div>
                  <i className="fa-brands fa-react"></i>
                  <p>React</p>
                </div>
                <div>
                  <i className="fa-brands fa-js-square"></i>
                  <p>JavaScript</p>
                </div>
                <div>
                  <i className="fa-brands fa-html5"></i>
                  <p>HTML</p>
                </div>
                <div>
                  <i className="fa-brands fa-css3"></i>
                  <p>CSS</p>
                </div>
                <div>
                  <i className="fa-brands fa-sass"></i>
                  <p>Sass</p>
                </div>
                <div>
                  <i className="fa-brands fa-node-js"></i>
                  <p>Node.js</p>
                </div>
            </div>
          </div>
          <div className = "myImgBox">
            <div className = "imgContainer">
              {this.state.photoChange?<p><i className="fa-solid fa-arrow-turn-down"></i>This is my spoon!</p>:""}
              <img className = "aboutImg" src = {this.state.photo} alt ="my Profile Img" draggable="false"/>
            </div>
            <div className = "imgCredit">
              <h2>Spoonful <span>by</span> <span>Arthur Lee</span></h2>
              <div className ="abouticonsContainer">
                <a href="https://github.com/arthurlee945" target="_blank"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.instagram.com/arthur_lee94/" target="_blank"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/arthurjlee/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                <a href="https://drive.google.com/file/d/1LIDUaMsqGZBRERfr71ZZCG5Y-X6bf4ZU/view?usp=sharing" target="_blank"><i className="fa-solid fa-file-lines"></i></a>
                <a href="mailto:arthur.lee945@gmail.com" target="_blank"><i className="fa-solid fa-envelope"></i></a>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

export default About;