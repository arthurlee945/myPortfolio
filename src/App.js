import React, { useEffect, useState } from 'react';
import './App.scss';
import anime from 'animejs/lib/anime.es';
import HomePage from './HomePage';
import About from './About'
import Projects from './Projects'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      homepage:false,
      projects:false,
      about:false,
      navbar:false
    }
    this.handleLoad = this.handleLoad.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        navbar:true,
        homepage:true
      })
    }, 1000)
  }
  handleLoad(){
    try{
      document.querySelector(".loadingScreen").animate([{opacity:1, offset:0.9},{opacity:0}], 3000);
    } catch(e){
      console.log(e)
    }

    setTimeout(()=>{this.setState({loading:false})},3000);
  }
  handlePageClick(e){
    if(e.target.getAttribute("id") === "Home"){
      if(!this.state.homepage){
        if(this.state.projects){
          document.querySelector(".projects").style.opacity=0;
        }
        else if (this.state.about){
          document.querySelector(".about").style.opacity=0;
        }
        document.querySelector(".navBar").style.opacity = 0;
        document.documentElement.style.setProperty("--backgroundColor","#DBDAF7");
        document.documentElement.style.setProperty("--menuBG","#f6f4f8");
        setTimeout(()=>{
          document.querySelector(".navBar").style.opacity = 1;
          this.setState({
            loading:true,
            homepage:true,
            projects:false,
            about:false
          })
        },250)
      }
    }
    else if(e.target.getAttribute("id") === "Projects"){
      if(!this.state.projects){
        if(this.state.homepage){
          document.querySelector(".homePage").style.opacity=0;
        }
        else if (this.state.about){
          document.querySelector(".about").style.opacity=0;
        }
        document.querySelector(".navBar").style.opacity = 0;
        document.documentElement.style.setProperty("--backgroundColor","#D3F0FF");
        document.documentElement.style.setProperty("--menuBG","#f4f7f8");
        setTimeout(()=>{
          document.querySelector(".navBar").style.opacity = 1;
          this.setState({
            loading:true,
            homepage:false,
            projects:true,
            about:false
          })
        },250)
      }
    }
    else if(e.target.getAttribute("id") === "About"){
      if(!this.state.about){
        if(this.state.homepage){
          document.querySelector(".homePage").style.opacity=0;
        }
        else if(this.state.projects){
          document.querySelector(".projects").style.opacity=0;
        }
        document.querySelector(".navBar").style.opacity = 0;
        document.documentElement.style.setProperty("--backgroundColor","#daf7e4");
        document.documentElement.style.setProperty("--menuBG","#f4f8f5");
        setTimeout(()=>{
          document.querySelector(".navBar").style.opacity = 1;
          this.setState({
            loading:true,
            homepage:false,
            projects:false,
            about:true
          })
        },250)
      }
    }
  }
  render(){
    return(
      <div>
        {this.state.loading?<LoadingScreen />:""}
        {this.state.navbar?<NavBar handlePage = {this.handlePageClick}/>:""}
        {this.state.homepage?<HomePage handlePage = {this.handlePageClick} loading ={this.handleLoad} showing={this.state.homepage}/>:""}
        {this.state.projects?<Projects loading ={this.handleLoad}/>:""}
        {this.state.about?<About loading ={this.handleLoad}/>:""}
      </div>
    );
  }
}

