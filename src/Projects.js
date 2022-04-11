import React, { useEffect, useState } from 'react';
import projectData from "./data.json";

class Projects extends React.Component{
    constructor(props){
      super(props);
      this.state={
        projects:[]
      }
    }
    componentDidMount(){
      this.props.loading();
      document.querySelector(".projects").style.opacity =1;
      this.setState({
        projects: projectData.projects.map(project => <Project key={project.id} project = {project}/>)
      });
    }
    componentWillUnmount(){
      document.querySelector(".projects").style.opacity =0;
    }
    render(){
      return(
        <div className ="projects">
          <h1 className = "header"><span>/</span>Some Projects I Worked On!</h1>
          <div className = "listBox">
            {this.state.projects}
          </div>
          <div className = "quickContactBox2">
            <div className = "redirectContainer">
              <h1><a href="https://drive.google.com/file/d/1LIDUaMsqGZBRERfr71ZZCG5Y-X6bf4ZU/view?usp=sharing" target="_blank">A</a></h1>
              <h1>R</h1>
              <h1>E</h1>
              <h1>Y</h1>
              <h1>O</h1>
              <h1>U</h1>
              <h1>R</h1>
              <h1>E</h1>
              <h1><a href="https://drive.google.com/file/d/1LIDUaMsqGZBRERfr71ZZCG5Y-X6bf4ZU/view?usp=sharing" target="_blank">A</a></h1>
              <h1>D</h1>
              <h1>Y</h1>
              <h1>!?</h1>
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
          </div>
        </div>
      )
    }
}
  
const Project = (props) =>{
let images = props.project.img.map((img,i) => <img key={img} order = {i} src={require(`${img}`)} alt={"screenshot" + i}/>);
let toolList = props.project.tools.map(tool=><p key={props.project.name+tool}>{tool}</p>);
const degBW = 50/props.project.img.length;
useEffect(()=>{
    let projectBox =document.getElementById(props.project.id + "Box");
    projectBox.addEventListener("mouseenter", handleHover);
    projectBox.addEventListener("mouseleave", handleLeave);
    let content = document.getElementById(props.project.id + "Content");
    content.addEventListener("touchstart", handleTouch);
    return function cleanup(){
    projectBox.removeEventListener("mouseenter",handleHover);
    projectBox.removeEventListener("mouseleave", handleLeave);
    content.removeEventListener("touchstart", handleTouch);
    }
},[])

const handleHover = () =>{
    let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let projectBox = document.getElementById(props.project.id + "Box");
    projectBox.querySelectorAll("i").forEach(link => {
    link.style.transform = "translateY(0)"
    })
    document.getElementById(props.project.id + "imgContainer").style.transform = `translate(${-20*fontSize *0.45}px,5%)`;
    projectBox.querySelectorAll("img").forEach((img,i)=> {
    let correctDeg = Math.round(60 + (i*degBW));
    img.style.transform = `rotate(${correctDeg}deg)`;
    img.addEventListener("click", handleClickImg);
    img.addEventListener("mouseleave",handleLeaveImg);
    })
    document.getElementById(props.project.id + "Content").style.transform = "skew(-5deg)";
}

const handleLeave = () =>{
    let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let projectBox =document.getElementById(props.project.id + "Box");
    projectBox.querySelectorAll("i").forEach(link => {
    link.style.transform = `translateY(${5*fontSize}px)`
    });
    document.getElementById(props.project.id + "imgContainer").style.transform = "translate(0,0)";
    projectBox.querySelectorAll("img").forEach((img)=> {
    img.style.transform = `rotate(0deg)`;
    img.removeEventListener("click", handleClickImg);
    img.removeEventListener("mouseleave",handleLeaveImg);
    })
    document.getElementById(props.project.id + "Content").style.transform = "skew(0)";
}

const handleTouch = () =>{
    if(document.getElementById(props.project.id + "Content").style.transform === "skew(0deg)"){
    let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let projectBox = document.getElementById(props.project.id + "Box");
    projectBox.querySelectorAll("i").forEach(link => {
        link.style.transform = "translateY(0)"
    });
    document.getElementById(props.project.id + "imgContainer").style.transform = `translate(${-20*fontSize *0.45}px,5%)`;
    projectBox.querySelectorAll("img").forEach((img,i)=> {
        let correctDeg = Math.round(60 + (i*degBW));
        img.style.transform = `rotate(${correctDeg}deg)`;
        img.addEventListener("click", handleClickImg);
        img.addEventListener("mouseleave",handleLeaveImg);
    });
    document.getElementById(props.project.id + "Content").style.transform = "skew(-5deg)";
    } 
    else{
    let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let projectBox = document.getElementById(props.project.id + "Box");
    projectBox.querySelectorAll("i").forEach(link => {
        link.style.transform = `translateY(${5*fontSize}px)`
    });
    document.getElementById(props.project.id + "imgContainer").style.transform = "translate(0,0)";
    projectBox.querySelectorAll("img").forEach((img)=> {
        img.removeEventListener("click", handleClickImg);
        img.removeEventListener("mouseleave",handleLeaveImg);
        img.style.transform = `rotate(0deg)`;
    });
    document.getElementById(props.project.id + "Content").style.transform = "skew(0deg)";
    }
}

const handleClickImg = (eve) =>{
    let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let i = parseInt(eve.target.getAttribute("order"));
    let correctDeg = Math.round(60 + (i*degBW));
    if(eve.target.style.transform.includes(`rotate(${correctDeg}deg)`)){
    eve.target.style.transform = `scale(2) translateY(-115%) translateX(${20*fontSize *0.4}px)`;
    eve.target.style.zIndex = "1";
    } else{
    eve.target.style.transform = `translateY(0px) rotate(${correctDeg}deg)`
    eve.target.style.zIndex = "0";
    }
}
const handleLeaveImg = (eve) =>{
    let i = parseInt(eve.target.getAttribute("order"));
    let correctDeg = Math.round(60 + (i*degBW));
    eve.target.style.transform = `translateY(0) rotate(${correctDeg}deg)`;
    eve.target.style.zIndex = "0";
}

return(
    <section id ={props.project.id + "Box"} className = "projectBox">
    <div id ={props.project.id + "Content"} className = "content">
        <a href={props.project.live} target="_blank"><h2>{props.project.name}</h2></a>
        <p>{props.project.info}</p>
        <div className ="toolListBox">
        {toolList}
        </div>
    </div>
    <div id ={props.project.id + "Icon"} className ="icons">
        <a href ={props.project.github} target="_blank"><i className="fa-brands fa-github"></i></a>
        <a href ={props.project.live} target="_blank"><i className="fa-solid fa-up-right-from-square"></i></a>
    </div>    
    <div id ={props.project.id + "imgContainer"} className ="imgContainer">
        {images}
    </div>
    </section>
)
}

export default Projects;