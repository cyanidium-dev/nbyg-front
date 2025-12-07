"use client";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import Modal from "../modals/Modal";
import ContactForm from "./ContactForm";
import SectionTitle from "../titles/SectionTitle";
import Backdrop from "../backdrop/Backdrop";
import Notification from "../notification/Notification";

interface ModalContactFormProps {
    isModalShown: boolean;
    setIsModalShown: Dispatch<SetStateAction<boolean>>;
}

export default function ModalContactForm({
    isModalShown,
    setIsModalShown,
}: ModalContactFormProps) {
    const [isNotificationShown, setIsNotificationShown] = useState(false);
    const [isError, setIsError] = useState(false);

    return (
        <>
            <Modal
                isModalShown={isModalShown}
                setIsModalShown={setIsModalShown}
                variant="notification"
                className="rounded-[12px] w-full max-w-[90vw] md:max-w-[600px] min-w-[328px] flex flex-col"
                closeButtonClassName="top-4 right-4 lg:top-8 lg:right-8"
            >
                <div 
                    className="relative flex flex-col px-4 md:px-6 py-8 rounded-[12px] w-full overflow-y-auto flex-1"
                    onClick={(e) => e.stopPropagation()}
                >
                    <SectionTitle className="mb-6">Kontakt os</SectionTitle>
                    <p className="text-[14px] leading-[121.4%] md:text-[16px] md:leading-[125%] w-full font-light mb-6 tracking-[-0.02rem] lg:tracking-0">
                        Har du spørgsmål eller ønsker du et tilbud? Udfyld
                        formularen nedenfor – vi vender hurtigt tilbage med
                        rådgivning eller et uforpligtende tilbud.
                    </p>
                    <div className="w-full">
                        <ContactForm
                            setIsModalShown={setIsModalShown}
                            setIsError={setIsError}
                            setIsNotificationShown={setIsNotificationShown}
                        />
                    </div>
                </div>
            </Modal>
            <Notification
                title={isError ? "Noget gik galt" : "Tak for din henvendelse!"}
                description={
                    isError
                        ? "Der opstod en fejl, og din besked blev ikke sendt. Kontroller venligst, at alle felter er udfyldt korrekt, og prøv igen."
                        : "Vi har modtaget din besked og kontakter dig snarest muligt. Tak fordi du valgte Nbyg."
                }
                buttonText="Luk"
                isNotificationShown={isNotificationShown}
                setIsNotificationShown={setIsNotificationShown}
            />
            <Backdrop
                isVisible={isModalShown || isNotificationShown}
                onClick={() => {
                    setIsModalShown(false);
                    setIsNotificationShown(false);
                }}
            />
        </>
    );
}
