import React,{useState,useEffect} from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { ChatBubbleOvalLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { PencilIcon,TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ShowToast } from "../../utils/Toats";

 
export function CommentPage() {
  const [Comment, setComment] = useState("");
  const [edit_id, setedit_id] = useState("")
  const [type_comment, settype_comment] = useState("")
  const [open, setOpen] = React.useState(false);
  let { id }  = useParams()
 
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    getComment()
  }, []);

  const getComment = () => {
    axios.get(`${BaseUrl}/property/comments/`,{
      params : {
        property_id : id
      }
    })
    .then((res) => {
      console.log(res.data)
      setComment(res.data)
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
  }

  const AddComment = () => {
    if (edit_id === "")
    {
      var data = {
        "user" :jwtDecode(localStorage.getItem("token")).user_id,
  "property_id" : id,
  "review" : type_comment
      }
      axios.post(`${BaseUrl}/property/comments/`,data)
      .then((res) => {
        settype_comment("")
        getComment()
        setedit_id("")
        ShowToast("Review Added Succesfully", true)
        handleOpen()
      })
    }
    else
    {
      var data = {
        
  "id" : edit_id,
  "review" : type_comment
      }
      axios.put(`${BaseUrl}/property/comments/`,data)
      .then((res) => {
        settype_comment("")
        getComment()
        setedit_id("")
        ShowToast("Comment Updated Succesfully", true)
        handleOpen()
      })
    }

  }


  const Delete = (id) => {
    axios.delete(`${BaseUrl}/property/comments/`,{ data : {"id" :  id}})
    .then((res) => {
      settype_comment("")
      getComment()
      setedit_id("")
      ShowToast("Comment Deleted Succesfully", true)
      handleOpen()
    })
  }
 
  return (
    <>
      <Tooltip content='Comment'>
            <ChatBubbleOvalLeftIcon onClick={handleOpen} className="h-8 w-8 ml-60 mt-3 text-white"/>
          </Tooltip>
      <Dialog
        className="h-full"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div className="flex items-center justify-between">
        <DialogHeader className="text-deep-orange-900">Comment Here</DialogHeader>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
            
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
          </div>
        <DialogBody className="grid grid-rows-[8fr,1fr]">
            <div className="mx-4">
              {
              Comment.length ? <>
              {
                Comment.map((value,key) => (
                  <div className="grid grid-cols-2">
                    <div className="">
                      <div className="flex">
                        <div>
                          <img src={
                          value.user ? `${BaseUrl}${value.user[0].profile_image}` : ""
                          }
                          alt=""
                          className="rounded-full w-5 h-5"/>
                        </div>
                        <div className="font-semibold text-sm ml-2">{value.user? value.user[0].first_name : "Invalid User"}</div><br />
                      </div>
                      <b className="ml-5">{ value.review }</b> <br />
                    </div>
                    <div className="flex justify-end">
                      <PencilIcon className="h-4 w-4 me-2" onClick={()=>{setedit_id(value.id);settype_comment(value.review)}}/>
                      <TrashIcon className="h-4 w-4 me-2" onClick={()=>Delete(value.id)}/>
                    </div>    
                  </div>
                ))
              }
              </> : 
              <b> No Comments </b>
              }
            </div>
            <div className="grid grid-cols-[12fr,1fr] ">
              <div className="mt-4 ml-4">
                <Input type="text" label="Comments" value={type_comment} onChange={(e)=>settype_comment(e.target.value)}/>
              </div>
              <div className="w-10 mt-4">
                <PaperAirplaneIcon className="h-5 w-5 m-2" onClick={AddComment} />
              </div>
            </div>
        </DialogBody>
        </Dialog>
    </>
  );
}