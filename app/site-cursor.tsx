"use client";
import { useEffect, useRef } from "react";
import styles from "./site-cursor.module.css";
export default function SiteCursor() {
 const cursor=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const fine=window.matchMedia("(hover: hover) and (pointer: fine)");
  const root=document.documentElement;
  let frame=0;
  let x=0,y=0;
  const hide=()=>{cancelAnimationFrame(frame);frame=0;root.removeAttribute("data-custom-cursor");if(cursor.current) {cursor.current.dataset.visible="false";cursor.current.dataset.pressed="false";}};
  const move=(event:PointerEvent)=>{
   if(!fine.matches || event.pointerType!=="mouse") {hide();return;}
   const target=event.target instanceof Element ? event.target : null;
   if(target?.closest('input,textarea,select,[contenteditable="true"]')) {hide();return;}
   x=event.clientX;y=event.clientY;
   if(cursor.current) cursor.current.dataset.hover=target?.closest('a,button,[role="button"]') ? "true" : "false";
   if(!frame) frame=requestAnimationFrame(()=>{frame=0;if(cursor.current){cursor.current.style.transform=`translate3d(${x}px,${y}px,0)`;cursor.current.dataset.visible="true";root.dataset.customCursor="true";}});
  };
  const press=()=>{if(cursor.current) cursor.current.dataset.pressed="true";};
  const release=()=>{if(cursor.current) cursor.current.dataset.pressed="false";};
  const leave=(event:PointerEvent)=>{if(!event.relatedTarget) hide();};
  const visibility=()=>{if(document.hidden) hide();};
  window.addEventListener("pointermove",move,{passive:true});window.addEventListener("pointerdown",press);window.addEventListener("pointerup",release);window.addEventListener("pointerout",leave);window.addEventListener("blur",hide);document.addEventListener("visibilitychange",visibility);fine.addEventListener("change",hide);
  return()=>{cancelAnimationFrame(frame);hide();window.removeEventListener("pointermove",move);window.removeEventListener("pointerdown",press);window.removeEventListener("pointerup",release);window.removeEventListener("pointerout",leave);window.removeEventListener("blur",hide);document.removeEventListener("visibilitychange",visibility);fine.removeEventListener("change",hide);};
 },[]);
 return <div ref={cursor} className={styles.cursor} aria-hidden="true" data-visible="false"><svg className={styles.symbol} viewBox="0 0 20 18" focusable="false"><path d="M2 10h4a4 4 0 1 1 8 0h4M2 15h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></div>;
}
