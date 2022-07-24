import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {ShowStats} from '../features/Stats/StatsSlice'
import Wrapper from '../assets/wrappers/StatsContainer'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import StatsItem from './StatsItem'

const StatsContainer = () => {
  const { stats } = useSelector((store) => store.Stats);
  // return null
   const defaultStats = [
     {
       title: "pending applications",
       count: stats.pending || 0,
       icon: <FaSuitcaseRolling />,
       color: "#e9b949",
       bcg: "#fcefc7",
     },
     {
       title: "interviews scheduled",
       count: stats.interview || 0,
       icon: <FaCalendarCheck />,
       color: "#647acb",
       bcg: "#e0e8f9",
     },
     {
       title: "jobs declined",
       count: stats.declined || 0,
       icon: <FaBug />,
       color: "#d66a6a",
       bcg: "#ffeeee",
     },
   ];
  return (
    <Wrapper>
      {defaultStats.map((item,index)=>{
      return <StatsItem key={index} {...item} />;
      })}
    </Wrapper>
  );
}

export default StatsContainer