const NavBar = (props) => {
  const [menuOpen, setMenuOpen]= useState(false)
  const handleMClick = () =>{setMenuOpen(!menuOpen)}
  const closeBtn = () =>{
    document.querySelector(".linksBox").style.opacity = 0;
    document.querySelector(".closeicon").style.opacity = 0;
    setTimeout(()=>{handleMClick();document.getElementById("open").animate([{opacity:0}, {opacity:1}],{duration:250});},150)
    document.querySelector(".openNav").animate([{},{width:0, opacity:0}],150);
  }
  const handleMenuClick = (e) =>{
    closeBtn()
    props.handlePage(e);
  }
  return(
    <nav className = "navBar">
      {menuOpen?
      <div id = "menuOpen" className ="openNav">
        <div id = "close" className = "closeicon" onClick = {closeBtn}>
          <p>Close</p>
        </div>
        <div className = "linksBox">
          <div className = "insite">
            <h2 id = "Home" onClick = {handleMenuClick}>Home</h2>
            <h2 id = "Projects" onClick = {handleMenuClick}>Projects</h2>
            <h2 id = "About" onClick = {handleMenuClick}>About</h2>
          </div>
          <div className ="iconsBox">
            <a href="https://github.com/arthurlee945" target="_blank"><i className="fa-brands fa-github"></i></a>
            <a href="https://www.instagram.com/arthur_lee94/" target="_blank"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/arthurjlee/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
            <a href="mailto:arthur.lee945@gmail.com" target="_blank"><i className="fa-solid fa-envelope"></i></a>
          </div>
        </div>
      </div>:
      <div id = "open" className = "openicon" onClick = {handleMClick}>
        <p>Menu</p>
      </div>}
    </nav>
  )
}
const LoadingScreen = () => {
  useEffect(()=>{
    const sigAnime = anime.timeline({loop:true, direction:'alternate'});
    sigAnime.add({
      targets: '#sig path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 250 },
    });
    document.querySelector(".loadingScreen").scrollIntoView({behavior: "auto",block: "center"});
    let mainBody = document.querySelector("body");
    mainBody.style.overflowY ="hidden";
    mainBody.style.touchAction ="none";
    return function cleanup(){
      mainBody.style.overflowY  ="scroll";
      mainBody.style.touchAction ="auto";
    }
  },[]);
  return(
    <div className = "loadingScreen">
      <svg id = "sig" version="1.1" x="0%" y="0%" width="10%" height="10%" viewBox="0 0 500.0 500.0" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path stroke="#151416" fillOpacity="0.000" strokeOpacity="1.000" fillRule="nonzero" strokeWidth="12.5" strokeLinejoin="miter" strokeLinecap="round"
          d="M240.00,5.00C215.00,230.00,95.00,430.00,15.00,480.00M396.19,170.63C391.83,177.49,387.47,184.35,380.00,190.00C372.53,195.65,361.95,200.10,355.00,200.00C348.05,199.90,344.73,195.25,346.67,185.00C348.60,174.75,355.80,158.90,362.50,150.00C369.20,141.10,375.41,139.15,380.00,140.00C384.59,140.85,387.55,144.49,385.00,155.00C382.45,165.51,374.37,182.90,360.00,195.00C345.63,207.10,324.95,213.93,315.00,205.00C305.05,196.07,305.83,171.40,315.00,155.00C324.17,138.60,341.72,130.47,345.00,140.00C348.28,149.53,337.29,176.73,320.00,195.00C302.71,213.27,279.14,222.63,276.17,207.46C273.21,192.28,290.85,152.58,312.98,127.01C335.11,101.45,361.72,90.03,380.00,90.00C398.28,89.97,408.22,101.33,410.00,125.00C411.78,148.67,405.39,184.64,399.85,212.24C394.31,239.84,389.61,259.08,370.00,310.00C350.39,360.92,315.87,443.52,290.00,450.00C264.13,456.48,246.89,386.85,240.00,300.00C233.11,213.15,236.55,109.07,240.00,5.00" id="first" />

          <path stroke="#151416" fillOpacity="0.000" strokeOpacity="1.000" fillRule="nonzero" strokeWidth="12.5" strokeLinejoin="miter" strokeLinecap="round"
          d="M10.00,245.00C135.00,250.00,355.00,235.00,495.00,185.00M495.00,185.00 L447.91,155.42 L460.00,240.00 L495.00,185.00z"
          id="second"/>
        </g>
      </svg>
    </div>
  )
}


export default App;