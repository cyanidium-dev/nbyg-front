"use client";
import dynamic from "next/dynamic";

const ModalContactForm = dynamic(() => import("./ModalContactForm"), {
    ssr: false,
});

export default ModalContactForm;
