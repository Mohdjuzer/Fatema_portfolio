import { delay, easeIn } from "framer-motion";
import { transition } from "three/examples/jsm/tsl/display/TransitionNode.js";
import React from "react";
import { title } from "framer-motion/client";

const animationDuration = 2;
export const variants = {
    initial:{pathLength:0,strokeOpacity:1,fillOpacity:0},
    animate:{
        pathLength:1,
        strokeOpacity:0,
        fillOpacity:1,
        transition:{
            duration:animationDuration,
            ease:'easeInOut',
            strokeOpacity:{
                delay:animationDuration
            },
            fillOpacity:{
                delay:animationDuration
            }
        }
    }
};
export const socialIcons = [
    {
        id: 1,
        path: "M10 9h2V6c0-1.1.9-2 2-2h2V0h-2C9.79 0 8 1.79 8 4v5H6v3h2v7h3v-7h2l1-3h-3V9z",
        viewBox: "0 0 24 24",
        // replace with your LinkedIn URL
        url: "https://www.linkedin.com/in/fatema-k-397565273?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BwBnM8gxeToSfremruYMhfQ%3D%3D",
    },
    {
        id: 2,
        path: "M8 0C3.578 0 0 3.578 0 8c0 3.536 2.292 6.537 5.468 7.589.4.074.547-.173.547-.384 0-.191-.007-.695-.01-1.365-2.226.484-2.698-1.073-2.698-1.073-.364-.923-.889-1.168-.889-1.168-.726-.496.055-.486.055-.486.803.056 1.225.826 1.225.826.712 1.418 1.868.866 2.32.662.072-.516.278-.866.506-1.065-1.776-.203-3.645-.888-3.645-3.943 0-.87.313-1.583.829-2.141-.083-.203-.36-1.024.078-2.134 0 0 .67-.215 2.2.82.637-.177 1.32-.265 2.004-.268.685.003 1.368.09 2.005.268 1.53-1.035 2.2-.82 2.2-.82.439 1.11.162 1.931.079 2.134.517.558.829 1.271.829 2.141 0 3.063-1.872 3.74-3.653 3.943.288.246.541.733.541 1.479 0 1.067-.01 1.932-.01 2.194 0 .211.144.462.552.384C13.708 14.537 16 11.536 16 8c0-4.422-3.578-8-8-8z",
        viewBox: "0 0 17 17",
        // replace with your GitHub URL
        url: "https://github.com/kanchfatema",
    },
    {
        id: 3,
        path: "M23.953 4.57c-.885.392-1.83.654-2.825.775 1.017-.609 1.794-1.576 2.165-2.724-.951.564-2.005.975-3.127 1.195-.896-.956-2.168-1.55-3.593-1.55-2.719 0-4.924 2.205-4.924 4.924 0 .386.043.761.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.731-.671 1.577-.671 2.475 0 1.706.87 3.206 2.189 4.086-.807-.026-1.566-.247-2.229-.616v.061c0 2.384 1.693 4.37 3.947 4.826-.414.112-.849.171-1.296.171-.316 0-.624-.031-.928-.087.629 1.963 2.448 3.396 4.607 3.434-1.684 1.32-3.809 2.11-6.102 2.11-.396 0-.787-.023-1.174-.069 2.188 1.4 4.786 2.215 7.577 2.215 9.057 0 14.005-7.497 14.005-13.978 0-.213-.004-.426-.014-.637.961-.695 1.795-1.562 2.457-2.549l-.047-.020z",
        viewBox: "0 0 24 24",
        // replace with your Twitter URL
        url: "https://github.com/kanchfatema",
    },
    {
        id: 4,
        path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
        viewBox: "0 0 24 24",
        // replace with your Facebook URL (or other)
        url: "https://www.linkedin.com/in/fatema-k-397565273?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BwBnM8gxeToSfremruYMhfQ%3D%3D",
    },
]    

//number section 
export const Numbers = [
    {id:1,number:10,title:'Projects Created'},
    {id:2,number:100,title:' Data Analysed'},
    {id:3,number:7,title:' Prog Language'},
    {id:4,number:3,title:' Years'},
]
//services section
export const services = [
    {
        id:1,
        title:"Data Analysis & Visualization",
        description:"I turn complex data into clear, actionable insights.From cleaning and organizing datasets to uncovering meaningful patterns, I help businesses understand what their data is telling them. I create dashboards and visual reports using Python, SQL, Power BI, and Tableau, ensuring your insights are easy to interpret and practical to apply. Whether you need trend analysis, performance tracking, or data storytelling, I deliver visuals that support smarter decisions.",

    },
    {
        id:2,
        title:"Machine Learning & Predictive Modeling",
        description:"Using machine learning techniques, I create predictive models that solve real-world challenges — from forecasting trends to identifying customer behavior. I handle the entire pipeline: data preprocessing, feature engineering, model training, evaluation, and interpretation. My focus is on developing models that are accurate, meaningful, and aligned with your business goals.",
    },
    {
        id:3,
        title:"Technical Development & Problem-Solving",
        description:"With experience in Python, Java, SQL, and automation, I build backend processes, scripts, and tools that improve workflow and productivity. I focus on writing clean code, optimizing performance, and solving problems with creativity and logic. Whether you're looking to streamline operations or bring a technical idea to life, I ensure your solution is reliable, efficient, and user-friendly.",
    },
]