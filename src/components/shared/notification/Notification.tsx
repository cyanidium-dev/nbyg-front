import { Dispatch, SetStateAction } from "react";
import Modal from "../modals/Modal";
import MainButton from "../buttons/MainButton";

interface NotificationProps {
    title: string;
    description: string;
    buttonText?: string;
    isNotificationShown: boolean;
    setIsNotificationShown: Dispatch<SetStateAction<boolean>>;
}

export default function Notification({
    title,
    description,
    buttonText,
    isNotificationShown,
    setIsNotificationShown,
}: NotificationProps) {
    return (
        <Modal
            isModalShown={isNotificationShown}
            setIsModalShown={setIsNotificationShown}
            variant="notification"
            className="rounded-[12px] z-100"
            closeButtonClassName="top-4 md:top-5 right-4 md:right-5"
        >
            <div className="p-4 pt-14 md:p-6 md:pt-14 lg:p-10 relative flex flex-col justify-center items-center w-full min-w-[256px] max-w-[560px] z-20">
                <h3 className="mb-8 text-[24px] lg:text-[48px] font-find-sans-pro font-light leading-[120%] text-center uppercase">
                    {title}
                </h3>
                <p className="text-[12px] lg:text-[16px] leading-[120%] text-center font-light mb-10 lg:mb-16">
                    {description}
                </p>
                <MainButton
                    onClick={() => setIsNotificationShown(false)}
                    className="h-12"
                >
                    {buttonText || "Luk"}
                </MainButton>
            </div>
        </Modal>
    );
}
