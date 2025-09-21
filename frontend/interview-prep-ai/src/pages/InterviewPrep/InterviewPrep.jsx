import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
const InterviewPrep = () => {
  
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsbyId = async () => {};

  const generateConceptExplanation = async (question) => {};

  const toggleQuestionPinStatus = async(questionId) => {};

  const uploadMoreQuestions = async() => {};

  useEffect(() => {
    if(sessionId){
      fetchSessionDetailsbyId();
    }
  
    return () => {};
  }, []);
  
  return 
};

export default InterviewPrep;
