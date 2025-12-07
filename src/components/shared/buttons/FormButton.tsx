"use client";
import React, { useState, ReactNode, useEffect } from "react";
import ModalContactForm from "../form/ModalContactForm";
import MainButton from "./MainButton";
import * as motion from "motion/react-client";
import { Variants } from "framer-motion";
import { createPortal } from "react-dom";

interface FormButtonProps {
    className?: string;
    textClassName?: string;
    variant?: "fill" | "outline" | "gradient";
    animationVariants?: Variants;
    children: ReactNode;
    faq?: boolean;
}

export default function FormButton({
    className,
    variant,
    textClassName,
    animationVariants,
    children,
    faq,
}: FormButtonProps) {
    const [isModalShown, setIsModalShown] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        }, 0);
    }, []);

    const handleClick = () => {
        setIsModalShown(true);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (faq) {
            e.stopPropagation();
        }
    };

    const buttonElement = (
        <div onClick={handleButtonClick}>
            <MainButton
                className={className}
                variant={variant}
                textClassName={textClassName}
                onClick={handleClick}
            >
                {children}
            </MainButton>
        </div>
    );

    return (
        <>
            {animationVariants ? (
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={animationVariants}
                >
                    {buttonElement}
                </motion.div>
            ) : (
                buttonElement
            )}
            {faq && isMounted ? createPortal(
                <ModalContactForm
                    isModalShown={isModalShown}
                    setIsModalShown={setIsModalShown}
                />,
                document.body
            ):(
                <ModalContactForm
                    isModalShown={isModalShown}
                    setIsModalShown={setIsModalShown}
                />
            )}
        </>
    );
}
