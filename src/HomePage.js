import React from 'react';
import profileTop from"./Assets/profileTop.png";
import profileBottom from"./Assets/profileBottom.png";

class HomePage extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        profileDim:[],
        headerDim:[],
        audioSrc:[],
        mainAmp:[],
        speaking:false,
        clickme:false,
        touch:false,
        resize:0,
        rerender:false
      }
      this.handleRecording = this.handleRecording.bind(this);
      this.handleEndRecording = this.handleEndRecording.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.handleRecAni = this.handleRecAni.bind(this);
      this.handleMovement = this.handleMovement.bind(this);
      this.handleOverPic = this.handleOverPic.bind(this);
      this.handleOutPic = this.handleOutPic.bind(this);
      this.resizeMyProfile = this.resizeMyProfile.bind(this);
      this.handleTouchStart = this.handleTouchStart.bind(this);
      this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }
    analyserId =0;
  
    componentDidMount(){
      this.props.loading();
      document.querySelector(".homePage").style.opacity=1
      //Intersection action
      const sections = document.querySelectorAll("section");
      const introLeft = document.querySelector(".doThisBox");
      const introRight = document.querySelector(".shortIntroBox");
      const footer = document.querySelectorAll(".fadeIn");
      const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry =>{
          if(entry.target.getAttribute("class").includes("doThisBox")&&entry.isIntersecting){
            entry.target.classList.remove("fadeLeft");
            observer.unobserve(entry.target);
          }
          if(entry.target.getAttribute("class").includes("shortIntroBox")&&entry.isIntersecting){
            setTimeout(()=>{
              entry.target.classList.remove("fadeRight");
              observer.unobserve(entry.target);
            },450)
          }
          if(entry.target.getAttribute("class").includes("fadeIn")&&entry.isIntersecting){
            entry.target.classList.remove("fadeIn");
            observer.unobserve(entry.target);
          }
          if(entry.target.getAttribute("class") === "quickContactBox"){
            if(entry.isIntersecting){
              document.documentElement.style.setProperty("--menuTagColor","#f7f7f7")
            }
            else{
              document.documentElement.style.setProperty("--menuTagColor","#091b35")
            }
          }
      })
      }, {threshold:0.5})
  
      sections.forEach(sec => {observer.observe(sec)});
      footer.forEach(ele => observer.observe(ele));
      observer.observe(introLeft);
      observer.observe(introRight);
  
      //Profile Image Dimension Calc
      window.addEventListener("load",()=>{
        let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        let introHeader = document.querySelector(".introductionBox");
        introHeader.addEventListener("mousemove", this.handleMovement);
  
        let myProfileTouch = document.querySelector(".myProfile")
        myProfileTouch.addEventListener("touchstart", this.handleTouchStart);
        introHeader.addEventListener("touchend",this.handleTouchEnd);
  
        let introDimension = introHeader.getBoundingClientRect()
        let introBoxDim = [fontSize+2,introDimension.width-fontSize,introDimension.height-fontSize, fontSize+2];
        let columnVer = window.innerWidth <= 1399? (introBoxDim[2]-introBoxDim[0])/4 : 0;
        let profileImgTop = document.querySelector(".myProfileTop").getBoundingClientRect();
        let profileImgBot = document.querySelector(".myProfileBottom").getBoundingClientRect();
        let profileB = (introBoxDim[2]-introBoxDim[0])/2 + columnVer + (profileImgTop.height+profileImgBot.height)/2;
        let profileT = (introBoxDim[2]-introBoxDim[0])/2 + columnVer - (profileImgTop.height+profileImgBot.height)/2;
    
        let profilePicDim = [profileT, profileImgTop.right, profileB, profileImgBot.left];
        this.setState({profileDim:profilePicDim, headerDim:introBoxDim});
      });
      window.addEventListener('resize', this.resizeMyProfile);
  
      //Voice recording init
      let mainAudio = new Audio("https://myaudiolibrary.s3.amazonaws.com/voiceRecording.mp3");
      mainAudio.crossOrigin="anonymous";
      mainAudio.addEventListener("canplay", this.setState({clickme:true}))
      this.setState({audioSrc:mainAudio})
      document.querySelector(".myProfileTop").addEventListener("click", this.handleRecording);
      document.querySelector(".myProfileBottom").addEventListener("click", this.handleRecording);
  
      //Initiate Hover 
      let botProfile = document.querySelector(".myProfileBottom");
      let topProfile = document.querySelector(".myProfileTop");
      topProfile.addEventListener("mouseover",this.handleOverPic);
      topProfile.addEventListener("mouseout", this.handleOutPic);
      botProfile.addEventListener("mouseover",this.handleOverPic);
      botProfile.addEventListener("mouseout", this.handleOutPic);
    }
  
    componentDidUpdate(){
      if(this.state.rerender !== this.props.showing){
        setTimeout(()=>{
          let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
          let introHeader = document.querySelector(".introductionBox");
          introHeader.addEventListener("mousemove", this.handleMovement);
  
          let myProfileTouch = document.querySelector(".myProfile")
          myProfileTouch.addEventListener("touchstart", this.handleTouchStart);
          introHeader.addEventListener("touchend",this.handleTouchEnd);
  
          let introDimension = introHeader.getBoundingClientRect()
          let introBoxDim = [fontSize+2,introDimension.width-fontSize,introDimension.height-fontSize, fontSize+2];
          let columnVer = window.innerWidth <= 1399? (introBoxDim[2]-introBoxDim[0])/4 : 0;
          let profileImgTop = document.querySelector(".myProfileTop").getBoundingClientRect();
          let profileImgBot = document.querySelector(".myProfileBottom").getBoundingClientRect();
          let profileB = (introBoxDim[2]-introBoxDim[0])/2 + columnVer + (profileImgTop.height+profileImgBot.height)/2;
          let profileT = (introBoxDim[2]-introBoxDim[0])/2 + columnVer - (profileImgTop.height+profileImgBot.height)/2;
          let profilePicDim = [profileT, profileImgTop.right, profileB, profileImgBot.left];
          this.setState({profileDim:profilePicDim, headerDim:introBoxDim, rerender:true});
          window.addEventListener('resize', this.resizeMyProfile);
        },200)
      }
    }
    componentWillUnmount(){
      document.querySelector(".homePage").style.opacity =0;
      let introHeader = document.querySelector(".introductionBox");
      introHeader.removeEventListener("mousemove", this.handleMovement);
      
      let myProfileTouch = document.querySelector(".myProfile")
      myProfileTouch.removeEventListener("touchstart", this.handleTouchStart);
      myProfileTouch.removeEventListener("touchend",this.handleTouchEnd);
      //dismount Hover
      let botProfile = document.querySelector(".myProfileBottom");
      let topProfile = document.querySelector(".myProfileTop");
      topProfile.removeEventListener("mouseover",this.handleOverPic);
      topProfile.removeEventListener("mouseout", this.handleOutPic);
      botProfile.removeEventListener("mouseover",this.handleOverPic);
      botProfile.removeEventListener("mouseout", this.handleOutPic);
      //audio Click Unmount
      document.querySelector(".myProfileTop").removeEventListener("click", this.handleRecording);
      document.querySelector(".myProfileBottom").removeEventListener("click", this.handleRecording);
  
      window.removeEventListener('resize', this.resizeMyProfile);
      clearInterval(this.analyserId);
      let savedAudio = this.state.audioSrc
      savedAudio.pause();
      savedAudio.currentTime=0
    }
  
    handleRecording(){
      this.setState({clickme:false});
      try{
        let audioCtx;
        let audioSrc = this.state.audioSrc;
        let analyser;
        let track;
        if(this.state.mainAmp[0] === undefined){
          audioCtx = new(window.AudioContext||window.webkitAudioContext)();
          track = audioCtx.createMediaElementSource(audioSrc);
          analyser = audioCtx.createAnalyser();
          track.connect(analyser);
          analyser.connect(audioCtx.destination);
          this.setState({mainAmp:[track, analyser, audioCtx]});
        }
        else{
          audioCtx = this.state.mainAmp[2];
          track = this.state.mainAmp[0];
          analyser = this.state.mainAmp[1];
        }
  
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const freqData = new Uint8Array(bufferLength);
  
        if(audioSrc.paused){
          this.analyserId = setInterval(()=>{
            analyser.getByteFrequencyData(freqData);
            if(Math.max(...freqData)>175){
              this.handleRecAni();
            }
          },150);
          this.setState({speaking:true});
          let topProfile = document.querySelector(".myProfileTop");
          topProfile.style.transform=`translateY(0px)`;
          document.getElementById("rewind").style.opacity = 0.8;
          audioSrc.play();
          audioSrc.addEventListener("ended", this.handleEndRecording);
        }
        else{
          clearInterval(this.analyserId);
          this.setState({speaking:false});
          audioSrc.pause();
        }
      }
      catch{
        alert("I'm sorry your browser doesn't support Web Audio API!")
        let audioSrc = this.state.audioSrc;
        if(audioSrc.paused){
          this.analyserId = setInterval(()=>{
              this.handleRecAni();
          },200);
          this.setState({speaking:true});
          let topProfile = document.querySelector(".myProfileTop");
          topProfile.style.transform=`translateY(0px)`;
          audioSrc.play();
          audioSrc.addEventListener("ended", this.handleEndRecording);
        }
        else{
          clearInterval(this.analyserId);
          this.setState({speaking:false});
          audioSrc.pause();
        }
      }
    }
  
    handleEndRecording(){
      clearInterval(this.analyserId);
      this.setState({speaking:false});
    }
    handleReset(e){
      let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      e.target.animate([{fontSize:`${2*fontSize}px`, easing:"ease-in"},{fontSize:`${1.5*fontSize}px`},{fontSize:`${2.5*fontSize}px`},{fontSize:`${1.75*fontSize}px`},{fontSize:`${2.25*fontSize}px`},{fontSize:`${2*fontSize}px`}], 250);
      this.state.audioSrc.currentTime=0
    }
    handleRecAni(){
      let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      let topProfile = document.querySelector(".myProfileTop");
      topProfile.animate([{transform:`translateY(0px)`},{transform:`translateY(-${fontSize}px)`, offset:0.5, easing: "ease-in"},{ transform:`translateY(0px)`}],150)
    }
    resizeMyProfile(){
      let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      let introHeader = document.querySelector(".introductionBox");
      introHeader.addEventListener("mousemove", this.handleMovement);
  
      let myProfileTouch = document.querySelector(".myProfile")
      myProfileTouch.addEventListener("touchstart", this.handleTouchStart);
      introHeader.addEventListener("touchend",this.handleTouchEnd);
      //resize ele in intro Header
      let size = window.innerWidth>=2560? "scale(1.25)": window.innerWidth>=1400? "scale(1)": window.innerWidth >=769?"scale(0.9)": "scale(0.8)";
      let backgroundPosition = window.innerWidth>=1399? "-150%, -90%": "center, center";
      introHeader.style.backgroundPosition = backgroundPosition;
      myProfileTouch.style.transform = `perspective(33rem) rotateX(0deg) rotateY(0deg) ${size}`;
  
      let introDimension = introHeader.getBoundingClientRect()
      let introBoxDim = [fontSize+2,introDimension.width-fontSize,introDimension.height-fontSize, fontSize+2]
      
      let columnVer = window.innerWidth <= 1399? (introBoxDim[2]-introBoxDim[0])/4 : 0;
      let profileImgTop = document.querySelector(".myProfileTop").getBoundingClientRect();
      let profileImgBot = document.querySelector(".myProfileBottom").getBoundingClientRect();
      let profileB = (introBoxDim[2]-introBoxDim[0])/2 + columnVer + (profileImgTop.height+profileImgBot.height)/2;
      let profileT = (introBoxDim[2]-introBoxDim[0])/2 + columnVer - (profileImgTop.height+profileImgBot.height)/2;
    
      let profilePicDim = [profileT, profileImgTop.right, profileB, profileImgBot.left];
      this.setState({profileDim:profilePicDim, headerDim:introBoxDim, resize:window.innerWidth});
    }
  
    handleOverPic(){
      if(!this.state.speaking){
        let topProfile = document.querySelector(".myProfileTop");
        let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        topProfile.style.transform=`translateY(-${fontSize}px)`;
      }
      if(this.state.audioSrc.currentTime!==0){
        document.getElementById("rewind").style.opacity = 0.8
      }
    }
    handleOutPic(){
      if(!this.state.speaking){
        let topProfile = document.querySelector(".myProfileTop");
        topProfile.style.transform=`translateY(0px)`;
      }
      
      if(this.state.audioSrc.currentTime!==0){
        document.getElementById("rewind").style.opacity = 0
      }
    }
  
    handleTouchStart(){
        let myProfileTouch = document.querySelector("body")
        myProfileTouch.style.overflowY= "hidden"
  
        let introHeader = document.querySelector(".introductionBox");
        introHeader.addEventListener("touchmove", this.handleMovement)
    }
    handleTouchEnd(){
      let myProfileTouch = document.querySelector("body")
      myProfileTouch.style.overflowY= "scroll"
  
      let introHeader = document.querySelector(".introductionBox");
      introHeader.removeEventListener("touchmove", this.handleMovement)
  
      let size = window.innerWidth>=2560? "scale(1.25)": window.innerWidth>=1400? "scale(1)":window.innerWidth >=769?"scale(0.9)": "scale(0.8)";
      let backgroundPosition = window.innerWidth>=1399? "-150%, -90%": "center, center";
      //resetHeader
      let profilePic = document.querySelector(".myProfile");
      profilePic.style.transition="transform 250ms";
      profilePic.style.transform = `perspective(33rem) rotateX(0deg) rotateY(0deg) ${size}`;
      document.documentElement.style.setProperty("--shadowAni", "filter 250ms")
      document.documentElement.style.setProperty("--imgShadow", `drop-shadow(0px 0px 5px #0808085e)`);
      document.documentElement.style.setProperty("--imgShadowTop", `drop-shadow(0 -4px 3px #0808085e)`);
      //bg Img movement
      let introBox = document.querySelector(".introductionBox");
      introBox.style.transition = "background-position 250ms"
      introBox.style.backgroundPosition = backgroundPosition;
    }
    handleMovement(e){
      //set between dimension and size diff
      let pageX = e.type === "mousemove"? e.pageX : e.touches[0].pageX;
      let pageY = e.type === "mousemove"? e.pageY : e.touches[0].pageY;
      let size = window.innerWidth>=2560? "scale(1.25)": window.innerWidth>=1400? "scale(1)":window.innerWidth >=769?"scale(0.9)": "scale(0.8)";
      let backgroundPosition = window.innerWidth>1399? "-150%, -90%": "center, center";
      let firstBG = window.innerWidth>1399? -150:0;
      let secondBG = window.innerWidth>1399? -90:0;
      if(pageX <= this.state.headerDim[3]||pageX >= this.state.headerDim[1] ||pageY >= this.state.headerDim[2]||pageY <= this.state.headerDim[0]){
        //reset Shadow and Profile
        let profilePic = document.querySelector(".myProfile");
        profilePic.style.transition="transform 250ms";
        profilePic.style.transform = `perspective(33rem) rotateX(0deg) rotateY(0deg) ${size}`;
        document.documentElement.style.setProperty("--shadowAni", "filter 250ms")
        document.documentElement.style.setProperty("--imgShadow", `drop-shadow(0px 0px 5px #0808085e)`);
        document.documentElement.style.setProperty("--imgShadowTop", `drop-shadow(0 -4px 3px #0808085e)`);
        //bg Img movement
        let introBox = document.querySelector(".introductionBox");
        introBox.style.transition = "background-position 250ms"
        introBox.style.backgroundPosition = backgroundPosition;
      }
      else{
        //intro BG Img
        let introBox = document.querySelector(".introductionBox");
        let xIntBGMove = (pageX-(this.state.headerDim[1]+this.state.headerDim[3])/2)*10/((this.state.headerDim[1]+this.state.headerDim[3])/2);
        introBox.style.transition ="background-position 50ms"
        introBox.style.backgroundPosition = `${firstBG+xIntBGMove*4}%, ${secondBG+xIntBGMove}%`;
  
        //profileMovement
        let profilePic = document.querySelector(".myProfile");
        let xdegPerpx = 8/((this.state.profileDim[2]+100-this.state.profileDim[0])/2);
        let ydegPerpx = 8/((this.state.profileDim[1]+100-this.state.profileDim[3])/2);
        let shadowY = 4/((this.state.profileDim[2]-this.state.profileDim[0])/2);
        let shadowX = 8/((this.state.profileDim[1]-this.state.profileDim[3])/2);
        if(pageX>=this.state.profileDim[3]-100 && pageX<=this.state.profileDim[1]+100 && pageY>=this.state.profileDim[0]-100 && pageY<=this.state.profileDim[2]+100){
          //PicAngle
          let xHalfPoint = (this.state.profileDim[1]+this.state.profileDim[3])/2;
          let yHalfPoint = (this.state.profileDim[0]+this.state.profileDim[2])/2;
          let xSwitch= pageX-xHalfPoint;
          let ySwitch = yHalfPoint-pageY;
          //ShadowAngle
          let shadowChangeY = shadowY * ((this.state.profileDim[0]+this.state.profileDim[2])/2-pageY);
          let shadowChangeX = shadowX * ((this.state.profileDim[1]+this.state.profileDim[3])/2-pageX);
          profilePic.style.transition="transform 75ms"
          profilePic.style.transform =`perspective(33rem) rotateY(${xSwitch*xdegPerpx}deg) rotateX(${ySwitch*ydegPerpx}deg) ${size}`
          document.documentElement.style.setProperty("--shadowAni", "filter 0ms")
          document.documentElement.style.setProperty("--imgShadow", `drop-shadow(${shadowChangeX}px ${shadowChangeY}px 5px #0808085e)`);
          document.documentElement.style.setProperty("--imgShadowTop", `drop-shadow(${shadowChangeX}px ${shadowChangeY}px 3px #0808085e)`)
        }
        else{
          //reset Shadow and Profile
          profilePic.style.transition="transform 250ms";
          profilePic.style.transform = `perspective(33rem) rotateX(0deg) rotateY(0deg) ${size}`;
          document.documentElement.style.setProperty("--shadowAni", "filter 250ms")
          document.documentElement.style.setProperty("--imgShadow", `drop-shadow(0px 0px 5px #0808085e)`);
          document.documentElement.style.setProperty("--imgShadowTop", `drop-shadow(0 -4px 3px #0808085e)`);
        }
      } 
    }
  
    render(){
      return(
        <div className = "homePage">
          <section className ="introductionBox">
            <div className = "introText">
              <div className = "topIntro">
                <h4>H</h4>
                <h4>i</h4>
                <h4>,</h4>
                <h4>m</h4>
                <h4>y</h4>
                <h4>n</h4>
                <h4>a</h4>
                <h4>m</h4>
                <h4>e</h4>
                <h4>i</h4>
                <h4>s</h4>
              </div>
              <div className ="myName">
                <h1>A</h1>
                <h1>r</h1>
                <h1>t</h1>
                <h1>h</h1>
                <h1>u</h1>
                <h1>r</h1>
                <h1>L</h1>
                <h1>e</h1>
                <h1>e</h1>
              </div>
              <p>I am a Creative Web Developer based in Chicago </p>
            </div>
            <div className = "myProfile">
              <div className = "myProfileTop">
                <img  src = {profileTop} alt = "profilePic" importance = "high" draggable="false"/>
              </div>
              <div className = "myProfileBottom">
                <img  src = {profileBottom} alt = "profilePic" importance = "high"  draggable="false"/>
                <i onClick = {this.handleReset} id ="rewind" className="fa-solid fa-repeat"></i>
                {this.state.clickme?<p className ="clickMe">I can tell you more! Click me!</p>:""}
              </div>
            </div>
          </section>
          <section className = "quickInfoBox">
            <div className ="doThisBox fadeLeft">
              <h1>Let's Do This!</h1>
              <p>From simple web design to interactive design, I started this journey as a front-end developer with one goal in mind. <span>Have fun while making something amazing!</span></p>
              <h3 id = "Projects" onClick = {this.props.handlePage}>Take a Look! <i className="fa-solid fa-arrow-right-long"></i></h3>
            </div>
            <div className = "shortIntroBox fadeRight">
              <h1>About Me</h1>
              <p>I am a Korean American living in Chicago who is obsessed with learning and trying new things. My main focus is to build interactive and inclusive designs that allow every user to experience an amazing digital experience!</p>
              <h4>Here are some languages I use:</h4>
              <div className ="LogoBox">
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
              <h3 id ="About" onClick = {this.props.handlePage}>Learn More <i className="fa-solid fa-arrow-right-long"></i></h3>
            </div>
          </section>
          <section className = "quickContactBox">
            <div className = "redirectContainer">
              <h1>L</h1>
              <h1>E</h1>
              <h1>T</h1>
              <h1>'</h1>
              <h1>S</h1>
              <h1>T</h1>
              <h1><a href="https://drive.google.com/file/d/1LIDUaMsqGZBRERfr71ZZCG5Y-X6bf4ZU/view?usp=sharing" target="_blank">A</a></h1>
              <h1>L</h1>
              <h1>K</h1>
              <h1>!</h1>
            </div>
            <div className = "contactBox">
              <h1><i className="fa-solid fa-copyright"></i>Arthur Lee 2022</h1>
              <div className ="iconsContainer">
                <a href="https://github.com/arthurlee945" target="_blank"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.instagram.com/arthur_lee94/" target="_blank"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/arthurjlee/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                <a href="mailto:arthur.lee945@gmail.com" target="_blank"><i className="fa-solid fa-envelope"></i></a>
              </div>
            </div>
          </section>
        </div>
      )
    }
}

export default HomePage;