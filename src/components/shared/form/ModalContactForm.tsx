import { Dispatch, SetStateAction } from "react";
import Modal from "../modals/Modal";
import ContactForm from "./ContactForm";
import SectionTitle from "../titles/SectionTitle";
import Backdrop from "../backdrop/Backdrop";

interface ModalContactFormProps {
    isModalShown: boolean;
    setIsModalShown: Dispatch<SetStateAction<boolean>>;
}

export default function ModalContactForm({
    isModalShown,
    setIsModalShown,
}: ModalContactFormProps) {
    return (
        <>
            <Modal
                isModalShown={isModalShown}
                setIsModalShown={setIsModalShown}
                variant="notification"
                className="rounded-[12px] w-full max-w-[90vw] md:max-w-[600px] min-w-[328px] overflow-y-auto"
                closeButtonClassName="top-4 right-4 lg:top-8 lg:right-8"
            >
                <div className="relative flex flex-col px-6 py-8 bg-black rounded-[16px] min-h-full">
                    <SectionTitle className="mb-6">Kontakt os</SectionTitle>
                    <p className="text-[14px] leading-[121.4%] md:text-[16px] md:leading-[125%] max-w-[560px] w-full font-light mb-6 tracking-[-0.02rem] lg:tracking-0">
                        Har du spørgsmål eller ønsker du et tilbud? Udfyld
                        formularen nedenfor – vi vender hurtigt tilbage med
                        rådgivning eller et uforpligtende tilbud.
                    </p>
                    <ContactForm
                        isModalShown={isModalShown}
                        setIsModalShown={setIsModalShown}
                    />
                </div>
            </Modal>
            <Backdrop
                isVisible={isModalShown}
                onClick={() => {
                    setIsModalShown(false);
                }}
            />
        </>
    );
}
